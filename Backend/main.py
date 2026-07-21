from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("WEATHER_API_KEY")


@app.get("/")
def home():
    return {"message": "Weather API is running"}


@app.get("/weather/{city}")
def get_weather(city: str):
    if not API_KEY:
        return {
            "city": city.title(),
            "temperature": 24,
            "weather": "Clear sky",
            "humidity": 55,
            "wind_speed": 3.2,
            "pressure": 1013,
        }

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url, timeout=10)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Weather service request failed")

    data = response.json()

    return {
    "city": data.get("name", city),
    "country": data.get("sys", {}).get("country", ""),
    "temperature": data.get("main", {}).get("temp", 0),
    "feels_like": data.get("main", {}).get("feels_like", 0),
    "temp_min": data.get("main", {}).get("temp_min", 0),
    "temp_max": data.get("main", {}).get("temp_max", 0),
    "weather": data.get("weather", [{}])[0].get("description", ""),
    "icon": data.get("weather", [{}])[0].get("icon", ""),
    "humidity": data.get("main", {}).get("humidity", 0),
    "wind_speed": data.get("wind", {}).get("speed", 0),
    "pressure": data.get("main", {}).get("pressure", 0),
    "visibility": data.get("visibility", 0),
    "sunrise": data.get("sys", {}).get("sunrise", 0),
    "sunset": data.get("sys", {}).get("sunset", 0),
    }