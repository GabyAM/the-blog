import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Home';
import { Posts } from './Posts';
import { Post } from './Post';
import { UserForm } from './UserForm';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function Router() {
    const router = createBrowserRouter([
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
            element: <UserForm></UserForm>,
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
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>;
}
