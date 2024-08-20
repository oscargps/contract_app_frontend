import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Header from '../Components/Header';
import Contracts from '../Pages/Contracts';


export function ContractAppRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard />}
                />
                <Route
                    path="/contracts"
                    element={<Contracts />}
                />
            </Routes>
        </BrowserRouter>
    );
}
