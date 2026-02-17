import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <span className={styles.logoMark}>○</span>
        ShopCircle
      </a>
      <nav className={styles.nav}>
        <a href="#how-it-works">How it works</a>
        <a href="#features">Features</a>
        <button type="button" className={styles.cta}>
          Get started
        </button>
      </nav>
    </header>
  )
}
