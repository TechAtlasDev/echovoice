import React, { useState, useEffect } from "react";
import { WaveFile } from "wavefile";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Message({ audio, foto, initialPrompt }) {
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function convertToWav(audioUrl) {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBlob = new Blob([arrayBuffer], { type: "audio/ogg" });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const wav = new WaveFile();
        wav.fromScratch(
          audioBuffer.numberOfChannels,
          audioBuffer.sampleRate,
          "16",
          audioBuffer.getChannelData(0)
        );
        const wavBlob = new Blob([wav.toBuffer()], { type: "audio/wav" });
        return URL.createObjectURL(wavBlob);
      } catch (error) {
        console.error("Error al convertir el audio a WAV:", error);
        return null;
      }
    }

    async function sendToGemini() {
      if (!foto || !audio) return;

      const apiKey = "AIzaSyBD3pwUuwobKmxw982w4UHgGSSEt3CcCQw";
      const genAI = new GoogleGenerativeAI(apiKey);

      const dataToBase64 = async (dataUrl) => {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(blob);
        });
      };

      const fileToGenerativePart = async (dataUrl, mimeType) => {
        const base64Data = await dataToBase64(dataUrl);
        return {
          inlineData: {
            data: base64Data,
            mimeType,
          },
        };
      };

      try {
        const imagePart = await fileToGenerativePart(foto, "image/png");
        const wavAudioUrl = await convertToWav(audio);
        if (!wavAudioUrl) {
          throw new Error("No se pudo convertir el audio a WAV");
        }
        const audioPart = await fileToGenerativePart(wavAudioUrl, "audio/wav");
        console.log("Audio: " + audioPart);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt =
          initialPrompt || "Describe esta imagen y audio en español";
        console.log("Prompt:", prompt);

        console.log("Enviando a Gemini datos");
        const result = await model.generateContent([
          prompt,
          imagePart,
          audioPart,
        ]);

        console.log("Recibido");
        const response = await result.response;
        const text = await response.text();
        console.log("Respuesta de la IA:", text);
        setAiResponse(text);
        setError(null); // Limpiar cualquier error previo
      } catch (error) {
        console.error("Error al enviar a Gemini:", error);
        setError("Error al obtener la respuesta de la IA.");
        setAiResponse(null); // Limpiar respuesta previa en caso de error
      }
    }

    sendToGemini();
  }, [audio, foto, initialPrompt]);

  return (
    <div className='message'>
      {error && <p className='error'>{error}</p>}
      {aiResponse ? (
        <div className='ai-response'>
          <h2>Foto capturada:</h2>
          <img src={foto} alt='Captura' className='mb-4' />
          <h2>Respuesta de la IA:</h2>
          <p>{aiResponse}</p>
          <h2>Audio capturado:</h2>
          <audio src={audio} controls />
        </div>
      ) : (
        <p>Esperando la respuesta de la IA...</p>
      )}
    </div>
  );
}

export default Message;
