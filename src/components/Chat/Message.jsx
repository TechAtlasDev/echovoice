import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Message({ audio, foto, initialPrompt }) {
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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

      const audioToBase64 = async (audioUrl) => {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(blob);
        });
      };

      try {
        // Convierte la imagen y el audio a Base64
        const imagePart = {
          inlineData: {
            data: await dataToBase64(foto),
            mimeType: "image/png",
          },
        };
        const audioPart = {
          inlineData: {
            data: await audioToBase64(audio),
            mimeType: "audio/mpeg",
          },
        };

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt =
          initialPrompt || "Describe esta imagen y audio en español";
        const requestPayload = {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }, imagePart, audioPart],
            },
          ],
        };

        console.log("Enviando a Gemini datos");
        const result = await model.generateContent(requestPayload);

        const response = await result.response;
        const text = await response.text();
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

  useEffect(() => {
    if (aiResponse) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(aiResponse);
      synth.speak(utterThis);
    }
  }, [aiResponse]);

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
