import styles from "../styles/burguer.module.css";

const Burguer = ({ clicked, handleOnclick }) => {
  return (
    <div
      className={`${styles.icon} ${styles.navIcon5} ${clicked ? styles.open : ""}`}
      onClick={handleOnclick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Burguer;
