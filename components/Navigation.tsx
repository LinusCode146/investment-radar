"use client"

import React from 'react';
import styles from './Navigation.module.css';
import Link from "next/link";
const InvestmentRadar: React.FC = () => {
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
                        <button className={styles.loginBtn}>Log In</button>
                        <button className={styles.signupBtn}>Sign Up</button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Investment Radar:
                        <br />
                        Ideen, die ankommen!
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Auf dieser Website kannst du mitgestalten und erhältst Transparenz!
                    </p>
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className={styles.footer}>
                <nav className={styles.footerNav}>
                    <a href="#" className={styles.footerLink}>Home</a>
                    <a href="#" className={styles.footerLink}>Investitionen im Überblick</a>
                    <a href="#" className={styles.footerLink}>Unsere Mission</a>
                    <a href="#" className={styles.footerLink}>Datenanfrage</a>
                </nav>
                <div className={styles.footerLine}></div>
            </footer>
        </div>
    );
};

export default InvestmentRadar;