import styles from "../styles/Calculation.module.css";

export default function Calculation({ className = "" }: { className?: string }) {
  return (
    <section className={`${styles.calcBlock} ${className}`.trim()}>
      <h3 className={styles.calcHeading}>How The Matching Result Is Calculated</h3>
      <ul className={styles.calcList}>
        <li>
          Each question is initially worth 1 point. Questions from prioritized topics receive a score boost (×2, ×1.6, ×1.3, ×1.15, ×1.05).
        </li>
        <li>
          A candidate’s final score is the sum of all points, including boosts.
        </li>
      </ul>
    </section>
  );
}
