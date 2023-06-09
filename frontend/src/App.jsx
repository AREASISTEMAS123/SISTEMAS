import React, { useState } from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Sidebar } from './components/commons/Sidebar';
import { Topbar } from './components/commons/Topbar';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} />
                <div className="flex flex-col flex-1">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;