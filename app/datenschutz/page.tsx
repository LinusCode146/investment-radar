"use client"

import styles from "../investmentTypes/page.module.css";
import React from "react";

export default function DatenschutzPage() {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className={styles.title}>Datenschutzvereinbarung und Netiquette</h1>
        <p className={styles.subtitle}>
          Erfahre, wie deine Daten verwendet und geschützt werden.
        </p>
      </section>
      <div className={styles.nachhaltigkeitSection}>
        <div className={styles.nachhaltigkeitContainer}>
          <h2 className={styles.nachhaltigkeitTitle}>Netiquette</h2>
          <ul className={styles.nachhaltigkeitList}>
            <li><strong>1. Echte Angaben:</strong> Bitte gib dein korrektes Alter und deine echte Postleitzahl an.</li>
            <li><strong>2. Einmal abstimmen:</strong> Doppelte oder mehrfache Abstimmungen sind nicht erlaubt.</li>
            <li><strong>3. Fair bleiben:</strong> Stimme ehrlich nach deiner eigenen Meinung ab.</li>
            <li><strong>4. Respekt wahren:</strong> Behandle andere Nutzer*innen respektvoll.</li>
            <li><strong>5. Keine Fakes:</strong> Keine falschen Daten oder Identitäten nutzen.</li>
            <li><strong>6. Datenschutz achten:</strong> Teile keine persönlichen Daten in Kommentaren.</li>
            <li><strong>7. Konstruktiv bleiben:</strong> Kritik sachlich und freundlich formulieren.</li>
            <li><strong>8. Kein Spam:</strong> Keine Werbung, Links oder sinnlose Beiträge posten.</li>
            <li><strong>9. Saubere Sprache:</strong> Keine Beleidigungen, Hassrede oder diskriminierende Inhalte.</li>
          </ul>
          <h2 className={styles.nachhaltigkeitTitle}>Datenschutzhinweise</h2>
          <h3 className={styles.nachhaltigkeitSubtitle}>1. Verantwortlicher</h3>
          <p className={styles.nachhaltigkeitText}>Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />Investment Radar / Jannes Lojewski<br />Hansenbergallee 13<br />65366 Geisenheim<br />jannes.lojewski@gmail.com</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>2. Welche Daten wir erheben</h3>
          <p className={styles.nachhaltigkeitText}>Wir erheben von Ihnen folgende Angaben:<br /><br />Postleitzahl<br />Alter (in Jahren)<br />Like-Information (z. B. Zustimmung zu einer Aussage oder Beitrag)<br /><br />Es werden keine weiteren personenbezogenen Daten wie Name, Adresse oder IP-Adresse dauerhaft gespeichert.</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>3. Zweck der Datenverarbeitung</h3>
          <p className={styles.nachhaltigkeitText}>Die erhobenen Daten werden ausschließlich zu wissenschaftlichen Forschungszwecken genutzt.<br />Wir analysieren zum Beispiel, wie Altersgruppen und Regionen auf bestimmte Inhalte reagieren.</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>4. Rechtsgrundlage</h3>
          <p className={styles.nachhaltigkeitText}>Rechtsgrundlage für die Verarbeitung Ihrer Daten ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.<br />Sie erteilen uns diese Einwilligung, indem Sie die Daten aktiv eingeben und absenden.</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>5. Anonymisierung und Weitergabe</h3>
          <p className={styles.nachhaltigkeitText}>Ihre Daten werden vor der Weitergabe an Dritte anonymisiert.<br />Das bedeutet, dass kein Rückschluss auf Ihre Person möglich ist.<br />Die anonymisierten Daten werden anschließend für wissenschaftliche Forschungseinrichtungen bereitgestellt.</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>6. Speicherdauer</h3>
          <p className={styles.nachhaltigkeitText}>Wir speichern Ihre Daten nur so lange, wie dies für den Forschungszweck erforderlich ist.<br />Anschließend werden sie gelöscht oder ausschließlich in anonymisierter Form aufbewahrt.</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>7. Ihre Rechte</h3>
          <p className={styles.nachhaltigkeitText}>Sie haben nach der DSGVO folgende Rechte:<br /><br />- Auskunft über Ihre gespeicherten Daten<br />- Berichtigung unrichtiger Daten<br />- Löschung Ihrer Daten<br />- Widerruf Ihrer Einwilligung mit Wirkung für die Zukunft<br />- Beschwerde bei einer Datenschutzaufsichtsbehörde</p>
          <h3 className={styles.nachhaltigkeitSubtitle}>8. Kontakt</h3>
          <p className={styles.nachhaltigkeitText}>Wenn Sie Fragen zum Datenschutz haben oder Ihre Rechte wahrnehmen möchten, kontaktieren Sie uns bitte unter:<br />jannes.lojewski@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
