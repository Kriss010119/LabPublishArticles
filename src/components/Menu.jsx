import styles from '../styles/Menu.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/userSlice';
import { useState } from 'react';
import { AuthModal } from './auth/AuthModule';

function Menu() {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const isAuth = true;
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleLogout = () => {
        dispatch(signOut());
    };

    return (
        <nav className={styles.menu}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        Все статьи
                    </NavLink>
                </li>
                {isAuth && (
                    <>
                        <li className={styles.navItem}>
                            <NavLink
                                to="/create-article"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Создать статью
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink
                                to="/drafts"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Черновики
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Профиль ({userData?.id})
                            </NavLink>
                        </li>
                    </>
                )}
                <li className={styles.navItem}>
                    {isAuth ? (
                        <NavLink
                            to="/"
                            className={styles.navLink}
                            onClick={handleLogout}
                        >
                            Выйти
                        </NavLink>
                    ) : (
                        <>
                            <button
                                className={styles.navLink}
                                onClick={() => setShowAuthModal(true)}
                            >
                                Войти
                            </button>
                            {showAuthModal && (
                                <AuthModal onClose={() => setShowAuthModal(false)} />
                            )}
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Menu;