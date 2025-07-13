import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostByIdQuery, useGetDraftByIdQuery, usePublishDraftMutation } from '../api/postsAPI';
import styles from '../styles/OpenPage.module.css';

const OpenPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const isDraft = pathname.includes('/drafts/');

    const postQuery = useGetPostByIdQuery(id, { skip: isDraft });
    const draftQuery = useGetDraftByIdQuery(id, { skip: !isDraft });

    const [publishDraft] = usePublishDraftMutation();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handlePublish = async () => {
        try {
            const result = await publishDraft(id).unwrap();
            navigate(`/article/${result.id}`);
        } catch (err) {
            console.error('Failed to publish draft:', err);
        }
    };

    const { data: article, isLoading, isError } = isDraft ? draftQuery : postQuery;

    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (isError) return <div className={styles.error}>Error loading article</div>;
    if (!article) return null;

    return (
        <div className={styles.container}>
            <button onClick={handleGoBack} className={styles.backButton}>
                ← Назад
            </button>

            {article.image_url && (
                <div className={styles.imageContainer}>
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className={styles.articleImage}
                    />
                </div>
            )}

            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
                <span className={styles.date}>
                    {article.published_at
                        ? `Published: ${new Date(article.published_at).toLocaleDateString()}`
                        : `Created: ${new Date(article.created_at).toLocaleDateString()}`}
                </span>
                <div className={styles.tags}>
                    {article.tags?.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className={styles.content}>
                {article.content}
            </div>

            {isDraft && (
                <div className={styles.draftActions}>
                    <button
                        onClick={() => navigate(`/drafts/${id}/edit`)}
                        className={styles.editButton}
                    >
                        Редактировать
                    </button>
                    <button
                        onClick={handlePublish}
                        className={styles.publishButton}
                    >
                        Опубликовать
                    </button>
                </div>
            )}
        </div>
    );
};

export default OpenPage;