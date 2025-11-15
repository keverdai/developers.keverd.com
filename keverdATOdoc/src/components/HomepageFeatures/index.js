import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Fast & Lightweight',
    image: '/img/fast.svg',
    description: (
      <>
        Our APIs and SDKs are designed for optimal performance with minimal
        overhead. Fast response times and lightweight implementations ensure
        your applications run smoothly without compromising on functionality.
      </>
    ),
  },
  {
    title: 'Secure by Design',
    image: '/img/secure.png',
    description: (
      <>
        Security is built into every service we offer. All our APIs and SDKs
        follow industry best practices with encrypted communications, secure
        data handling, and comprehensive protection mechanisms.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    image: '/img/easy.png',
    description: (
      <>
        Comprehensive documentation, code samples, and tutorials make it easy to
        integrate our services into your applications. Get started quickly with
        clear guides and well-designed APIs.
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
