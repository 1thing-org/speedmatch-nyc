import styles from '../styles/Menu.module.css';

type MenuProps = {
  onClose: () => void;
};

const links = [
  { text: 'Explore Candidates', href: '' },
  { text: 'About This Project', href: '' },
  { text: 'Contact', href: '' },
];

function Menu({ onClose }: MenuProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.menuLinks}>
        {links.map((link, idx) => (
          <a key={idx} href={link.href} onClick={onClose}>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Menu;
