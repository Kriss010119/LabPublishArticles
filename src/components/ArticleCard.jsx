import styles from '../styles/ArticleCard.module.css';

const ArticleCard = ({ article }) => {
    const MAX_WORDS = 30;
    const words = article.content.split(' ');
    const isContentLong = words.length > MAX_WORDS;
    const truncatedContent = isContentLong
        ? words.slice(0, MAX_WORDS).join(' ') + '...'
        : article.content;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.divider}></div>
            </div>

            <div className={styles.cardBody}>
                <p className={styles.content}>{truncatedContent}</p>

                {isContentLong && (
                    <button className={styles.readMoreBtn}>
                        Continue Reading →
                    </button>
                )}
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.tags}>
                    {article.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <div className={styles.statusIndicator}>
                    Status: <span className={styles[article.status]}>{article.status}</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;