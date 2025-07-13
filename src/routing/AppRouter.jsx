import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ArticlePage } from '../pages/ArticlePage';
import { Layout } from '../components/Layout';
import { DraftPage } from "../pages/DraftsPage";
import { CreateArticle } from "../pages/CreateArticle";
import { Profile } from "../pages/Profile";
import { ErrorPage } from "../pages/ErrorPage";
import  OpenPage  from "../pages/OpenPage";
import  EditDraftPage  from "../pages/EditDraftPage";

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useSelector(state => state.user);
    return isAuth ? children : <Navigate to="/" replace />;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ArticlePage />} />
                <Route path="drafts" element={
                    <ProtectedRoute>
                        <DraftPage />
                    </ProtectedRoute>
                } />
                <Route path="create-article" element={
                    <ProtectedRoute>
                        <CreateArticle />
                    </ProtectedRoute>
                } />
                <Route path="profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="article/:id" element={<OpenPage />} />
                <Route path="drafts/:id"  element={<OpenPage />} />
                <Route path="drafts/:id/edit" element={
                    <ProtectedRoute>
                        <EditDraftPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;