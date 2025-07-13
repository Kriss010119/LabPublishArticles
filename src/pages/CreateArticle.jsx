import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDraftMutation } from '../api/postsAPI';
import styles from '../styles/CreateArticle.module.css';

export const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [createDraft, { isLoading, error }] = useCreateDraftMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createDraft({
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            }).unwrap();
            navigate(`/drafts/${result.id}`);
        } catch (err) {
            console.error('Failed to create draft:', err);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Создание новой статьи</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Содержание</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={isLoading}
                        rows={10}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Теги (через запятую)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                {error && <div className={styles.error}>{error.data?.message || 'Ошибка создания'}</div>}
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Сохранение...' : 'Создать черновик'}
                </button>
            </form>
        </div>
    );
};