import Head from 'next/head';
import config from '@/config/config';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authAtom } from '@/context/Atoms';
import Link from 'next/link';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [auth, setAuth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${config.baseURL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setAuth({ isAuthenticated: true, token: data.token });
        router.push('/homepage');
      } else {
        setError(data.message || 'Invalid credentials, please try again.');
      }
    } catch (error) {
      setError('Network error, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <><Head>
      <title>Login</title>
    </Head>
    <div className="flex justify-center items-center h-screen bg-base-100">
        <form className="bg-base-200 p-8 rounded shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center text-primary">Login</h1>
          {error && <div className="text-error text-sm mb-4 text-center">{error}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
            required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
            required />
          <button
            type="submit"
            className={`btn btn-primary w-full mb-4 ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center">
            <p className="text-sm text-base-content">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div></>
  );
};

export default LoginPage;
