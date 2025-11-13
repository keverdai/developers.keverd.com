import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Fast & Lightweight',
    image: '/img/fast.svg',
    description: (
      <>
        Data collection completes in under 50ms with total response time under
        100ms. SDK size is less than 600 KB, ensuring minimal impact on your
        app.
      </>
    ),
  },
  {
    title: 'Secure by Design',
    image: '/img/secure.png',
    description: (
      <>
        All sensitive identifiers are SHA-256 hashed client-side. HTTPS-only
        communication is enforced, and no raw PII is stored or logged.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    image: '/img/easy.png',
    description: (
      <>
        Simple API with comprehensive documentation. Get started in minutes with
        just a few lines of code. Perfect for fintech applications.
      </>
    ),
  },
];

function Feature({ title, description, image }) {
  return (
    <div className={clsx('col col--4')}>
      <div
        className={clsx('text--center padding-horiz--md', styles.featureCard)}
      >
        <img src={image} alt={title} className={styles.featureImage} />
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
