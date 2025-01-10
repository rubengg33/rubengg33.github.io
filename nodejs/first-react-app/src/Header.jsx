import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
  return (
    <nav className="navbar">
      <ul className="flex" style={{ fontFamily: 'nyt-franklin, helvetica, arial, sans-serif', fontWeight: '500' }}>
        <li><Link to="/World News">World News</Link></li>
        <li><Link to="/Sport">Sport</Link></li>
        <li><Link to="/Finance">Finance</Link></li>
        <li><Link to="/Technology">Technology</Link></li>
        <li><Link to="/Entertainment">Entertainment</Link></li>
      </ul>
    </nav>
  );
}
