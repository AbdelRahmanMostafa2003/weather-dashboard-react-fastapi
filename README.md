# Weather Dashboard

A full-stack weather app with a React frontend and FastAPI backend.

## Project Structure

Weather/
├── Backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   └── README.md
├── Frontend/
│   └── my-app/
│       ├── src/
│       ├── package.json
│       ├── vite.config.js
│       └── README.md
├── README.md
└── .gitignore

## Features
- Search weather by city
- Show current weather details
- Display mock 5-day forecast cards
- Save favorites and recent searches
- Toggle light/dark mode

## Getting Started

### Backend
1. Go to the Backend folder
2. Create a virtual environment
3. Install dependencies: `pip install -r requirements.txt`
4. Run the server: `uvicorn main:app --reload`

### Frontend
1. Go to the Frontend/my-app folder
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`

## Environment Variables
Create a `.env` file in the Backend folder with:

```env
WEATHER_API_KEY=your_openweather_api_key
```
