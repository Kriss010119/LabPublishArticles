import styles from '../styles/ArticleCard.module.css';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();

    if (!article) return null;

    const MAX_WORDS = 30;
    const content = article.content || '';
    const words = content.split(' ');
    const isContentLong = words.length > MAX_WORDS;
    const truncatedContent = isContentLong
        ? words.slice(0, MAX_WORDS).join(' ') + '...'
        : content;

    const formatDate = (dateString) => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        } catch (e) {
            console.error('Error formatting date:', e);
            return '';
        }
    };

    const handleCardClick = () => {
        if (article.status === 'draft') {
            navigate(`/drafts/${article.id}`);
        } else {
            navigate(`/article/${article.id}`);
        }
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            {}
            <div className={styles.cardHeader}>
                <div className={styles.dateBadge}>
                    {formatDate(article.published_at || article.created_at)}
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.divider}></div>
            </div>

            <div className={styles.cardBody}>
                <p className={styles.content}>{truncatedContent}</p>

                {isContentLong && (
                    <button className={styles.readMoreBtn} onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick();
                    }}>
                        Continue Reading →
                    </button>
                )}
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.tags}>
                    {(article.tags || []).map(tag => (
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