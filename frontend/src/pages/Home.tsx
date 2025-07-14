import "../styles/home.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import rasa from "../assets/rasa.webp"
import js from "../assets/js.png"
import python from "../assets/python.png"
import react from "../assets/react.png"
import typescript from "../assets/typescript.png"
import css from "../assets/css-3.png"
import icon from "../assets/icon.png"
import video from "../assets/Screen Recording 2025-04-19 235054.mp4"
import vector from "../assets/vector.png"

function Home() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "What is Svaran?",
      answer: "Svaran is a smart chatbot specifically designed for IIT Jammu students to get information quickly and efficiently about campus resources, courses, and student services."
    },
    {
      question: "How can Svaran help me?",
      answer: "Svaran can answer questions about course schedules, campus facilities, academic policies, upcoming events, and provide guidance on common student inquiries without having to search through multiple websites."
    },
    {
      question: "Is Svaran available 24/7?",
      answer: "Yes! Svaran is available round-the-clock to assist you with information whenever you need it."
    },
    {
      question: "What technologies power Svaran?",
      answer: "Svaran is built using RASA for natural language processing, Python for backend logic, and React with TypeScript for the frontend interface you're using right now."
    }
  ]

  return (
    <div className="home appear">
      <img src={vector} alt="vector" className="vector" />
      <h1 className="line"><span>"</span> Svaran is the smart chatbot</h1>
      <h1 className="line">every IIT Jammu student deserves. <span>"</span></h1>
      <button className="but" onClick={() => navigate("/chat")}>Try Svaran</button>
      <video
        src={video}
        className="ss"
        autoPlay
        loop
        muted
      ></video>

      {/* Privacy Statement */}
      <div className="privacy">
      <h1 className="line heading top-padding"><span>"</span> Your privacy is our priority.</h1>
      <h1 className="line heading">We do not store or retain any user prompts</h1>
      <h1 className="line heading">or personal information. <span>"</span></h1>
      </div>

      <div className="testimonials-section">
        <div className="wave-separator"></div>
        <div className="testimonials-container">
          <div className="testimonial cream-bg">
            <p>"Svaran is the best Mini Project Ever Seen."</p>
            <p className="source">Piyush (2023uma0227)</p>
          </div>
          <div className="testimonial cream-bg">
            <p>"Svaran is the new assistant I've most enjoyed using."</p>
            <p className="source">Anshika Singh (2024uch0005)</p>
          </div>
          <div className="testimonial cream-bg">
            <p>"Svaran is a great name."</p>
            <p className="source">Pratayaksh (2021ucs0108)</p>
          </div>
          <div className="testimonial cream-bg">
            <p>"Rethinking the fundamentals of how students get information."</p>
            <p className="source">Aayush (2021ucs0082)</p>
          </div>
        </div>
      </div>
      <h1 className="line heading"><span>"</span> Technologies Used <span>"</span></h1>
      <div className="tech">
        <img src={rasa} alt="RASA" className="techicon rasa" />
        <img src={python} alt="python" className="techicon" />
        <img src={react} alt="React" className="techicon" />
        <img src={typescript} alt="Typescript" className="techicon" />
        <img src={js} alt="Javascript" className="techicon" />
        <img src={css} alt="CSS" className="techicon" />
        <img src={icon} alt="bot" className="techicon bots" />
      </div>

      {/* FAQ Section */}
      <h1 className="line heading"><span>"</span> Frequently Asked Questions <span>"</span></h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <div className="faq-icon">{activeIndex === index ? '−' : '+'}</div>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Home
