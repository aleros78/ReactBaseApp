import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle, loginEmailPassword, registerEmailPassword, logout } from '../features/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => dispatch(loginEmailPassword({ email, password }));
  const handleRegister = () => dispatch(registerEmailPassword({ email, password }));
  const handleGoogleLogin = () => dispatch(loginGoogle());
  const handleLogout = () => dispatch(logout());

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <p>Benvenuto, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Registrati</button>
          <button onClick={handleGoogleLogin}>Accedi con Google</button>
        </div>
      )}

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore: {error}</p>}
    </div>
  );
};

export default Auth;
