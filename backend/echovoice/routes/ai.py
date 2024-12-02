from fastapi import APIRouter, HTTPException
from pathlib import Path
import base64
import os

# Definir el router de la API
ai_route = APIRouter(prefix="/api")

# Endpoint para manejar la carga de archivos base64 (audio y foto)
@ai_route.post("/multipart")
async def upload_files(audio: str, image: str):
    try:
        # Crear el directorio de almacenamiento temporal si no existe
        temp_dir = Path("temp_files")
        temp_dir.mkdir(parents=True, exist_ok=True)

        # Decodificar el archivo de audio y la imagen de base64 a binario
        audio_data = base64.b64decode(audio.split(",")[1])  # Eliminar el prefijo de base64
        image_data = base64.b64decode(image.split(",")[1])  # Eliminar el prefijo de base64

        # Guardar el archivo de audio
        audio_path = temp_dir / "audio_file.wav"
        with open(audio_path, "wb") as audio_file:
            audio_file.write(audio_data)

        # Guardar la imagen
        image_path = temp_dir / "image_file.png"
        with open(image_path, "wb") as img_file:
            img_file.write(image_data)

        return {"status": "success", "audio_path": str(audio_path), "image_path": str(image_path)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing files: {str(e)}")
