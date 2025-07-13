import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDraftMutation, usePublishDraftMutation, useUpdateDraftMutation } from '../api/postsAPI';
import MDEditor from '@uiw/react-md-editor';
import styles from '../styles/CreateArticle.module.css';

export const CreateArticle = ({ initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
    const [createDraft, { isLoading: isCreatingDraft, error: createError }] = useCreateDraftMutation();
    const [publishDraft, { isLoading: isPublishing, error: publishError }] = usePublishDraftMutation();
    const [updateDraft, { isLoading: isUpdating, error: updateError }] = useUpdateDraftMutation();
    const navigate = useNavigate();

    const handleSaveDraft = async (e) => {
        e.preventDefault();
        try {
            if (initialData?.id) {
                try {
                    await updateDraft({
                        id: initialData.id,
                        title,
                        content,
                        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                    }).unwrap();
                    navigate(`/drafts/${initialData.id}`);
                    console.log("Draft updated successfully");
                    return; // Exit if update was successful
                } catch (updateError) {
                    console.log("Update failed, trying to create new draft");
                }
            }

            const result = await createDraft({
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            }).unwrap();
            navigate(`/drafts/${result.id}`);
            console.log("New draft created with ID: ", result.id);
        } catch (err) {
            console.error('Failed to save draft:', err);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        try {
            let draftId = initialData?.id;

            if (draftId) {
                try {
                    await updateDraft({
                        id: draftId,
                        title,
                        content,
                        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                    }).unwrap();
                } catch (updateError) {
                    const draftResult = await createDraft({
                        title,
                        content,
                        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                    }).unwrap();
                    draftId = draftResult.id;
                }
            } else {
                const draftResult = await createDraft({
                    title,
                    content,
                    tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                }).unwrap();
                draftId = draftResult.id;
            }

            const publishResult = await publishDraft(draftId).unwrap();
            navigate(`/article/${publishResult.id}`);
        } catch (err) {
            console.error('Failed to publish:', err);
        }
    };

    const error = createError || publishError || updateError;

    return (
        <div className={styles.container} data-color-mode="light">
            <h2>{initialData?.id ? 'Редактирование черновика' : 'Создание новой статьи'}</h2>
            <form>
                <div className={styles.formGroup}>
                    <label>Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isCreatingDraft || isPublishing || isUpdating}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Содержание</label>
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height={400}
                        preview="edit"
                        className={styles.editor}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Теги (через запятую)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        disabled={isCreatingDraft || isPublishing || isUpdating}
                    />
                </div>
                {error && <div className={styles.error}>{error.data?.message || 'Произошла ошибка'}</div>}
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className={styles.saveButton}
                        disabled={isCreatingDraft || isPublishing || isUpdating}
                    >
                        {isCreatingDraft || isUpdating ? 'Сохранение...' : 'Сохранить черновик'}
                    </button>
                    <button
                        type="button"
                        onClick={handlePublish}
                        className={styles.publishButton}
                        disabled={isCreatingDraft || isPublishing || isUpdating}
                    >
                        {isPublishing ? 'Публикация...' : 'Опубликовать'}
                    </button>
                </div>
            </form>
        </div>
    );
};