"use client"

import styles from "../investmentTypes/page.module.css";
import React from "react";

export default function ImpressumPage() {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className={styles.title}>Impressum</h1>
        <p className={styles.subtitle}>
          Rechtliche Angaben und Datenschutzhinweise für Investment Radar.
        </p>
      </section>
      <div className={styles.nachhaltigkeitSection}>
        <div className={styles.nachhaltigkeitContainer}>
          <h2 className={styles.nachhaltigkeitTitle}>Angaben gemäß § 5 TMG</h2>
          <p className={styles.nachhaltigkeitText}>
            Schülerprojekt Investment Radar<br />
            Hansenbergallee 13<br />
            65366 Geisenheim<br />
            <br />
            <strong>Vertreten durch:</strong><br />
            Jannes Lojewski
          </p>
          <h2 className={styles.nachhaltigkeitTitle}>Kontakt</h2>
          <p className={styles.nachhaltigkeitText}>
            E-Mail: jannes.lojewski@gmail.com
          </p>
          <h2 className={styles.nachhaltigkeitTitle}>Haftungsausschluss</h2>
          <p className={styles.nachhaltigkeitText}>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
          <h2 className={styles.nachhaltigkeitTitle}>Hinweis zur EU-Streitschlichtung</h2>
          <p className={styles.nachhaltigkeitText}>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
            Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <h2 className={styles.nachhaltigkeitTitle}>Datenschutzerklärung</h2>
          <h3 className={styles.nachhaltigkeitSubtitle}>Wir nehmen den Schutz deiner Daten ernst.</h3>
          <h3 className={styles.nachhaltigkeitSubtitle}>Erhebung und Verarbeitung von Daten</h3>
          <p className={styles.nachhaltigkeitText}>
            Wir erheben nur die Daten, die du freiwillig angibst: Alter und Postleitzahl. Diese Daten werden anonymisiert gespeichert und ausschließlich für wissenschaftliche Auswertungen genutzt. Ein Rückschluss auf deine Person ist nicht möglich.
          </p>
          <h3 className={styles.nachhaltigkeitSubtitle}>Rechtsgrundlage</h3>
          <p className={styles.nachhaltigkeitText}>
            Die Verarbeitung deiner Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Forschung und statistischer Auswertung).
          </p>
          <h3 className={styles.nachhaltigkeitSubtitle}>Speicherdauer</h3>
          <p className={styles.nachhaltigkeitText}>
            Die Daten werden so lange gespeichert, wie sie für die Auswertung benötigt werden, und anschließend gelöscht.
          </p>
          <h3 className={styles.nachhaltigkeitSubtitle}>Weitergabe an Dritte</h3>
          <p className={styles.nachhaltigkeitText}>
            Deine Daten werden in anonymisierten Statistiken zu Forschungszwecken öffentlich freigegeben.<br />
            Fragen hierzu gerne an jannes.lojewski@gmail.com
          </p>
          <h3 className={styles.nachhaltigkeitSubtitle}>Verantwortlich für die Datenverarbeitung</h3>
          <p className={styles.nachhaltigkeitText}>
            Jannes Lojewski<br />
            Hansenbergallee 13<br />
            65366 Geisenheim
          </p>
        </div>
      </div>
    </div>
  );
}
