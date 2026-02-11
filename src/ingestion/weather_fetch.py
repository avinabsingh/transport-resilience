import requests
import json
from datetime import datetime

API_KEY = "e86a83c366a01270e70ccd12522b79fc"
CITY = "Chennai"


def fetch_weather():
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}"

    response = requests.get(url)
    data = response.json()

    # Extract useful fields
    weather = {
        "timestamp": datetime.now().isoformat(),
        "city": CITY,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "weather": data["weather"][0]["main"]
    }

    return weather


if __name__ == "__main__":
    result = fetch_weather()

    print("Fetched Weather:")
    print(result)

    # Save to file
    with open("data/raw/weather.json", "w") as f:
        json.dump(result, f, indent=4)
