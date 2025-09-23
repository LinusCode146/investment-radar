import React, { useState } from 'react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (username: string, password: string) => Promise<boolean>;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const success = await onLogin(username, password);
            if (success) {
                setUsername('');
                setPassword('');
                onClose();
            } else {
                setError('Ungültige Anmeldedaten');
            }
        } catch {
            setError('Fehler bei der Anmeldung');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Admin Login</h2>
                    <button
                        onClick={handleClose}
                        className={styles.closeBtn}
                        disabled={isLoading}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.body}>
                    <div className={styles.formGroup}>
                        <label>Benutzername</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Passwort</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && username && password) {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={`${styles.btn} ${styles.cancel}`}
                            disabled={isLoading}
                        >
                            Abbrechen
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`${styles.btn} ${styles.submit}`}
                            disabled={isLoading || !username || !password}
                        >
                            {isLoading ? 'Anmelden...' : 'Anmelden'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
