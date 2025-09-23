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

            <section className={styles.transparencySection}>
                <div className={styles.transparencyContainer}>
                    <h2 className={styles.transparencyTitle}>Warum Transparenz bei öffentlichen Investitionen wichtig ist</h2>
                    <div className={styles.transparencyGrid}>
                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.accountabilityIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Verantwortlichkeit</h3>
                            <p className={styles.transparencyCardDescription}>
                                Bürgerinnen und Bürger können nachvollziehen, wie öffentliche Mittel verwendet und verteilt werden.
                            </p>
                        </div>
                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.engagementIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Bürgerbeteiligung</h3>
                            <p className={styles.transparencyCardDescription}>
                                Informierte Bürgerinnen und Bürger können sich aktiv an öffentlichen Diskussionen und Entscheidungsprozessen beteiligen.
                            </p>
                        </div>
                        <div className={styles.transparencyCard}>
                            <div className={`${styles.transparencyIcon} ${styles.outcomesIcon}`}></div>
                            <h3 className={styles.transparencyCardTitle}>Bessere Ergebnisse</h3>
                            <p className={styles.transparencyCardDescription}>
                                Transparenz führt zu einer effizienteren Mittelverwendung und besseren Projektergebnissen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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
                        Nachhaltige Investitionen verbinden ökologische Verantwortung, soziale Gerechtigkeit und zukunftsweisende Strukturen. Sie schaffen Mehrwert, der über den Moment hinausgeht – indem sie Qualität sichern, Ressourcen schonen und gleichzeitig in Bildung, Forschung sowie moderne Infrastrukturen investieren. Doch was genau verstehen wir unter ihnen?
                    </p>
                    <h3 className={styles.nachhaltigkeitSubtitle}>Unsere Definition von Investitionen</h3>
                    <p className={styles.nachhaltigkeitText}>
                        Investitionen sind für uns mehr als bloße Finanzierungen. Sie sind ein aktives Bekenntnis zur Zukunft und Ausdruck unseres Willens, Strukturen aufzubauen, die langfristig Bestand haben. Dabei konzentrieren wir uns auf vier zentrale Kategorien, die wir als entscheidend für eine nachhaltige Entwicklung betrachten:
                    </p>
                    <ul className={styles.nachhaltigkeitList}>
                        <li><strong>Verkehrsinfrastruktur</strong> – Mobilität ist das Rückgrat einer funktionierenden Gesellschaft. Investitionen in moderne, effiziente und nachhaltige Verkehrssysteme tragen dazu bei, Verbindungen zu schaffen, Ressourcen zu schonen und Lebensqualität zu erhöhen.</li>
                        <li><strong>Digitale Infrastruktur</strong> – Eine vernetzte, leistungsfähige digitale Umgebung ist unverzichtbar, um Wissen zugänglich zu machen, Prozesse zu optimieren und Teilhabe in allen Lebensbereichen zu ermöglichen.</li>
                        <li><strong>Bildung</strong> – Sie ist die Grundlage für individuelles Wachstum und gesellschaftliche Entwicklung. Investitionen in Bildung bedeuten, Menschen zu befähigen, ihr Potenzial zu entfalten und die Herausforderungen von morgen aktiv zu gestalten.</li>
                        <li><strong>Forschung</strong> – Neue Erkenntnisse sind der Motor für Fortschritt. Indem wir Forschung fördern, schaffen wir Innovationen, die Lösungen für komplexe Probleme bieten und den Weg in eine nachhaltigere Zukunft ebnen.</li>
                    </ul>
                    <p className={styles.nachhaltigkeitText}>
                        Der besondere Wert dieser Investitionen zeigt sich in ihren <strong>positiven Nebenwirkungen</strong>: Jede dieser Maßnahmen unterstützt nicht nur die direkte Entwicklung in ihrem Bereich, sondern leistet auch einen Beitrag zum <strong>Umweltschutz</strong>. Bildung fördert Bewusstsein, Forschung ermöglicht neue ökologische Technologien, digitale Infrastruktur reduziert unnötige Wege, und eine nachhaltige Verkehrsinfrastruktur senkt Emissionen.
                    </p>
                    <p className={styles.nachhaltigkeitText}>
                        So verstehen wir Investitionen nicht nur als Mittel, um ökonomische Stärke aufzubauen, sondern auch als Instrument, um eine lebenswerte Zukunft zu sichern. Investitionen in diesen Bereichen sind Investitionen in Menschen, in Wissen, in Vernetzung – und letztlich in den Schutz unserer Umwelt.
                    </p>
                    <h3 className={styles.nachhaltigkeitSubtitle}>Unsere Definition von Nachhaltigkeit</h3>
                    <p className={styles.nachhaltigkeitText}>
                        Nachhaltigkeit verstehen wir als ein Prinzip, das über kurzfristige Trends hinausgeht und die Grundlage für verantwortungsvolles Handeln bildet. Für uns beginnt Nachhaltigkeit mit einem klaren Anspruch an <strong>Qualität</strong>. Qualität zeigt sich nicht allein im Moment der Nutzung, sondern über den gesamten Lebenszyklus hinweg.
                    </p>
                    <p className={styles.nachhaltigkeitText}>
                        Drei Aspekte stehen dabei im Vordergrund: <strong>Funktionalität, Durabilität und Kompatibilität</strong>.
                    </p>
                    <ul className={styles.nachhaltigkeitList}>
                        <li><strong>Funktionalität</strong> bedeutet, dass Produkte und Lösungen ihren Zweck zuverlässig erfüllen und den Menschen einen echten Mehrwert bieten.</li>
                        <li><strong>Durabilität</strong> beschreibt die Langlebigkeit. Was robust ist und lange genutzt werden kann, spart Ressourcen und vermeidet Abfall.</li>
                        <li><strong>Kompatibilität</strong> schließlich sorgt dafür, dass Systeme miteinander harmonieren, weiterentwickelt und in bestehende Strukturen eingebunden werden können, anstatt sie zu verdrängen.</li>
                    </ul>
                    <p className={styles.nachhaltigkeitText}>
                        Doch Nachhaltigkeit erschöpft sich nicht in technischen oder materiellen Eigenschaften. Sie ist immer auch ein gesellschaftliches und ökologisches Versprechen. Deshalb achten wir auf eine <strong>ökologisch nachhaltige Ausrichtung</strong>, die Ressourcen schont, Emissionen reduziert und die natürlichen Lebensgrundlagen bewahrt. Gleichzeitig ist uns eine <strong>soziale Gerechtigkeit</strong> wichtig, die faire Arbeitsbedingungen, respektvolle Zusammenarbeit und einen gleichberechtigten Zugang zu Chancen sicherstellt.
                    </p>
                    <p className={styles.nachhaltigkeitText}>
                        In unserem Verständnis ist Nachhaltigkeit somit ein umfassendes Konzept: Es verbindet Qualität mit Verantwortung und schafft die Basis für eine Zukunft, in der wirtschaftlicher Erfolg, ökologischer Schutz und gesellschaftliche Teilhabe kein Widerspruch sind, sondern sich gegenseitig stärken.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PublicInvestments;