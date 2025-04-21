from locust import HttpUser, task, between
import random

test_queries = [
    "hello",
    "hi there",
    "good morning",
    "bye",
    "good night",
    "who are you?",
    "what is iit jammu?",
    "describe iit jammu?",
    "who is the director of iit jammu?",
    "who is the assistant registrar?",
    "message from assistant registrar",
    "who is Meena Sharma?",
    "contact Ripul Vaid",
    "contact Sahil Dogra",
    "where is the alumni office located?",
    "how do I contact the alumni office?",
    "what is the dean's message for alumni?",
    "who is on the alumni team?",
    "what services are available for alumni?",
    "I want to learn about alumni events",
    "who is Abhishek in academic affairs?",
    "who is the Dean of Academic Affairs?",
    "who is the Associate Dean for Research?",
    "name of Associate Dean Curriculum",
    "contact Deputy Registrar",
    "can you list UG programmes at IIT Jammu?",
    "what PG courses are offered?",
    "what PhD areas are available?",
    "what is the admission process for BTech?",
    "explain semester system",
    "can I stay in hostel during vacation?",
    "where can I find the timetable?",
    "what is the fee structure?",
    "how do I pay my fees?",
    "what is the UG committee?",
    "what is SUGB?",
    "who is the Faculty Advisor?",
    "how are new UG courses added?",
    "how can UG students appeal issues?",
    "what if SUGB can't resolve my issue?",
    "what is DPGC?",
    "what is SPGB?",
    "who is the Programme Coordinator?",
    "how are new PG courses introduced?",
    "how do PG students submit requests?",
    "can PG students drop a semester?",
    "how do PhD students get help?",
    "how many credits needed for BTech?",
    "is credit load flexible for high CGPA?",
    "how are courses evaluated?",
    "how to register for courses?",
    "how to withdraw from a course?",
    "how are backlogs handled?",
    "does IIT Jammu offer summer term?",
    "what is the attendance policy?",
    "how does grading work?",
    "can I freeze a semester?",
    "what is the branch change policy?",
    "how to apply for internship?",
    "what is the MCM scholarship?",
    "what is QUEST fee waiver?",
    "what is the Freeship scheme?",
    "how do I get the President Gold Medal?"
]


class RasaUser(HttpUser):
    wait_time = between(1, 2)  # seconds between requests
    host = "http://localhost:5173"  # ✅ Fix the host URL

    @task
    def send_query(self):
        query = random.choice(test_queries)
        payload = {"sender": f"user_{random.randint(1,1000)}", "message": query}
        self.client.post("/webhooks/rest/webhook", json=payload)  # ✅ No change needed here
