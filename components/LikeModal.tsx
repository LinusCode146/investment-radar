import React, { useState } from "react";
import styles from "./LikeModal.module.css";

interface LikeModalProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const LikeModal: React.FC<LikeModalProps> = ({ onSubmit, onCancel }) => {
  const [plz, setPlz] = useState("");
  const [age, setAge] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [touched, setTouched] = useState({ plz: false, age: false, privacy: false });

  const validateField = (field: "plz" | "age" | "privacy") => {
    if (field === "privacy") return privacyChecked;
    if (field === "plz") return plz.trim().length > 0;
    if (field === "age") return age.trim().length > 0;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTouched = { ...touched };
    let allValid = true;
    ["plz", "age", "privacy"].forEach((field) => {
      if (!validateField(field as any)) {
        newTouched[field as keyof typeof touched] = true;
        allValid = false;
      }
    });
    setTouched(newTouched);
    if (allValid) {
      onSubmit();
    }
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Like abgeben</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ihre Postleitzahl</label>
            <input
              type="text"
              className={`${styles.input} ${touched.plz && !validateField("plz") ? styles.invalid : ""}`}
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              placeholder="Postleitzahl"
            />
            {touched.plz && !validateField("plz") && (
              <span className={styles.error}>Postleitzahl ist erforderlich.</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ihr Alter</label>
            <input
              type="number"
              className={`${styles.input} ${touched.age && !validateField("age") ? styles.invalid : ""}`}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Alter"
            />
            {touched.age && !validateField("age") && (
              <span className={styles.error}>Alter ist erforderlich.</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className={`${styles.checkbox} ${touched.privacy && !validateField("privacy") ? styles.invalidCheckbox : ""}`}
              />
              {" "}Ich habe die <a href={'/datenschutz'}>Datenschutzvereinbarun sowie die Netiquette</a> gelesen, verstanden und willige hiermit ein.
            </label>
            {touched.privacy && !validateField("privacy") && (
              <span className={styles.error}>Bitte stimmen Sie der Datenschutzerklärung zu.</span>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Like abgeben
            </button>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LikeModal;

