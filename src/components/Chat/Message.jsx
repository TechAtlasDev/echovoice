import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Message({ audio, foto }) {
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function sendToGemini() {
      if (!foto || !audio) return;

      const apiKey = "AIzaSyB75roEJPDCPeTuvEOowrXXc0CPLro1kdY";
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
          'Eres un asistente que genera una descripción detallada del entorno para una persona con discapacidad visual, incluyendo:\n* **Objetos:**  [Ejemplo: identificar y describir objetos como árboles, autos, edificios, personas, etc.]\n* **Peligros:**  [Ejemplo: identificar y describir posibles peligros como semáforos en rojo, pasos de peatones, baches en el pavimento, etc.]\n* **Señales:**  [Ejemplo: identificar y describir señales de tráfico como señales de stop, límites de velocidad, etc.]\n* **Orientación Espacial:**  [Ejemplo: proporcionar información sobre la posición de la persona en relación a otros objetos, como la distancia a la acera, la posición de un semáforo, etc.]\n* **Información Adicional:**  [Ejemplo: proporcionar información adicional sobre el entorno, como "Hay un parque a tu derecha" o "El edificio a tu izquierda es un banco".]\n* **Seguridad:**  [Ejemplo: Si no hay peligros visibles, indicar que el entorno es seguro para caminar, como "La acera es segura para caminar, no hay baches visibles ni obstáculos en tu camino".].\nEvita responder con caracteres especiales, como asteriscos, comillas, simbolos, etc.';
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
  }, [audio, foto]);

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
        <div className='ai-response p-4 flex flex-col lg:items-center'>
          <div>
            <h2>
              <b>Respuesta de la IA:</b>
            </h2>
            <p>{aiResponse}</p>
          </div>
          <hr className='my-4 w-full bg-slate-500' />
          <div className='flex flex-col lg:flex-row gap-6'>
            <img src={foto} alt='Captura' className='my-4 w-full lg:w-auto' />
            <div className='flex flex-col gap-3 w-full lg:w-auto'>
              <h2>Audio capturado:</h2>
              <audio src={audio} controls className='w-full lg:w-auto' />
            </div>
          </div>
        </div>
      ) : (
        <p>Esperando la respuesta de la IA...</p>
      )}
    </div>
  );
}

export default Message;
