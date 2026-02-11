import os

# Base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# Data paths
RAW_DATA = os.path.join(BASE_DIR, "data", "external", "accidents.csv")
PROCESSED_DATA = os.path.join(BASE_DIR, "data", "processed", "clean_accidents.csv")


MODEL_PATH = "data/processed/accident_model.pkl"
