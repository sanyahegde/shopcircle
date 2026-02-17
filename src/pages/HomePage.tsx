import { Header } from '../components/Header'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Shop smarter with your circle
          </h1>
          <p className={styles.heroTagline}>
            Save products, share lists with friends, get their opinions, and
            discover what they actually bought and loved.
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryBtn}>
              Start your circle
            </button>
            <button type="button" className={styles.secondaryBtn}>
              See how it works
            </button>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <h2 className={styles.sectionTitle}>Why ShopCircle?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>📋</span>
              <h3>Save & organize</h3>
              <p>Keep all your wishlist items in one place, from any store.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>👥</span>
              <h3>Share with friends</h3>
              <p>Share lists with your circle and get real opinions before you buy.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>✨</span>
              <h3>Discover favorites</h3>
              <p>See what your friends actually bought and loved.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <ol className={styles.steps}>
            <li>
              <strong>Create your circle</strong> — Invite friends you trust.
            </li>
            <li>
              <strong>Save products</strong> — Add items from anywhere you shop.
            </li>
            <li>
              <strong>Share & get feedback</strong> — Ask your circle what they think.
            </li>
            <li>
              <strong>Discover & buy</strong> — See what they recommend and loved.
            </li>
          </ol>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>ShopCircle — Shop smarter with your circle.</p>
      </footer>
    </div>
  )
}
