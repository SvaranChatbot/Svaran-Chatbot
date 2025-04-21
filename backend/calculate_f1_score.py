import json

# Load results from the results folder
with open('results/intent_report.json', 'r') as file:
    results = json.load(file)

# Check if the results are directly a dictionary or float values
f1_scores = []
for intent, intent_data in results.items():
    if isinstance(intent_data, dict):  # When it is a dictionary with 'f1-score' key
        f1_scores.append(intent_data.get('f1-score', 0))
    elif isinstance(intent_data, float):  # If it's directly a float (for each intent)
        f1_scores.append(intent_data)

# Calculate the average F1-score
average_f1_score = sum(f1_scores) / len(f1_scores) if f1_scores else 0
print(f"Average F1-score: {average_f1_score}")
