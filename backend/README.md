# Backend - Echovoice

Bienvenido!, el backend de EchoVoice está desarrollado en su gran mayoría con Python, pero es gestionado por Poetry, este backend fue desarrollado con el objetivo de manejar de manera especializada la interacción que se recciba del frontend por parte del usuario, al backend por parte del modelo.

## Instalación

1. El primer paso para iniciar este proyecto, es instalar Poetry:

```bash
pip intall poetry
```

2. Instalar las depdendencias

```bash
poetry install
```

3. Establecer variables de entorno

Crea un archivo .env en esta carpeta, y dentro pon estas keys con sus respectivos valores:

```
GOOGLE_API_KEY=valor
```

> Puedes obtener tu API KEY en https://ai.google.dev/aistudio?hl=es-419

4. Iniciar el proyecto

```bash
poetry run dev
```

## Endpoints

El sistema cuenta con los siguientes endpoints:

```
/api/talk
```

- Recibe solicitudes POST, que cuentan con un JSON con las siguientes keys:
  1. text: Un texto que procesará el LLM

```
/api/multipart
```

- Recibe solicitudes POST, que sean un conjunto de archivos que se quiere que el modelo pueda procesar.
