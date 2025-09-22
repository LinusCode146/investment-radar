"use client"

import React, { useState } from "react";
import styles from './ContactAuthorities.module.css';

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
            alert('Please fill in all fields');
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

        alert('Message sent successfully!');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Contact Your Local Authorities</h1>
                <p className={styles.subtitle}>
                    Communicate directly with your local commune about investment
                    needs and community concerns. Your voice matters in shaping public
                    investment decisions.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Send a Message</h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="region" className={styles.label}>
                                Select Your Region
                            </label>
                            <select
                                id="region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className={styles.select}
                                required
                            >
                                <option value="">Choose your region</option>
                                <option value="north">North Region</option>
                                <option value="south">South Region</option>
                                <option value="east">East Region</option>
                                <option value="west">West Region</option>
                                <option value="central">Central Region</option>
                            </select>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="subject" className={styles.label}>
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Brief description of your message"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="messageContent" className={styles.label}>
                                Message Content
                            </label>
                            <textarea
                                id="messageContent"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                placeholder="Describe your investment concerns, suggestions, or questions in detail..."
                                className={styles.textarea}
                                rows={6}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Send Message
                        </button>
                    </form>
                </div>

                <div className={styles.historySection}>
                    <h2 className={styles.sectionTitle}>Your Message History</h2>

                    {messages.length === 0 ? (
                        <p className={styles.noMessages}>
                            No messages sent yet. Use the form to contact your local authorities.
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