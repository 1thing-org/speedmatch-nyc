import styles from '../styles/HeroWrapper.module.css';

type HeroWrapperProps = {
  children: React.ReactNode;
};

function HeroWrapper({ children }: HeroWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.borderLine}></div>
      <div className={styles.heroContent}>{children}</div>
      <div className={styles.borderLine}></div>
    </div>
  );
}

export default HeroWrapper