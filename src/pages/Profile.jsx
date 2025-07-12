import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/userSlice';
import styles from '../styles/Profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const {  userData } = useSelector(state => state.user);
  const isAuth = true;
  const handleLogout = () => {
    dispatch(signOut());
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2>Личный кабинет</h2>
        <button 
          onClick={handleLogout} 
          className={styles.logoutButton}
        >
          Выйти
        </button>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.userInfo}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarPlaceholder}>
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{userData?.name}</h3>
            <p className={styles.userPosition}>Сотрудник лаборатории</p>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email:</span>
              <span>{userData?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};