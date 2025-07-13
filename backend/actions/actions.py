# # This files contains your custom actions which can be used to run
# # custom Python code.
# #
# # See this guide on how to implement these action:
# # https://rasa.com/docs/rasa/custom-actions


# # This is a simple example for a custom action which utters "Hello World!"

# # from typing import Any, Text, Dict, List
# #
# # from rasa_sdk import Action, Tracker
# # from rasa_sdk.executor import CollectingDispatcher
# #
# #
# # class ActionHelloWorld(Action):
# #
# #     def name(self) -> Text:
# #         return "action_hello_world"
# #
# #     def run(self, dispatcher: CollectingDispatcher,
# #             tracker: Tracker,
# #             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
# #
# #         dispatcher.utter_message(text="Hello World!")
# #
# #         return []
import json
import os
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher



class ActionFetchData(Action):
    def name(self) -> Text:
        return "action_fetch_data"  # Single action for all cases

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Load JSON data - using relative path
        current_dir = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(current_dir, "courses.json")
        
        with open(json_path, "r") as file:
            data = json.load(file)

        # Identify the user's intent
        intent = tracker.latest_message["intent"]["name"]
        
        # Mapping intents to corresponding JSON keys
        intent_mapping = {
            "director_iitjammu": "director",
            "materials_btech_courses_semester_wise": "material_courses",
            
        }

        # Fetch the relevant data from JSON
        key = intent_mapping.get(intent)
        response_data = data.get(key, [])

        # Create response
        if response_data:
            response = "\n".join(f"- {item}" for item in response_data)
        else:
            response = "Sorry, I couldn't find the information you're looking for."

        # Send response back to the user
        dispatcher.utter_message(text=response)
        return []





