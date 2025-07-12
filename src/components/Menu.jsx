import styles from '../styles/Menu.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/userSlice';
import { useState } from 'react';
import { AuthModal } from './auth/AuthModule';

function Menu() {
    const dispatch = useDispatch();
    const { isAuth, userData } = useSelector(state => state.user);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleLogout = () => {
        dispatch(signOut());
    };

    return (
        <nav className={styles.menu}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <NavLink
                        to="/articles"
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
                                Написать статью
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Профиль ({userData?.name})
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