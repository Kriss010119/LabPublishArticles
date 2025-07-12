import styles from '../styles/Home.module.css';
import Menu from "../components/Menu";
import ArticleList from "../components/ArticleList";

export const Home = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Lab<span className={styles.accent}>Pubs</span></h1>
                <p className={styles.subtitle}>Scientific publications portal</p>
            </header>
            <nav className={styles.navContainer}>
                <Menu />
            </nav>
            <main className={styles.mainContent}>
                <ArticleList />
            </main>
            <footer className={styles.footer}>
                © {new Date().getFullYear()} Lab Publications. Все права защищены.
            </footer>
        </div>
    );
}