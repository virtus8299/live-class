import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/Constants';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.pathname === ROUTES.REGISTER ? 'register' : 'login';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: "",
    confirmPassword: ""
  });
  const [localError, setLocalError] = useState('');

  const { login, register, loading, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [isAuthenticated, navigate])

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setLocalError('')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setLocalError('plese fill in all fields ')
      }
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate(ROUTES.DASHBOARD)
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setLocalError('plese fill in all fields ')
        return;

      }
      if (formData.password.length < 6) {
        setLocalError('Password must be atleast six charecters');
        return;

      }

      if (formData.password !== formData.confirmPassword) {
        setLocalError('Password do not match');
        return;

      }


      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate(ROUTES.DASHBOARD)
      }
    }
  }
  return (
   <AuthForm
   mode={mode}
   formData={formData}
   onChange={handlechange}
   onSubmit={handleSubmit}
   loading={loading}
   error={error}
   localError={localError}/>
  )
}

export default Auth
