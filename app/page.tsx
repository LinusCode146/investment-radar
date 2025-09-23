"use client"

import {useState} from "react";
import InvestmentMap from "@/components/InvestmentMap";
import InvestmentsFinished from "@/components/InvestmentsFinished";
import styles from "@/components/Navigation.module.css";
import React from "react";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
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

    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <button
          onClick={() => window.location.href = '/datenschutz'}
          className={styles.datenschutzButton}
        >
          Datenschutz + Netiquette
        </button>
        <button
          onClick={() => window.location.href = '/impressum'}
          className={styles.impressumButton}
        >
          Impressum
        </button>
      </div>
    </footer>
    </div>;
}
