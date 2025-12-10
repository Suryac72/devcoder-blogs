import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p style={{fontSize: '1.1rem', marginTop: '1rem', opacity: 0.9}}>
          📚 Comprehensive resource for Java, JavaScript, React, Data Structures, and more!
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            📖 Start Learning
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/blog"
            style={{marginLeft: '1rem'}}>
            ✍️ Read Articles
          </Link>
        </div>
        <div style={{marginTop: '2rem', fontSize: '0.95rem', opacity: 0.85}}>
          <p>🎯 Multi-tech knowledge base • 💡 Real-world examples • ⚡ Quick reference guides</p>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Learn Multiple Technologies`}
      description="Complete knowledge base for Java, JavaScript, TypeScript, React, Data Structures, and more - Interview preparation made easy">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        <section style={{padding: '4rem 0', backgroundColor: '#f5f5f5'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <Heading as="h2">Why Devcoder Knowledge Base?</Heading>
              <p style={{fontSize: '1.1rem', color: '#666', marginTop: '1rem'}}>
                Learn from curated guides covering multiple technologies for interview preparation
              </p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>🔧 Multi-Technology Coverage</h3>
                <p>Java, JavaScript, TypeScript, React, Data Structures, System Design, and more in one place.</p>
              </div>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>💻 Practical Code Examples</h3>
                <p>Hands-on examples and implementations to understand concepts from basic to advanced.</p>
              </div>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>🎯 Interview-Focused</h3>
                <p>Content specifically curated to help you crack technical interviews with confidence.</p>
              </div>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>🔄 Continuously Updated</h3>
                <p>Stay current with latest practices, frameworks, and emerging trends in technology.</p>
              </div>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>🤝 Community Driven</h3>
                <p>Contribute and learn from the community. Share your knowledge and insights freely.</p>
              </div>
              <div style={{padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#0066cc', marginBottom: '1rem'}}>📱 Always Accessible</h3>
                <p>Access the knowledge base from any device, anytime, anywhere you need it.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{padding: '4rem 0'}}>
          <div className="container">
            <div style={{textAlign: 'center'}}>
              <Heading as="h2">Explore Technologies</Heading>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>☕ Java</h3>
                  <p>Collections, Design Patterns, Multithreading</p>
                </div>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>⚛️ React</h3>
                  <p>Hooks, State Management, Performance Optimization</p>
                </div>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>📜 JavaScript & TypeScript</h3>
                  <p>ES6+, Async/Await, Type Safety</p>
                </div>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>📊 DSA</h3>
                  <p>Algorithms, Data Structures, Complexity Analysis</p>
                </div>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>🏗️ System Design</h3>
                  <p>Scalability, Databases, Architecture Patterns</p>
                </div>
                <div style={{padding: '1.5rem', border: '2px solid #0066cc', borderRadius: '8px', textAlign: 'center'}}>
                  <h3>🎯 Interview Tips</h3>
                  <p>Strategies, Problem Solving, Best Practices</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
