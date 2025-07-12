import styles from '../styles/Menu.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/userSlice'; // Импортируем action для выхода

function Menu() {
    const dispatch = useDispatch();
    // Получаем состояние авторизации из Redux store
    const { isAuth } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(signOut()); // Диспатчим action для выхода
    };

    return (
        <nav className={styles.menu}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <NavLink
                        to="/home"
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
                                to="/personal"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Личный кабинет
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
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                            }
                        >
                            Войти
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Menu;