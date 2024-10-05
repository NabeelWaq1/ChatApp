import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from './Context/AuthContext.jsx';
import { SocketContextProvider } from './Context/socketContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthContextProvider>
        <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthContextProvider>
    </ BrowserRouter>
)
