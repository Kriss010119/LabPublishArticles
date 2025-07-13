import { useState, useEffect } from 'react';
import { useGetAllPostsQuery, useGetAllDraftsQuery } from '../api/postsAPI';
import styles from "../styles/ArticleCard.module.css";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ type = "published" }) => {
    const {
        data: postsData,
        isLoading: postsLoading,
        error: postsError
    } = useGetAllPostsQuery();

    const {
        data: draftsData,
        isLoading: draftsLoading,
        error: draftsError
    } = useGetAllDraftsQuery();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Posts data:', postsData);
        console.log('Drafts data:', draftsData);
        console.log('Posts error:', postsError);
        console.log('Drafts error:', draftsError);

        if (type === "published") {
            if (postsData) {
                console.log('Posts items:', postsData.items);
                setArticles(postsData.items || []);
                setLoading(false);
            }
            if (postsError) {
                setError(postsError);
                setLoading(false);
            }
        } else {
            if (draftsData) {
                setArticles(draftsData.items || []);
                setLoading(false);
            }
            if (draftsError) {
                setError(draftsError);
                setLoading(false);
            }
        }
    }, [type, postsData, draftsData, postsError, draftsError]);

    if (loading) {
        return <div className={styles.articlesContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.articlesContainer}>Error: {error.message || 'Failed to load articles'}</div>;
    }

    return (
        <div className={styles.articlesContainer}>
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;