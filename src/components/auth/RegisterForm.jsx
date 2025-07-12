import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegisterStatus, clearError } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="auth-form">
            <h2>Регистрация</h2>
            {error && (
                <div className="error-message" onClick={() => dispatch(clearError())}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    required
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={userData.confirmPassword}
                    onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};