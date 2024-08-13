import Head from 'next/head';
import config from '@/config/config';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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
      const res = await fetch(`${config.baseURL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.replace('/');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      setError('Network error, please try again later.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <><Head>
      <title>Register</title>
    </Head>
    <div className="flex justify-center items-center h-screen bg-base-100">
        <form className="bg-base-200 p-8 rounded shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center text-primary">Register</h1>
          {error && <div className="text-error text-sm mb-4 text-center">{error}</div>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
            required />
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
            required
            minLength={6} />
          <button
            type="submit"
            className={`btn btn-primary w-full mb-4 ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <div className="text-center">
            <p className="text-sm text-base-content">
              Already have an account?{' '}
              <Link href="/" className="text-primary font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div></>
  );
};

export default RegisterPage;
