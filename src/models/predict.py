


import pandas as pd
import joblib

MODEL_PATH = "data/processed/accident_model.pkl"

# Load model once
model = joblib.load(MODEL_PATH)


def predict_sample(sample_dict):
    df = pd.DataFrame([sample_dict])
    prediction = model.predict(df)[0]
    return prediction


# Example test run
if __name__ == "__main__":

    sample = {
        'Day_of_week':1,
        'Age_band_of_driver':0,
        'Sex_of_driver':1,
        'Driving_experience':2,
        'Type_of_vehicle':3,
        'Service_year_of_vehicle':1,
        'Area_accident_occured':5,
        'Lanes_or_Medians':2,
        'Road_allignment':4,
        'Types_of_Junction':1,
        'Road_surface_type':0,
        'Road_surface_conditions':0,
        'Light_conditions':2,
        'Weather_conditions':1,
        'Type_of_collision':3,
        'Number_of_vehicles_involved':2,
        'Number_of_casualties':1,
        'Vehicle_movement':2,
        'Hour':18
    }

    result = predict_sample(sample)
    print("Predicted Severity:", result)
