import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Posts } from './components/Posts';
import { Post } from './components/Post';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Profile } from './components/Profile';
import { CommentDetail } from './components/CommentDetail';
import { ResetScroll } from './components/ResetScroll';

export function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <ResetScroll></ResetScroll>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: '/posts',
                    element: <Posts></Posts>
                },
                {
                    path: '/post/:id',
                    element: <Post></Post>
                },
                {
                    path: '/',
                    element: <AuthLayout></AuthLayout>,
                    children: [
                        {
                            path: '/login',
                            element: <LoginForm></LoginForm>
                        },
                        {
                            path: '/signup',
                            element: <SignupForm></SignupForm>
                        }
                    ]
                },
                {
                    path: '/user/:id',
                    element: <Profile></Profile>
                },
                {
                    path: '/comment/:id',
                    element: <CommentDetail></CommentDetail>
                }
            ]
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>;
}
