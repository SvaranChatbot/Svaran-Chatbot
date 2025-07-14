import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import icon from "../assets/icon.png"

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to={"/"} className='logo'>
        <img src={icon} alt="icon" className='icon' />
        <h1 className="text">Svaran</h1>
        </Link>
      <div className="links">
        <Link to={"/about"} className='link1'>About</Link>
        <Link to={"/team"} className='link1'>Team</Link>
        <Link to={"/contact"} className='link1'>Contact</Link>
      </div>
      <button className="headerbutton" onClick={() => navigate("/chat")}>
        Try Svaran
        <span style={{ marginLeft: '8px'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3L10 8L5 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </header>
  );
};

export default Header;