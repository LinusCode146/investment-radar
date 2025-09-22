import InvestmentMap from "@/components/InvestmentMap";
import InvestmentsFinished from "@/components/InvestmentsFinished";
import styles from "@/components/Navigation.module.css";
import React from "react";


export default function Home() {
  return <div className={styles.gcont}>
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Investment Radar: <br />
          Ideen, die ankommen!
        </h1>
        <p className={styles.subtitle}>
          Auf dieser Website kannst du mitgestalten und erhältst Transparenz!
        </p>
      </div>
    </section>
    <InvestmentMap />
    <InvestmentsFinished />
  </div>;
}
