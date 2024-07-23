import { useState, useRef } from "react";
import Message from "../components/Chat/Message";

function Chat() {
  const [isMicActive, setIsMicActive] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  async function handleMicClick(index) {
    if (isMicActive) {
      // Detener la grabación y tomar una foto al desactivar el micrófono
      stopRecording();
      const photo = await takePhoto();
      setPhotoDataUrl(photo);
      console.log("Foto tomada:", photo);
    } else {
      // Iniciar la grabación
      startRecording();
    }
    setIsMicActive(!isMicActive);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      console.log("Grabación iniciada");

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
        }
      };
    } catch (error) {
      console.error("Error iniciando la grabación:", error);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current = null;
      console.log("Grabación detenida");
    }
  }

  async function takePhoto() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      await new Promise((resolve) => (video.onloadedmetadata = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0);

      stream.getTracks().forEach((track) => track.stop());

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error tomando la foto:", error);
    }
  }

  const microphone = (
    <svg
      color={isMicActive ? "white" : "black"}
      className='w-32'
      data-slot='icon'
      fill='none'
      stroke-width='1.5'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'
      ></path>
    </svg>
  );

  return (
    <section className='flex lg:flex-row flex-col w-screen min-h-screen p-5 bg-black'>
      <div className='my-5 text-center'>
        <h1 className='font-bold text-3xl'>EchoVoice</h1>
      </div>
      <section className='flex flex-col justify-center items-center mb-10'>
        <button
          className={`transition-all duration-200 bg-gray-100 rounded-full p-5 ${
            isMicActive ? "bg-red-500 " : "bg-gray-100"
          }`}
          onClick={() => handleMicClick(0)}
        >
          {microphone}
        </button>
        <span className='font-extrabold text-center text-xl'>
          {isMicActive
            ? "Presiona para detener la grabación..."
            : "Presiona para grabar"}
        </span>
      </section>
      <section className='text-xl mx-10 rounded border p-2 border-white'>
        <Message
          audio={audioBlob ? URL.createObjectURL(audioBlob) : null}
          foto={photoDataUrl}
        />
      </section>
    </section>
  );
}

export default Chat;
