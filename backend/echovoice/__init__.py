from .routes import index, ai
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Diseñando las rutas del sistema
API = FastAPI()

API.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes de todos los dominios
    allow_credentials=True,
    allow_methods=["*"],  # Permite cualquier método (GET, POST, etc.)
    allow_headers=["*"],  # Permite cualquier encabezado
)

API.include_router(index.main_route)
API.include_router(ai.ai_route)

def main():
    uvicorn.run(API, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()