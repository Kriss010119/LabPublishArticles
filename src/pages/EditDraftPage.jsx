import { useParams, useNavigate } from 'react-router-dom';
import { useGetDraftByIdQuery, useUpdateDraftMutation, useDeleteDraftMutation } from '../api/postsAPI';
import { CreateArticle } from './CreateArticle';
import styles from '../styles/EditDraftPage.module.css';

const EditDraftPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: draft, isLoading } = useGetDraftByIdQuery(id);
    const [deleteDraft] = useDeleteDraftMutation();

    const handleDelete = async () => {
        try {
            await deleteDraft(id).unwrap();
            navigate('/drafts');
        } catch (err) {
            console.error('Failed to delete draft:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!draft) return <div>Draft not found</div>;

    return (
        <div className={styles.editContainer}>
            <CreateArticle initialData={draft} />
            <button onClick={handleDelete} className={styles.deleteButton}>
                Delete Draft
            </button>
        </div>
    );
};

export default EditDraftPage;