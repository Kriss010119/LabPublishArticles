import styles from '../../styles/LoginForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';


export const LoginForm = ({ onSuccess }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser(credentials));

        if (loginUser.fulfilled.match(resultAction)) {
            onSuccess && onSuccess();
            navigate('/profile');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authForm}>
                <h2>Вход</h2>
                {error && (
                    <div className={styles.errorMessage} onClick={() => dispatch(clearError())}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>

            </div>
        </div>
    );
};