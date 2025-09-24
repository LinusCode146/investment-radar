"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface InvestmentCategory {
    id: string;
    title: string;
    description: string;
    examples: string[];
}

const PublicInvestments: React.FC = () => {
    const router = useRouter();

    const investmentCategories: InvestmentCategory[] = [
        {
            id: 'bildung',
            title: 'Bildung',
            description: 'Investitionen in Schulen, Weiterbildung und Chancengleichheit.',
            examples: ['Schulen', 'Universitäten', 'Fortbildung']
        },
        {
            id: 'forschung',
            title: 'Forschung',
            description: 'Förderung von Innovation und neuen Erkenntnissen.',
            examples: ['Labore', 'Forschungsprojekte', 'Wissenschaft']
        },
        {
            id: 'digitaleInfrastruktur',
            title: 'Digitale Infrastruktur',
            description: 'Ausbau von schnellen Netzen und digitaler Teilhabe.',
            examples: ['Breitband', 'Cloud-Lösungen', 'IT-Systeme']
        },
        {
            id: 'verkehrsinfrastruktur',
            title: 'Verkehrsinfrastruktur',
            description: 'Moderne und nachhaltige Mobilität für alle.',
            examples: ['ÖPNV', 'Radwege', 'Straßen']
        },
        {
            id: 'sozialeInfrastruktur',
            title: 'Soziale Infrastruktur',
            description: 'Stärkung von Gemeinschaft und sozialer Teilhabe.',
            examples: ['Kitas', 'Pflegeeinrichtungen', 'Sportstätten']
        },
        {
            id: 'oeffentlicheInfrastruktur',
            title: 'Öffentliche Infrastruktur',
            description: 'Investitionen in öffentliche Gebäude und Versorgung.',
            examples: ['Rathäuser', 'Wasserwerke', 'Energieversorgung']
        }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Öffentliche Investitionsarten</h1>
                <p className={styles.subtitle}>
                    Erfahren Sie mehr über die verschiedenen Arten öffentlicher Investitionen, die unsere Gemeinschaften prägen und die Lebensqualität verbessern.
                </p>
            </header>

            <main className={styles.main}>
                <div className={styles.grid}>
                    {investmentCategories.map((category) => (
                        <div key={category.id} className={styles.card}>
                            <div className={styles.iconContainer}>
                                <div className={`${styles.icon} ${styles[category.id]}`}></div>
                                <h2 className={styles.categoryTitle}>{category.title}</h2>
                            </div>
                            <p className={styles.description}>{category.description}</p>
                            <div className={styles.examples}>
                                <h3 className={styles.examplesTitle}>Beispiele:</h3>
                                <p className={styles.examplesList}>{category.examples.join(', ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Engagieren Sie sich in Ihrer Gemeinde</h2>
                    <p className={styles.ctaDescription}>
                        Erkunden Sie öffentliche Investitionen in Ihrer Region auf unserer interaktiven Karte und machen Sie neue Vorschläge für Ihre Gemeinde.
                    </p>
                    <div className={styles.ctaButtons}>
                        <button
                            className={styles.primaryButton}
                            onClick={() => router.push('/')}
                        >
                            Investitionen auf interaktiver Karte erkunden
                        </button>
                        <button
                            className={styles.secondaryButton}
                            onClick={() => router.push('/contact')}
                        >
                            Kontakt zu lokalen Behörden
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.nachhaltigkeitSection}>
                <div className={styles.nachhaltigkeitContainer}>
                    <h2 className={styles.nachhaltigkeitTitle}>Was sind nachhaltige Investitionen?</h2>
                    <p className={styles.nachhaltigkeitText}>
                        Nachhaltige Investitionen sind Investitionen, die auf <strong>Qualität</strong> im umfassenden Sinn ausgerichtet sind. Sie schaffen Strukturen, die <strong>funktional</strong> zuverlässig wirken, <strong>dauerhaft</strong> bestehen und <strong>kompatibel</strong> mit bestehenden Systemen sind. Über diese messbaren Kriterien hinaus können nachhaltige Investitionen zugleich <strong>ökologisch</strong> wirksam sein – etwa durch Ressourcenschonung und Emissionsminderung – und <strong>sozial förderlich</strong>, indem sie Teilhabe und faire Bedingungen unterstützen. Diese Effekte verstehen wir als wertvolle Ergänzungen, auch wenn sie nicht in eigenen Kategorien erfasst werden.
                    </p>
                    <h3 className={styles.nachhaltigkeitSubtitle}>Unsere Definition von Investitionen</h3>
                    <p className={styles.nachhaltigkeitText}>
                        Wir unterscheiden sechs zentrale Kategorien, die für eine nachhaltige Entwicklung besonders relevant sind:
                    </p>
                    <ul className={styles.nachhaltigkeitList}>
                        <li><strong>Bildung</strong> – Investitionen im Bildungssektor umfassen den Ausbau und die qualitative Verbesserung von frühkindlicher, schulischer, beruflicher und akademischer Bildung. Sie zielen darauf ab, Humankapital zu entwickeln, individuelle Kompetenzen zu stärken und gesellschaftliche Innovationsfähigkeit langfristig zu sichern.</li>
                        <li><strong>Forschung</strong> – Investitionen in Forschung schaffen die Grundlage für Wissensproduktion, technologische Innovationen und evidenzbasierte Politikgestaltung. Sie dienen der Entwicklung neuer Lösungsansätze für komplexe gesellschaftliche, ökologische und ökonomische Herausforderungen.</li>
                        <li><strong>Digitale Infrastruktur</strong> – Unter Investitionen in digitale Infrastruktur fallen der Ausbau von Netzen, Rechenzentren, Hard- und Softwarelösungen sowie digitale Plattformen. Sie ermöglichen den Zugang zu Information, die Effizienzsteigerung von Prozessen und die digitale Teilhabe breiter Bevölkerungsgruppen.</li>
                        <li><strong>Verkehrsinfrastruktur</strong> – Investitionen in Verkehrsinfrastruktur betreffen den Erhalt und die Modernisierung von Straßen, Schienen, Wasserwegen und öffentlichem Nah- und Fernverkehr. Ziel ist es, Mobilität als zentrale Voraussetzung für wirtschaftliche Entwicklung, soziale Teilhabe und ökologische Nachhaltigkeit sicherzustellen.</li>
                        <li><strong>Soziale Infrastruktur</strong> – Diese Investitionskategorie umfasst Einrichtungen und Angebote, die soziale Teilhabe und Daseinsvorsorge gewährleisten, darunter Kindertagesstätten, Schulen, Gesundheits- und Pflegeeinrichtungen sowie Freizeit- und Kulturstätten. Sie tragen zur Herstellung gleichwertiger Lebensverhältnisse und zur Stärkung gesellschaftlicher Kohäsion bei.</li>
                        <li><strong>Öffentliche Verwaltung</strong> – Investitionen in öffentliche Verwaltung beziehen sich auf die Modernisierung staatlicher Institutionen, ihre digitale Transformation und die Sicherung organisatorischer Leistungsfähigkeit. Ziel ist eine effiziente, transparente und bürgernahe Erfüllung öffentlicher Aufgaben als Fundament demokratischer Steuerungs- und Entscheidungsprozesse.</li>
                    </ul>
                    <hr />
                    <h3 className={styles.nachhaltigkeitSubtitle}>Unsere Definition von Nachhaltigkeit</h3>
                    <p className={styles.nachhaltigkeitText}>
                        Nachhaltigkeit verstehen wir als Prinzip, das über kurzfristige Trends hinausgeht und die Grundlage für verantwortungsvolles Handeln bildet. Sie beginnt mit einem klaren Anspruch an <strong>Qualität</strong>, die sich über den gesamten Lebenszyklus von Projekten und Strukturen erstreckt.
                    </p>
                    <p className={styles.nachhaltigkeitText}>
                        Drei Dimensionen stehen dabei im Vordergrund:
                    </p>
                    <ul className={styles.nachhaltigkeitList}>
                        <li><strong>Funktionalität</strong> - Lösungen müssen zuverlässig wirken und einen echten Mehrwert bieten.</li>
                        <li><strong>Durabilität</strong>– Robuste, langlebige Strukturen schonen Ressourcen und reduzieren Abfall.</li>
                        <li><strong>Kompatibilität</strong> – Systeme sollen miteinander harmonieren, weiterentwickelt und in bestehende Strukturen eingebunden werden können.</li>
                    </ul>
                    <p className={styles.nachhaltigkeitText}>
                        Nachhaltigkeit ist somit ein umfassendes Konzept: Sie verbindet Qualität mit Verantwortung
                        und schafft die Basis für eine Zukunft, in der ökonomische Stärke, ökologischer Schutz und
                        gesellschaftliche Teilhabe sich gegenseitig stärken.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PublicInvestments;