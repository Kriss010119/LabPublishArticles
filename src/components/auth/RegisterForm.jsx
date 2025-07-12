import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegisterStatus, clearError } from '../../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../styles/RegisterForm.module.css';

export const RegisterForm = ({ onSuccess }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, registerSuccess } = useSelector(state => state.user);

    useEffect(() => {
        if (registerSuccess) {
            onSuccess && onSuccess();
            navigate('/login');
            dispatch(resetRegisterStatus());
        }
    }, [registerSuccess, navigate, dispatch, onSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            dispatch(clearError());
            return;
        }
        await dispatch(registerUser(userData));
    };

    const passwordsMatch = userData.password === userData.confirmPassword && userData.password.length > 0;

    return (
        <div className={styles.authContainer}>
            <div className={styles.authForm}>
                <h2>Регистрация</h2>
                {error && (
                    <div className={styles.errorMessage} onClick={() => dispatch(clearError())}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={userData.password}
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                            required
                            disabled={loading}
                            minLength="6"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                            required
                            disabled={loading}
                        />
                        {userData.password && userData.confirmPassword && (
                            <p className={passwordsMatch ? styles.passwordMatch : styles.passwordMismatch}>
                                {passwordsMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают'}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading || !passwordsMatch}
                    >
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>

            </div>
        </div>
    );
};