import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import joblib
import pandas as pd
import requests
from datetime import datetime
from fastapi import FastAPI

# Load trained model
MODEL_PATH = "data/processed/accident_model.pkl"
API_KEY = "e86a83c366a01270e70ccd12522b79fc"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load(MODEL_PATH)

DATASET_PATH = "data/processed/clean_accidents.csv"
dataset = pd.read_csv(DATASET_PATH)


# Map weather → category
def map_weather(api_weather):
    api_weather = api_weather.lower()

    if api_weather in ["rain","drizzle","thunderstorm"]:
        return 1
    elif api_weather in ["fog","mist","haze"]:
        return 2
    else:
        return 0


@app.get("/predict/{city}")
def predict(city: str):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    data = requests.get(url).json()

    weather_main = data["weather"][0]["main"]
    hour = datetime.now().hour
    weather_cat = map_weather(weather_main)

    # Sample realistic base scenario
    row = dataset.sample(1).drop(columns=["Accident_severity"])
    sample = row.iloc[0].to_dict()

    # Inject LIVE weather influence
    sample["Weather_conditions"] = weather_cat
    sample["Hour"] = hour

    df = pd.DataFrame([sample])
    prediction = model.predict(df)[0]

    lat = data["coord"]["lat"]
    lon = data["coord"]["lon"]

    return {
        "city": city,
        "weather": weather_main,
        "predicted_severity": int(prediction),
        "lat": lat,
        "lon": lon,

        "temp": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"]
    }
