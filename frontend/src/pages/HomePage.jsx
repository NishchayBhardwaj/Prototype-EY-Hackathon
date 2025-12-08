import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import './HomePage.css';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// Animated Section component
const AnimatedSection = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
        >
            {children}
        </motion.div>
    );
};

// Stats counter component
const StatCounter = ({ value, suffix = '', label }) => {
    return (
        <motion.div className="stat-item" variants={scaleIn}>
            <div className="stat-value">
                {value}<span className="stat-suffix">{suffix}</span>
            </div>
            <div className="stat-label">{label}</div>
        </motion.div>
    );
};

// Feature card component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
    return (
        <motion.div
            className="feature-card"
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            <div className="feature-icon">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </motion.div>
    );
};

// Agent card component
const AgentCard = ({ icon, title, description, features, color }) => {
    return (
        <motion.div
            className={`agent-card agent-card--${color}`}
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
        >
            <div className={`agent-icon agent-icon--${color}`}>{icon}</div>
            <h3 className="agent-title">{title}</h3>
            <p className="agent-description">{description}</p>
            <ul className="agent-features">
                {features.map((feature, index) => (
                    <li key={index}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

// Process step component
const ProcessStep = ({ number, title, description, isLast = false }) => {
    return (
        <motion.div className="process-step" variants={fadeInUp}>
            <div className="process-step__number">{number}</div>
            <div className="process-step__content">
                <h4 className="process-step__title">{title}</h4>
                <p className="process-step__description">{description}</p>
            </div>
            {!isLast && <div className="process-step__connector" />}
        </motion.div>
    );
};

const HomePage = () => {
    // AI Agents data
    const agents = [
        {
            icon: '🔍',
            title: 'Data Validation Agent',
            description: 'Automatically validates provider information against multiple data sources',
            features: [
                'Web scraping of provider practice websites',
                'Cross-reference with NPI registry',
                'Phone & address validation',
                'Confidence scoring'
            ],
            color: 'blue'
        },
        {
            icon: '📊',
            title: 'Information Enrichment Agent',
            description: 'Enriches provider profiles with additional verified information',
            features: [
                'Education & certification searches',
                'Specialty verification',
                'Network gap analysis',
                'Standardized profile creation'
            ],
            color: 'teal'
        },
        {
            icon: '✅',
            title: 'Quality Assurance Agent',
            description: 'Ensures data integrity and flags inconsistencies for review',
            features: [
                'Multi-source comparison',
                'Fraud detection flagging',
                'Quality metrics tracking',
                'Priority-based review queuing'
            ],
            color: 'purple'
        },
        {
            icon: '📁',
            title: 'Directory Management Agent',
            description: 'Manages provider directory updates across all platforms',
            features: [
                'Multi-format generation',
                'Automated alerts system',
                'Summary reports',
                'Workflow management'
            ],
            color: 'green'
        }
    ];

    // Features data
    const features = [
        {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Validate 200+ provider profiles in under 30 minutes versus weeks of manual work'
        },
        {
            icon: '🎯',
            title: '95%+ Accuracy',
            description: 'AI-powered validation achieves industry-leading accuracy through multi-source verification'
        },
        {
            icon: '🔄',
            title: 'Continuous Updates',
            description: 'Real-time monitoring and automated updates keep your directory always current'
        },
        {
            icon: '📱',
            title: 'Multi-Platform',
            description: 'Synchronized updates across web, mobile, and print directories'
        },
        {
            icon: '🛡️',
            title: 'Compliance Ready',
            description: 'Meet regulatory requirements with automated audit trails and documentation'
        },
        {
            icon: '💡',
            title: 'Smart Prioritization',
            description: 'AI prioritizes reviews based on member impact and data confidence levels'
        }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__background">
                    <div className="hero__glow hero__glow--1" />
                    <div className="hero__glow hero__glow--2" />
                    <div className="hero__grid" />
                </div>

                <div className="hero__content container">
                    <motion.div
                        className="hero__badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="hero__badge-dot" />
                        AI-Powered Healthcare Solution
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Transform Your{' '}
                        <span className="text-gradient">Provider Directory</span>{' '}
                        with Intelligent Automation
                    </motion.h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Say goodbye to inaccurate provider data. Our Agentic AI system automatically
                        validates, enriches, and maintains provider directories with 95%+ accuracy,
                        reducing manual verification time by 80%.
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Link to="/verify" className="btn btn--primary btn--lg">
                            Start Validating
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <a href="#how-it-works" className="btn btn--secondary btn--lg">
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <AnimatedSection className="hero__stats">
                        <StatCounter value="80" suffix="%" label="Directory Error Rate" />
                        <StatCounter value="200" suffix="+" label="Profiles Validated" />
                        <StatCounter value="30" suffix=" min" label="Validation Time" />
                        <StatCounter value="95" suffix="%" label="Accuracy Achieved" />
                    </AnimatedSection>
                </div>

                {/* Hero visual */}
                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="hero__dashboard">
                        <div className="dashboard-header">
                            <div className="dashboard-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="dashboard-title">Provider Validation Dashboard</span>
                        </div>
                        <div className="dashboard-content">
                            <div className="dashboard-card dashboard-card--validated">
                                <div className="dashboard-card__icon">✓</div>
                                <div className="dashboard-card__info">
                                    <span className="dashboard-card__value">156</span>
                                    <span className="dashboard-card__label">Validated</span>
                                </div>
                            </div>
                            <div className="dashboard-card dashboard-card--pending">
                                <div className="dashboard-card__icon">⏳</div>
                                <div className="dashboard-card__info">
                                    <span className="dashboard-card__value">32</span>
                                    <span className="dashboard-card__label">In Progress</span>
                                </div>
                            </div>
                            <div className="dashboard-card dashboard-card--review">
                                <div className="dashboard-card__icon">⚠</div>
                                <div className="dashboard-card__info">
                                    <span className="dashboard-card__value">12</span>
                                    <span className="dashboard-card__label">Needs Review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Problem Section */}
            <section className="problem section">
                <div className="container">
                    <AnimatedSection className="problem__header">
                        <motion.span className="section-label" variants={fadeInUp}>The Challenge</motion.span>
                        <motion.h2 className="section-title" variants={fadeInUp}>
                            Provider Directories Are <span className="text-gradient">Broken</span>
                        </motion.h2>
                        <motion.p className="section-subtitle" variants={fadeInUp}>
                            Healthcare payers struggle with maintaining accurate provider directories,
                            leading to member frustration, compliance risks, and wasted resources.
                        </motion.p>
                    </AnimatedSection>

                    <AnimatedSection className="problem__grid">
                        <motion.div className="problem-card" variants={fadeInUp}>
                            <div className="problem-card__stat">40-80%</div>
                            <div className="problem-card__text">
                                <h4>Inaccurate Contact Info</h4>
                                <p>Provider directories contain outdated addresses, phone numbers, and professional details</p>
                            </div>
                        </motion.div>
                        <motion.div className="problem-card" variants={fadeInUp}>
                            <div className="problem-card__stat">100s</div>
                            <div className="problem-card__text">
                                <h4>Monthly Manual Calls</h4>
                                <p>Staff spend countless hours calling providers for basic information updates</p>
                            </div>
                        </motion.div>
                        <motion.div className="problem-card" variants={fadeInUp}>
                            <div className="problem-card__stat">Weeks</div>
                            <div className="problem-card__text">
                                <h4>Credential Verification</h4>
                                <p>Time-consuming processes delay provider network additions significantly</p>
                            </div>
                        </motion.div>
                        <motion.div className="problem-card" variants={fadeInUp}>
                            <div className="problem-card__stat">3+</div>
                            <div className="problem-card__text">
                                <h4>Data Inconsistencies</h4>
                                <p>Multiple platforms (web, mobile, print) with conflicting provider information</p>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Solution Section - AI Agents */}
            <section className="agents section" id="agents">
                <div className="container">
                    <AnimatedSection className="agents__header">
                        <motion.span className="section-label" variants={fadeInUp}>Our Solution</motion.span>
                        <motion.h2 className="section-title" variants={fadeInUp}>
                            Meet Your <span className="text-gradient">AI Agent Team</span>
                        </motion.h2>
                        <motion.p className="section-subtitle" variants={fadeInUp}>
                            Four specialized AI agents work together to automate provider data validation,
                            enrichment, and directory management with unprecedented efficiency.
                        </motion.p>
                    </AnimatedSection>

                    <AnimatedSection className="agents__grid">
                        {agents.map((agent, index) => (
                            <AgentCard key={index} {...agent} />
                        ))}
                    </AnimatedSection>
                </div>
            </section>

            {/* How It Works */}
            <section className="process section" id="how-it-works">
                <div className="container">
                    <AnimatedSection className="process__header">
                        <motion.span className="section-label" variants={fadeInUp}>How It Works</motion.span>
                        <motion.h2 className="section-title" variants={fadeInUp}>
                            From Input to <span className="text-gradient">Validated Output</span>
                        </motion.h2>
                        <motion.p className="section-subtitle" variants={fadeInUp}>
                            Our streamlined process transforms raw provider data into verified,
                            enriched profiles ready for deployment across all platforms.
                        </motion.p>
                    </AnimatedSection>

                    <AnimatedSection className="process__steps">
                        <ProcessStep
                            number="01"
                            title="Data Ingestion"
                            description="Add provider data via the form or upload files in PDF, CSV, Text, and other supported formats. Our system automatically handles structured and unstructured inputs."
                        />
                        <ProcessStep
                            number="02"
                            title="AI Validation"
                            description="AI agents automatically validate contact info, credentials, and licenses against NPI registry, state boards, and web sources."
                        />
                        <ProcessStep
                            number="03"
                            title="Enrichment & Scoring"
                            description="Profiles are enriched with additional verified data and assigned confidence scores based on source reliability."
                        />
                        <ProcessStep
                            number="04"
                            title="Review & Deploy"
                            description="Low-confidence items are flagged for human review. Validated profiles sync across all directories automatically."
                            isLast
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features section">
                <div className="container">
                    <AnimatedSection className="features__header">
                        <motion.span className="section-label" variants={fadeInUp}>Features</motion.span>
                        <motion.h2 className="section-title" variants={fadeInUp}>
                            Everything You Need for <span className="text-gradient">Data Excellence</span>
                        </motion.h2>
                    </AnimatedSection>

                    <AnimatedSection className="features__grid">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </AnimatedSection>
                </div>
            </section>

            {/* Demo Section */}
            <section className="demo section">
                <div className="container">
                    <AnimatedSection className="demo__content">
                        <motion.div className="demo__info" variants={fadeInUp}>
                            <span className="section-label">Live Demo</span>
                            <h2 className="section-title">
                                See The <span className="text-gradient">Magic</span> In Action
                            </h2>
                            <p className="section-subtitle">
                                Watch our AI agents validate 200 provider profiles in real-time,
                                demonstrating the complete validation cycle in under 30 minutes.
                            </p>
                            <div className="demo__highlights">
                                <div className="demo__highlight">
                                    <span className="demo__highlight-icon">📄</span>
                                    <span>Scanned PDF Support</span>
                                </div>
                                <div className="demo__highlight">
                                    <span className="demo__highlight-icon">🔗</span>
                                    <span>Multi-Source Validation</span>
                                </div>
                                <div className="demo__highlight">
                                    <span className="demo__highlight-icon">📧</span>
                                    <span>Auto Email Generation</span>
                                </div>
                            </div>
                            <Link to="/verify" className="btn btn--primary btn--lg demo__cta">
                                Try The Demo Now
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </motion.div>

                        <motion.div className="demo__visual" variants={scaleIn}>
                            <div className="demo__window">
                                <div className="demo__window-header">
                                    <div className="demo__window-dots">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <span>Provider Validation Results</span>
                                </div>
                                <div className="demo__window-content">
                                    <div className="demo__provider">
                                        <div className="demo__provider-info">
                                            <div className="demo__provider-avatar">👨‍⚕️</div>
                                            <div>
                                                <div className="demo__provider-name">Dr. Sarah Johnson, MD</div>
                                                <div className="demo__provider-specialty">Cardiology • NPI: 1234567890</div>
                                            </div>
                                        </div>
                                        <div className="demo__provider-status demo__provider-status--verified">
                                            ✓ Verified
                                        </div>
                                    </div>
                                    <div className="demo__results">
                                        <div className="demo__result demo__result--success">
                                            <span>Address</span>
                                            <span>✓ Confirmed</span>
                                        </div>
                                        <div className="demo__result demo__result--success">
                                            <span>Phone</span>
                                            <span>✓ Confirmed</span>
                                        </div>
                                        <div className="demo__result demo__result--success">
                                            <span>License</span>
                                            <span>✓ Active</span>
                                        </div>
                                        <div className="demo__result demo__result--warning">
                                            <span>Fax</span>
                                            <span>⚠ Updated</span>
                                        </div>
                                    </div>
                                    <div className="demo__confidence">
                                        <span>Confidence Score</span>
                                        <div className="demo__confidence-bar">
                                            <div className="demo__confidence-fill" style={{ width: '94%' }}></div>
                                        </div>
                                        <span className="demo__confidence-value">94%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <motion.div
                        className="cta__content"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="cta__title">
                            Ready to Transform Your Provider Directory?
                        </h2>
                        <p className="cta__subtitle">
                            Join healthcare organizations saving thousands of hours on provider data management.
                        </p>
                        <div className="cta__buttons">
                            <Link to="/verify" className="btn btn--primary btn--xl">
                                Start Free Demo
                            </Link>
                            <a href="#agents" className="btn btn--ghost btn--xl">
                                Learn More
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer__content">
                        <div className="footer__brand">
                            <div className="footer__logo">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="10" fill="url(#footerLogoGrad)" />
                                    <path
                                        d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM18 25L13 20L14.41 18.59L18 22.17L25.59 14.58L27 16L18 25Z"
                                        fill="white"
                                    />
                                    <defs>
                                        <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#1890ff" />
                                            <stop offset="1" stopColor="#13c2c2" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span>Provider<span className="text-gradient">Verify</span></span>
                            </div>
                            <p className="footer__tagline">
                                AI-Powered Provider Data Validation for Healthcare Payers
                            </p>
                        </div>
                        <div className="footer__links">
                            <Link to="/">Home</Link>
                            <Link to="/verify">Verify</Link>
                            <a href="#agents">AI Agents</a>
                            <a href="#how-it-works">How It Works</a>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <p>© 2024 ProviderVerify. Built for EY Hackathon.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
