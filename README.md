# Front Chatbot

Cliente web para consultar documentos mediante un chatbot. La interfaz permite seleccionar un usuario, enviar preguntas sobre sus documentos y visualizar la respuesta junto con las fuentes recuperadas por el backend RAG.

## Tecnologías

- Vue 3 con `<script setup>`
- TypeScript
- Vite

## Requisitos

- Node.js
- Un backend accesible que exponga el endpoint `POST /api/chat`

## Instalación

```bash
npm install
```

Crea un archivo `.env.local` en la raíz del proyecto y define la URL base del backend:

```env
VITE_API_URL=http://localhost:3000
```

La variable se usa para construir la petición `${VITE_API_URL}/api/chat`.

## Desarrollo

```bash
npm run dev
```

## Funcionamiento

La aplicación ofrece tres perfiles de prueba:

- `USR001`: contrato y reglamento
- `USR002`: otro contrato
- `USR003`: sin documentos

Al enviar una pregunta, el frontend hace una petición `POST` a `/api/chat` con este cuerpo:

```json
{
  "userId": "USR001",
  "message": "¿Qué debo pagar si quiero retirarme de mi fideicomiso?"
}
```

La respuesta esperada es un objeto con `answer` y una lista opcional `sources`:

```json
{
  "answer": "Texto de la respuesta",
  "sources": [
    {
      "doucmentId": "document-id",
      "documentName": "contrato.pdf",
      "chunkIndex": 0,
      "distance": 0.12
    }
  ]
}
```

## Scripts disponibles

| Comando           | Descripción                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia Vite en modo desarrollo                  |
| `npm run build`   | Comprueba tipos y genera el build de producción |
| `npm run preview` | Sirve localmente el build generado              |
