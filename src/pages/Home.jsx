import styles from '../styles/Home.module.css';
import Menu from "../components/Menu";
import { ArticlePage } from "./ArticlePage";
import { DraftPage } from "./DraftsPage";
import { CreateArticle } from "./CreateArticle";
import { Routes, Route } from 'react-router-dom';
import {Profile} from "./Profile";
import OpenPage from "./OpenPage";
import EditDraftPage from "./EditDraftPage";

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
                <Routes>
                    <Route path="/" element={<ArticlePage />} />
                    <Route path="/drafts" element={<DraftPage />} />
                    <Route path="/create-article" element={<CreateArticle />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/article/:id" element={<OpenPage />} />
                    <Route path="/drafts/:id" element={<OpenPage />} />
                    <Route path="/drafts/:id/edit" element={<EditDraftPage />} />
                </Routes>
            </main>
            <footer className={styles.footer}>
                © {new Date().getFullYear()} Lab Publications. Все права защищены.
            </footer>
        </div>
    );
}