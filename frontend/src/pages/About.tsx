import '../styles/about.css';

function About() {
  return (
    <div className="about-container appear">
      <div className="about-header">
        <h1>About IIT Jammu Chatbot</h1>
        <div className="about-tagline">Your virtual guide to IIT Jammu</div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            The IIT Jammu Chatbot was developed to bridge the information gap for new students and visitors
            to our campus. We understand that navigating a new educational environment can be overwhelming,
            which is why we created this intuitive platform to provide instant, accurate information.
          </p>
        </section>

        <section className="about-section">
          <h2>Why We Built This</h2>
          <p>
            As IIT Jammu continues to grow, we recognized the need for an accessible information system that could:
          </p>
          <ul className="feature-list">
            <li>Help new students faculty and labs locations</li>
            <li>Provide quick answers to frequently asked questions</li>
            <li>Assist visitors and prospective students with relevant information</li>
            <li>Reduce the information overload typically experienced by newcomers</li>
            <li>Make institutional knowledge more accessible to everyone</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>What Our Chatbot Offers</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Academic Information</h3>
              <p>Details about courses, departments, and academic policies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Faculty Offices and Labs</h3>
              <p>Help in getting office rooms and lab locations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Events & Deadlines</h3>
              <p>Information about upcoming events and important dates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❓</div>
              <h3>FAQ Assistance</h3>
              <p>Answers to commonly asked questions about IIT Jammu</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Technology</h2>
          <p>
            Svaran is built using cutting-edge natural language processing and machine learning technologies,
            with RASA as our core conversational AI framework. Our tech stack includes:
          </p>

          <div className="tech-stack">
            <div className="tech-item">
              <h3>Backend</h3>
              <ul className="feature-list">
                <li><strong>RASA:</strong> Open-source machine learning framework for automated conversations and NLU</li>
                <li><strong>Python:</strong> Primary language for our backend logic and NLP processing</li>
                <li><strong>spaCy:</strong> For advanced natural language processing capabilities</li>
                <li><strong>TensorFlow:</strong> Powers our machine learning models</li>
              </ul>
            </div>

            <div className="tech-item">
              <h3>Frontend</h3>
              <ul className="feature-list">
                <li><strong>React:</strong> For building our responsive user interface</li>
                <li><strong>TypeScript:</strong> Ensures type safety and better code quality</li>
                <li><strong>CSS3:</strong> For styling and animations</li>
                <li><strong>Vite:</strong> For fast development and optimized builds</li>
              </ul>
            </div>
          </div>

          <p className="tech-evolution">
            Our chatbot continuously learns and improves through regular training with new data,
            enabling it to provide increasingly relevant and helpful information to our users.
          </p>
        </section>

        <section className="about-section contact">
          <h2>Have Suggestions?</h2>
          <p>
            We're constantly improving our chatbot. If you have suggestions or feedback,
            please reach out to us at <a href="mailto:chatbot-support@iitjammu.ac.in">chatbot-support@iitjammu.ac.in</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
