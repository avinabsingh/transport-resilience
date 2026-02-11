import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import os
import sys

# Allow import from utils
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from utils.config import RAW_DATA, PROCESSED_DATA


# Columns to drop (post-accident leakage / low value)
DROP_COLUMNS = [
    "Casualty_class",
    "Sex_of_casualty",
    "Age_band_of_casualty",
    "Casualty_severity",
    "Work_of_casuality",
    "Fitness_of_casuality",
    "Pedestrian_movement",
    "Cause_of_accident",
    "Owner_of_vehicle",
    "Vehicle_driver_relation",
    "Defect_of_vehicle",
    "Educational_level"
]


def load_data():
    print("Loading dataset...")
    df = pd.read_csv(RAW_DATA)
    return df


def clean_columns(df):
    print("Dropping unnecessary columns...")
    existing = [col for col in DROP_COLUMNS if col in df.columns]
    df = df.drop(columns=existing)
    return df

def handle_missing(df):
    print("Handling missing values...")

    # Convert string 'na' to actual NaN
    df = df.replace("na", np.nan)

    # Forward fill
    df = df.ffill()

    # Backward fill remaining
    df = df.bfill()

    return df



def process_time(df):
    print("Processing time feature...")
    df["Time"] = pd.to_datetime(df["Time"], errors="coerce")
    df["Hour"] = df["Time"].dt.hour
    df = df.drop(columns=["Time"])
    return df


def encode_categories(df):
    print("Encoding categorical variables...")
    encoders = {}

    for col in df.select_dtypes(include="object").columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    return df, encoders


def save_data(df):
    print("Saving processed dataset...")
    os.makedirs(os.path.dirname(PROCESSED_DATA), exist_ok=True)
    df.to_csv(PROCESSED_DATA, index=False)


def main():
    df = load_data()
    df = clean_columns(df)
    df = handle_missing(df)
    df = process_time(df)
    df, encoders = encode_categories(df)
    save_data(df)

    print("\nPreprocessing Complete ✔")
    print(f"Final Shape: {df.shape}")


if __name__ == "__main__":
    main()
