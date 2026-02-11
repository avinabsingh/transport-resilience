import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import joblib
import pandas as pd
import requests
from datetime import datetime



from utils.config import MODEL_PATH

API_KEY = "e86a83c366a01270e70ccd12522b79fc"
CITY = "Ahmedabad"

# Load trained model
model = joblib.load(MODEL_PATH)


# -----------------------------
# Convert API weather → dataset category
# -----------------------------
def map_weather(api_weather):

    if api_weather.lower() in ["rain", "drizzle", "thunderstorm"]:
        return 1  # Rainy

    elif api_weather.lower() in ["fog", "mist", "haze"]:
        return 2  # Foggy

    else:
        return 0  # Normal


# -----------------------------
# Fetch live weather
# -----------------------------
def fetch_weather():

    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}"
    data = requests.get(url).json()

    weather_main = data["weather"][0]["main"]
    hour = datetime.now().hour

    return weather_main, hour


# -----------------------------
# Build sample input
# (Using average/default values)
# -----------------------------
def build_sample(weather_cat, hour):

    sample = {
        'Day_of_week':1,
        'Age_band_of_driver':1,
        'Sex_of_driver':1,
        'Driving_experience':2,
        'Type_of_vehicle':2,
        'Service_year_of_vehicle':2,
        'Area_accident_occured':3,
        'Lanes_or_Medians':2,
        'Road_allignment':3,
        'Types_of_Junction':1,
        'Road_surface_type':0,
        'Road_surface_conditions':0,
        'Light_conditions':2,
        'Weather_conditions':weather_cat,
        'Type_of_collision':3,
        'Number_of_vehicles_involved':2,
        'Number_of_casualties':1,
        'Vehicle_movement':2,
        'Hour':hour
    }

    return pd.DataFrame([sample])


# -----------------------------
# MAIN PIPELINE
# -----------------------------
if __name__ == "__main__":

    weather_main, hour = fetch_weather()
    weather_cat = map_weather(weather_main)

    sample_df = build_sample(weather_cat, hour)

    prediction = model.predict(sample_df)[0]

    print("Live Weather:", weather_main)
    print("Predicted Accident Severity:", prediction)
