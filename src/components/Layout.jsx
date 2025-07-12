import Menu from './Menu';

export const Layout = ({ children }) => {
    return (
        <div className="app">
            <Menu />
            <div className="content">
                {children}
            </div>
        </div>
    );
};