import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Header from '../Components/Header';


export function ContractAppRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}
