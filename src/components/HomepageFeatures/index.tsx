import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '☕ Java & Backend',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Master Java fundamentals, design patterns, collections, and multithreading.
        Build solid foundation for backend development and technical interviews.
      </>
    ),
  },
  {
    title: '⚛️ React & Frontend',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn React hooks, state management, performance optimization, and best practices.
        Create modern, scalable front-end applications with confidence.
      </>
    ),
  },
  {
    title: '📜 JavaScript & TypeScript',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Understand ES6+, async programming, type safety with TypeScript, and functional programming concepts.
        Master the language that powers modern web development.
      </>
    ),
  },
  {
    title: '📊 Data Structures & Algorithms',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Explore arrays, linked lists, trees, graphs, and algorithms. Master problem-solving
        techniques needed to ace coding interviews across all technologies.
      </>
    ),
  },
  {
    title: '🏗️ System Design & Architecture',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn scalability patterns, database design, microservices, and distributed systems.
        Prepare for high-level system design interviews with confidence.
      </>
    ),
  },
  {
    title: '💡 Interview Tips & Best Practices',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Proven strategies for technical interviews, problem-solving approaches, and real examples.
        Common patterns and pitfalls across different technologies.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
