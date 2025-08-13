/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import FoldersPage from "./pages/FoldersPage";
import SummaryPage from "./pages/SummaryPage";
export const UserDataContext = createContext();

const App = () => {
    
    const [userData, setuserData] = useState([])

    return  (
        <UserDataContext value={{userData, setuserData}} >
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/folders"
                    element={<FoldersPage />}
                />
                <Route
                    path="/summary"
                    element={<SummaryPage />}
                />
            </Routes>
        </UserDataContext>
    );
};

export default App;
