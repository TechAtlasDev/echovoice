import React, { useState, useRef, useEffect } from "react";
import Microphone from "../../../../../public/icons/microphone";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { usePhotoCapture } from "../hooks/usePhotoCapture";

// Función para convertir archivos a base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);  // Eliminar el prefijo 'data:image/png;base64,'
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function ButtonMicrophone(props) {
  const { audioURL, isRecording, startRecording, stopRecording } = useAudioRecorder();
  const { photoURL, takePhoto } = usePhotoCapture();
  const videoRef = useRef(null);
  const [buttonColor, setButtonColor] = useState("bg-base-content text-base-300");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  // Función para manejar el clic en el botón
  const handleClick = async () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);

    setButtonColor(isRecording ? "bg-base-content text-base-300" : "bg-red-500 scale-90 text-white");

    if (isRecording) {
      stopRecording();
      if (!isPhotoTaken) {
        await takePhoto(videoRef);
        setIsPhotoTaken(true);
      }
    } else {
      await startRecording();
      if (videoRef.current && !videoRef.current.srcObject) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    }
  };

  // Enviar los datos al backend cuando tanto el audio como la foto estén listos
  useEffect(() => {
    const sendToBackend = async (audioURL, photoURL) => {
      if (audioURL && photoURL) {
        const audioBlob = await fetch(audioURL).then((res) => res.blob());
        const photoBlob = await fetch(photoURL).then((res) => res.blob());

        const base64Audio = await toBase64(audioBlob);
        const base64Photo = await toBase64(photoBlob);

        const response = await fetch('http://localhost:8000/api/multipart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: base64Audio, image: base64Photo })
        });

        if (response.ok) {
          console.log("Datos enviados correctamente al backend.");
        } else {
          console.error("Error al enviar los datos.");
        }
      }
    };

    if (audioURL && photoURL) {
      sendToBackend(audioURL, photoURL);
    }
  }, [audioURL, photoURL]); // Cuando tanto el audio como la foto estén disponibles

  return (
    <div>
      <button
        {...props}
        className={`transition-all p-8 rounded-full ${buttonColor} ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        <Microphone className="size-52" />
      </button>

      {/* Video oculto para la captura de foto */}
      <video 
        ref={videoRef} 
        style={{ display: 'none' }} 
        autoPlay 
        playsInline
      ></video>
    </div>
  );
}
