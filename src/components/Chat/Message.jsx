// Message.js
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Message({ audio, foto, initialPrompt }) {
  const [aiResponse, setAiResponse] = useState(null);

  useEffect(() => {
    async function sendToGemini() {
      if (!foto || !audio) return;

      // Accede a tu clave de API desde una variable de entorno
      const apiKey = "AIzaSyBD3pwUuwobKmxw982w4UHgGSSEt3CcCQw";
      const genAI = new GoogleGenerativeAI(apiKey);

      // Convierte la imagen y el audio a partes de GoogleGenerativeAI
      const fileToGenerativePart = (dataUrl, mimeType) => ({
        inlineData: {
          data: dataUrl.split(",")[1],
          mimeType,
        },
      });

      const imagePart = fileToGenerativePart(foto, "image/png");
      const audioPart = fileToGenerativePart(audio, "audio/webm");

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Usa el prompt recibido como prop
        const prompt = initialPrompt || "Describe esta imagen y audio";
        console.log(prompt);

        console.log("Enviando a Gemini datos");
        const result = await model.generateContent([
          prompt,
          imagePart,
          audioPart,
        ]);
        console.log("recibido");
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        setAiResponse(text); // Guardar la respuesta de la IA en el estado
      } catch (error) {
        console.error("Error al enviar a Gemini:", error);
        setAiResponse("Error al obtener la respuesta de la IA.");
      }
    }

    sendToGemini();
  }, [audio, foto, initialPrompt]);

  return (
    <div className='message'>
      {aiResponse ? (
        <div className='ai-response'>
          <h2>Foto capturada:</h2>
          <img src={foto} alt='Captura' className='mb-4' />
          <h2>Respuesta de la IA:</h2>
          <p>{aiResponse}</p>
        </div>
      ) : (
        <p>Esperando la respuesta de la IA...</p>
      )}
    </div>
  );
}

export default Message;
