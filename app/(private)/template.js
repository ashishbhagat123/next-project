"use client";
import Header from "../components/Header/Header";
import styles from "./template.modules.scss";

const PrivateLayout = (props) => {
  return (
    <section>
      <Header />
      <div className={styles.mainContent}>{props.children}</div>
    </section>
  );
};

export default PrivateLayout;
