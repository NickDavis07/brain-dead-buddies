import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import ErrorPage from './pages/Error';
import SurvivalChecklist from './pages/SurvivalChecklist';
import SingleThought from './pages/SingleThought';
import CreateBlogPost from './pages/CreateBlogPost.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/blog',
        element: <Blog />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/checklist',
        element: <SurvivalChecklist />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }, {
        path: '/blog/new',
        element: <CreateBlogPost />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
