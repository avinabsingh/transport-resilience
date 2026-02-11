import pandas as pd
import joblib
import os
import sys

from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# Import config paths
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from utils.config import PROCESSED_DATA


MODEL_PATH = "data/processed/accident_model.pkl"


def load_data():
    print("Loading processed dataset...")
    df = pd.read_csv(PROCESSED_DATA)
    return df


def split_data(df):
    print("Splitting features and target...")
    X = df.drop("Accident_severity", axis=1)
    y = df["Accident_severity"]

    return train_test_split(X, y, test_size=0.2, random_state=42)


def train_model(X_train, y_train):
    print("Training Random Forest model...")
    
    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=14,
        class_weight="balanced",
        random_state=42
    )

    model.fit(X_train, y_train)
    return model


def evaluate(model, X_test, y_test):
    print("\nEvaluating model...")
    preds = model.predict(X_test)

    print("Accuracy:", accuracy_score(y_test, preds))
    print(classification_report(y_test, preds))


def save_model(model):
    print("Saving trained model...")
    os.makedirs("data/processed", exist_ok=True)
    joblib.dump(model, MODEL_PATH)


def main():
    df = load_data()
    X_train, X_test, y_train, y_test = split_data(df)
    smote = SMOTE(random_state=42)
    X_train, y_train = smote.fit_resample(X_train, y_train)


    model = train_model(X_train, y_train)
    evaluate(model, X_test, y_test)

    save_model(model)

    print("\nModel training complete ✔")


if __name__ == "__main__":
    main()
