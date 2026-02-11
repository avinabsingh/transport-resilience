# Enhancing Transport Network Resilience Using Predictive Analytics

## Overview
This project presents a predictive analytics system designed to estimate accident severity risk based on historical accident data and real-time weather conditions. The system integrates machine learning, backend services, and interactive visualization to demonstrate how environmental factors influence transportation safety.

The solution implements an end-to-end pipeline including data preprocessing, model training, API deployment, and dashboard visualization.

---

## Project Objectives
- Analyze accident datasets to identify risk patterns
- Predict accident severity using machine learning
- Integrate live weather data into prediction workflow
- Provide interactive visualization through a web dashboard
- Demonstrate full predictive analytics lifecycle

---

## System Architecture
The system consists of the following components:

1. **Dataset Processing Layer**
   - Cleaning and encoding accident data
   - Feature selection and transformation
   - Handling missing values
   - SMOTE-based class balancing

2. **Machine Learning Layer**
   - Random Forest classifier
   - Model evaluation and training
   - Serialized model storage (.pkl)

3. **Backend API (FastAPI)**
   - Loads trained model
   - Fetches weather data from OpenWeather API
   - Maps weather conditions to model inputs
   - Serves prediction requests

4. **Frontend Dashboard (React)**
   - Displays weather data
   - Shows prediction results
   - Analytics visualization
   - User interaction interface

5. **Spatial Visualization**
   - Leaflet-based mapping
   - Geographic prediction markers

---

## Technologies Used

### Programming
- Python
- JavaScript

### Data Science
- Pandas
- NumPy
- Scikit-learn
- Imbalanced-learn (SMOTE)

### Backend
- FastAPI
- Uvicorn

### Frontend
- React
- Chart.js
- Leaflet.js

### APIs
- OpenWeather API

---

## Machine Learning Approach
A Random Forest classifier was selected due to its robustness with structured tabular datasets. The dataset exhibited severe class imbalance, which was mitigated using SMOTE oversampling to improve model generalization across severity levels.

Evaluation Metrics:
- Accuracy
- Precision
- Recall
- F1-score

---

## Features
- Accident severity prediction
- Real-time weather integration
- Interactive analytics dashboard
- Geospatial visualization
- Modular backend architecture
- Class imbalance handling

---

## How to Clone the Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/transport-resilience.git
cd transport-resilience


