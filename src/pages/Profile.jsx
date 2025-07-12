import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/userSlice';

export const Profile = () => {
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(signOut());
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page">
      <h2>Личный кабинет</h2>
      <p>Добро пожаловать, {userData?.name}!</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};