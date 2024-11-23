
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login/login';
import SignUp from './components/SignUp/SignUp';
import OrderPage from './components/Order/OrderPage';
import OrderCreationPage from './components/Order/OrderCreationPage';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import useGetUserInfo from './hooks/useGetuserInfo';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const accessToken = Cookies.get("accessToken");
  const { user } = useGetUserInfo(accessToken);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute user={user}>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/create"
            element={
              <ProtectedRoute user={user}>
                <OrderCreationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
