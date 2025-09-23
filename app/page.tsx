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
            onClick={openModal}
            className={styles.datenschutzButton}
        >
          Datenschutz
        </button>
      </div>
    </footer>

    {/* Modal */}
    {isModalOpen && (
        <div
            className={styles.modalOverlay}
            onClick={handleOverlayClick}
        >
          <div className={styles.modalContainer}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Privacy Policy & Terms of Service
              </h2>
            </div>

            {/* Modal Content */}
            <div className={styles.modalContent}>
              {/* Data Usage Section */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Data Usage
                </h3>
                <p className={styles.sectionText}>
                  We collect and use your data to facilitate transparent public investment participation. Your
                  suggestions, votes, and messages are used to improve community engagement and inform
                  local authorities about citizen priorities.
                </p>
              </section>

              {/* Privacy Section */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Privacy
                </h3>
                <p className={styles.sectionText}>
                  Personal information is protected and only shared with relevant local authorities when you send
                  direct messages. Your voting patterns and suggestions may be aggregated for statistical
                  analysis but will not be linked to your personal identity.
                </p>
              </section>

              {/* Terms of Service Section */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Terms of Service
                </h3>
                <p className={styles.sectionText}>
                  By using Investment Radar, you agree to provide accurate information and engage respectfully
                  with the platform. Misuse, spam, or inappropriate content will result in account suspension. The
                  platform is provided as-is for civic engagement purposes.
                </p>
              </section>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button
                  onClick={closeModal}
                  className={styles.understandButton}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
    )}
    </div>;
}
