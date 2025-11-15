import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const ResourceList = [
  {
    name: 'APIs',
    image: '/img/resources/apis.svg',
    // href: '/docs/api',
  },
  {
    name: 'SDKs',
    image: '/img/resources/sdks.svg',
    // href: '/docs/sdk',
  },
  {
    name: 'Tutorials',
    image: '/img/resources/tutorials.svg',
    // href: '/docs/tutorial-basics/create-a-document',
  },
  {
    name: 'Github',
    image: '/img/resources/github.svg',
    // href: 'https://github.com/keverdai/keverd_fraud_sdk_android',
  },
  {
    name: 'Help Center',
    image: '/img/resources/help-center.svg',
    // href: '/docs/intro',
  },
];

function Resource({ name, image, href }) {
  return (
    <div className={styles.resourceItem}>
      <Link href={href} className={styles.resourceLink}>
        <div className={styles.resourceCard}>
          <img src={image} alt={name} className={styles.resourceImage} />
          <span className={styles.resourceName}>{name}</span>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageResources() {
  return (
    <section className={styles.resources}>
      <div className="container">
        {/* <Heading as="h2" className={styles.resourcesTitle}>
          Resources
        </Heading> */}
        <div className={styles.resourcesGrid}>
          {ResourceList.map((props, idx) => (
            <Resource key={idx} {...props} />
          ))}
        </div>
      </div>
      <img
        src="/img/resourcespattern.svg"
        alt="Resources Pattern"
        className={styles.resourcesPattern}
      />
    </section>
  );
}
