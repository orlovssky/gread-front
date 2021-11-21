import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Welcome from 'pages/Welcome';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route
        path="/welcome"
        element={
          <RequireUnauth>
            <Welcome />
          </RequireUnauth>
        }
      />
      <Route
        path="/signup"
        element={
          <RequireUnauth>
            <Signup />
          </RequireUnauth>
        }
      />
      <Route
        path="/signin"
        element={
          <RequireUnauth>
            <Signin />
          </RequireUnauth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const token = localStorage.getItem('api-token');
  if (token === null) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }

  return children;
}

function RequireUnauth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const token = localStorage.getItem('api-token');
  if (token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default AppRoutes;
