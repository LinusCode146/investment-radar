"use client"

import React, { useState } from "react";
import exStyles from "../investmentTypes/page.module.css"
import styles from "./page.module.css";

interface Message {
    id: string;
    region: string;
    subject: string;
    content: string;
    timestamp: Date;
}

const Page: React.FC = () => {
    const [region, setRegion] = useState('');
    const [subject, setSubject] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!region || !subject || !messageContent) {
            alert('Bitte fülle alle Felder aus');
            return;
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            region,
            subject,
            content: messageContent,
            timestamp: new Date()
        };

        setMessages([...messages, newMessage]);

        // Reset form
        setRegion('');
        setSubject('');
        setMessageContent('');

        alert('Nachricht erfolgreich gesendet!');
    };

    return (
        <div className={styles.container}>
            <header className={exStyles.header}>
                <h1 className={exStyles.title}>Kontakt zu lokalen Behörden</h1>
                <p className={exStyles.subtitle}>
                    Kommuniziere direkt mit deiner Kommune über Investitionsbedarfe und Anliegen. Deine Stimme zählt für die Gestaltung öffentlicher Investitionen.
                </p>
            </header>
            <div className={styles.content}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Nachricht senden</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="region" className={styles.label}>
                                Wähle deine Region
                            </label>
                            <select
                                id="region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className={styles.select}
                                required
                            >
                                <option value="">Region auswählen</option>
                                <option value="geisenheim">Geisenheim</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="subject" className={styles.label}>
                                Betreff
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Kurze Beschreibung deiner Nachricht"
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="messageContent" className={styles.label}>
                                Nachricht
                            </label>
                            <textarea
                                id="messageContent"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                placeholder="Beschreibe dein Anliegen, deine Vorschläge oder Fragen im Detail..."
                                className={styles.textarea}
                                rows={6}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Nachricht senden
                        </button>
                    </form>
                </div>
                <div className={styles.historySection}>
                    <h2 className={styles.sectionTitle}>Nachrichtenverlauf</h2>
                    {messages.length === 0 ? (
                        <p className={styles.noMessages}>
                            Noch keine Nachrichten gesendet. Nutze das Formular, um deine Kommune zu kontaktieren.
                        </p>
                    ) : (
                        <div className={styles.messageList}>
                            {messages.map((message) => (
                                <div key={message.id} className={styles.messageItem}>
                                    <div className={styles.messageHeader}>
                                        <strong>{message.subject}</strong>
                                        <span className={styles.messageDate}>
                                            {message.timestamp.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className={styles.messageRegion}>
                                        Region: {message.region}
                                    </div>
                                    <div className={styles.messageContent}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;