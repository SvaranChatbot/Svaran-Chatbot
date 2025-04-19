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




#initial testing dynamic feature

# import json
# from typing import Any, Text, Dict, List
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher

# class ActionListMaterialCourses(Action):
#     def name(self) -> Text:
#         return "action_list_material_courses"

#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # Load JSON data
#         with open("C:\\Users\\user\\Desktop\\rasa\\demo1\\actions\\courses.json", "r") as file:
#             data = json.load(file)

#         # Get Material Engineering courses
#         courses = data.get("material_courses", [])

#         # Create response
#         if courses:
#             response = "Here are the semester-wise courses for Material Engineering:\n" + "\n".join(f"- {course}" for course in courses)
#         else:
#             response = "No courses found in the database."

#         dispatcher.utter_message(text=response)
#         return []
    
# class ActionListMaterialCourses(Action):
    
#     def name(self) -> Text:
#         return "action_director"

#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # Load JSON data
#         with open("C:\\Users\\user\\Desktop\\rasa\\demo1\\actions\\courses.json", "r") as file:
#             data = json.load(file)

        
#         courses = data.get("director", [])

#         # Create response
#         if courses:
#             response =  "\n".join(f"- {course}" for course in courses)
#         else:
#             response = "No courses found in the database."

#         dispatcher.utter_message(text=response)
#         return []



import json
import os
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

#llm integration (work still in progress)

# import openai
# import uuid
# openai.api_key="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"

# class ActionBookTicket(Action):

#     def name(self) ->Text:
#         return "action_book_ticket"
    
#     def run(self,dispatcher:CollectingDispatcher,
#             tracker:Tracker,
#             domain: Dict[Text,Any]) -> List[Dict[Text,Any]]:
#         city=tracker.get_slot("destination")

#         dispatcher.utter_message(text="I have booked a ticket for you")

#         return []



#implementation of forms inside chat and some room booking for parents


# from rasa_sdk import Tracker,ValidationAction
# from rasa_sdk.types import DomainDict

# class ValidatePredefinedSlots(ValidationAction):

#     def validate_phone(
#         self,
#         slot_value: Any,
#         dispatcher: CollectingDispatcher,
#         tracker: Tracker,
#         domain: DomainDict,
#     ) -> Dict[Text,Any]:
#         phone= slot_value.replace('-','')

#         return {"phone":phone}


# class ActionFallBack(Action):
#     def name(self) -> Text:
#         return "action_out_of_scope"

#     def run(self,dispatcher: CollectingDispatcher,
#              tracker:Tracker,
#              domain: Dict[Text,Any]) -> List[Dict[Text,Any]]:
#         print(tracker)
#         query= tracker.latest_message['text']
#         response=openai.ChatCompletion.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {"role":"system","content":"You are a helpful assistant"},
#                 {"role":"user","content":query}
#             ]
#         )
#         dispatcher.utter_message(text=response.choices[0]['message']['content'])
#         return []

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





