import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({onSuccess}) => {
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
        <div className="auth-form">
            <h2>Вход</h2>
            {error && (
                <div className="error-message" onClick={() => dispatch(clearError())}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </div>
    );
};