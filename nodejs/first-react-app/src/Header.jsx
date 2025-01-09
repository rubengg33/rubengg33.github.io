import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
  return (
    <nav className="navbar">
      <ul className="flex">
        <li><Link to="/World News">World News</Link></li>
        <li><Link to="/Sport">Sport</Link></li>
        <li><Link to="/Finance">Finance</Link></li>
        <li><Link to="/Technology">Technology</Link></li>
        <li><Link to="/Entertainment">Entertainment</Link></li>
      </ul>
    </nav>
  );
}
