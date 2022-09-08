import * as React from 'react';
import * as Router from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Protected from "./components/Protected";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <div className="road-background">
        <Header />
        <Router.Routes>
          <Router.Route path='/' element={<Protected />} />
          <Router.Route path='/auth/login' element={<Login />} />
          <Router.Route path='/auth/signup' element={<Signup />} />
          <Router.Route path="*" element={<NotFound />} />
        </Router.Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

