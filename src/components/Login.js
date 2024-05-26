import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/f5/82/5e/f5825ee00a9b4bf01f7a1b2960718b07.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-transparent p-8 rounded-lg shadow-md text-white">
        <h4 className="text-xl font-semibold mb-4 text-center">WELCOME!</h4>
        {error && <p className="text-white mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4 flex items-center relative">
            <FaEnvelope className="absolute left-3 top-3 text-white" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-md bg-transparent text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center relative">
            <FaLock className="absolute left-3 top-3 text-white" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-md bg-transparent text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? <FaEyeSlash className="absolute right-3 top-3 text-white cursor-pointer" onClick={() => setShowPassword(false)} /> : <FaEye className="absolute right-3 top-3 text-white cursor-pointer" onClick={() => setShowPassword(true)} />}
          </div>
          <button
            type="submit"
            className="w-32 bg-transparent text-white py-2 rounded-md border border-white hover:bg-white hover:text-black mx-auto block"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
