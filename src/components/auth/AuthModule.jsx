import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import styles from '../../styles/AuthModule.module.css';

export const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                {isLogin ? (
                    <>
                        <LoginForm
                            onSuccess={onClose}
                        />
                        <p className={styles.switchFormText}>
                            Нет аккаунта?{' '}
                            <button
                                className={styles.switchFormButton}
                                onClick={() => setIsLogin(false)}
                            >
                                Зарегистрироваться
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <RegisterForm
                            onSuccess={onClose}
                        />
                        <p className={styles.switchFormText}>
                            Уже есть аккаунт?{' '}
                            <button
                                className={styles.switchFormButton}
                                onClick={() => setIsLogin(true)}
                            >
                                Войти
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};