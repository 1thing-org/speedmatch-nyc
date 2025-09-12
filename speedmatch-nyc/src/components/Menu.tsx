import { Link } from 'react-router';
import styles from '../styles/Menu.module.css';

type MenuProps = {
  onClose: () => void;
};

const links = [
  { text: 'Take Quiz', to: '/quiz' },
  { text: 'Explore Candidates', to: '/explore' },
  { text: 'About This Project', to: '/about' },
  { text: 'Contact', to: '/contact' },
];

function Menu({ onClose }: MenuProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.menuLinks}>
        {links.map((link, idx) => (
          <Link 
            key={idx} to={link.to} onClick={onClose}>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;
