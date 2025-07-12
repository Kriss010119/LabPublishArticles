import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import {Home} from "./pages/Home";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;