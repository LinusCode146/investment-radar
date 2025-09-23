"use client"

import React, {useState} from 'react';
import styles from './Navigation.module.css';
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

const Navigation: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, login, logout, isAdmin } = useAuth();

    const handleLogin = async (username: string, password: string) => {
        return await login(username, password);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.container}>
            {/* Header Navigation */}
            <header className={styles.header}>
                <div className={styles.nav}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M12 12V2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <span className={styles.logoText}>Investment Radar</span>
                    </div>

                    <nav className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href={"/investmentTypes"} className={styles.navLink}>Investment Types</Link>
                        <Link className={styles.navLink} href={'/contact'}>Contact</Link>
                        <Link href={"/mission"} className={styles.navLink}>Mission</Link>
                        <Link href={"/data"} className={styles.navLink}>Data</Link>
                    </nav>

                    <div className={styles.authButtons}>
                        {user ? (
                            <div className={styles.userSection}>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={handleLogout}
                                >
                                    Abmelden
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    className={styles.loginBtn}
                                    onClick={() => setIsLoginModalOpen(true)}
                                >
                                    Log In
                                </button>
                                <button className={styles.signupBtn}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </div>
    );
};

export default Navigation;