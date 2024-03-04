import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SkeletonTheme highlightColor="#edeeef" baseColor="#C9CCCF">
            <Router></Router>
        </SkeletonTheme>
    </React.StrictMode>
);
