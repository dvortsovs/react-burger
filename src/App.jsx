import React from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage, LoginPage } from './pages';
import Layout from "./components/layout/layout";


export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}