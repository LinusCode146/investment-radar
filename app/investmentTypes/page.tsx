import React from 'react';
import styles from './page.module.css';

interface InvestmentCategory {
    id: string;
    title: string;
    description: string;
    examples: string[];
}

const PublicInvestments: React.FC = () => {
    const investmentCategories: InvestmentCategory[] = [
        {
            id: 'education',
            title: 'Bildung',
            description: 'Investitionen in Bildung stärken Schulen, digitale Ausstattung und Weiterbildung.',
            examples: ['Schulen', 'Bibliotheken', 'Weiterbildungszentren']
        },
        {
            id: 'publicSafety',
            title: 'Forschung',
            description: 'Forschung fördert Innovation, Wissenstransfer und technologische Entwicklung.',
            examples: ['Labore', 'Forschungszentren', 'Innovationsprojekte']
        },
        {
            id: 'infrastructure',
            title: 'Digitale Infrastruktur',
            description: 'Digitale Infrastruktur umfasst Netze, Rechenzentren und moderne Technologien.',
            examples: ['Breitband', 'Rechenzentren', '5G-Netze']
        },
        {
            id: 'healthcare',
            title: 'Verkehrsinfrastruktur',
            description: 'Verkehrsinfrastruktur verbindet Menschen durch Straßen, Schienen und Mobilität.',
            examples: ['Straßen', 'Bahnlinien', 'ÖPNV']
        },
        {
            id: 'environment',
            title: 'Soziale Infrastruktur',
            description: 'Soziale Infrastruktur schafft Räume für Gemeinschaft, Unterstützung und Teilhabe.',
            examples: ['Parks', 'Gemeindezentren', 'Wohnprojekte']
        },
        {
            id: 'transportation',
            title: 'Öffentliche Verwaltung',
            description: 'Öffentliche Verwaltung sichert effiziente Abläufe und Bürgerdienste.',
            examples: ['Rathäuser', 'Bürgerämter', 'Serviceportale']
        }

    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Understanding Public Investments</h1>
                <p className={styles.subtitle}>
                    Learn about the different types of public investments that shape our communities and
                    improve quality of life for all citizens.
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

                            <p className={styles.description}>
                                {category.description}
                            </p>

                            <div className={styles.examples}>
                                <h3 className={styles.examplesTitle}>Beispiele:</h3>
                                <p className={styles.examplesList}>
                                    {category.examples.join(', ')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <section className={styles.transparencySection}>
                <div className={styles.transparencyContainer}>
                    <h2 className={styles.transparencyTitle}>Why Public Investment Transparency Matters</h2>

                    <div className={styles.transparencyGrid}>
                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.accountabilityIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Accountability</h3>
                            <p className={styles.transparencyCardDescription}>
                                Citizens can track how public funds are allocated and used in their communities.
                            </p>
                        </div>

                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.engagementIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Civic Engagement</h3>
                            <p className={styles.transparencyCardDescription}>
                                Informed citizens can participate more effectively in public discourse and decision-making.
                            </p>
                        </div>

                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.outcomesIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Better Outcomes</h3>
                            <p className={styles.transparencyCardDescription}>
                                Transparency leads to more efficient allocation of resources and improved project outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Get Involved in Your Community</h2>
                    <p className={styles.ctaDescription}>
                        Ready to explore public investments in your area? Use our interactive maps to see
                        completed projects and suggest new ones for your community.
                    </p>

                    <div className={styles.ctaButtons}>
                        <button className={styles.primaryButton}>Explore Investment Maps</button>
                        <button className={styles.secondaryButton}>Contact Local Officials</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicInvestments;