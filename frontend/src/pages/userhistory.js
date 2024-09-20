import Layout from '@/components/Layout';
import config from '@/config/config';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/user/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError('Failed to load user history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (routeId) => {
    try {
      const response = await fetch(`${config.baseURL}/api/user/history/${routeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete history');
      }

      // Remove the deleted entry from the state
      setHistory(prevHistory => prevHistory.filter(entry => entry._id !== routeId));
    } catch (error) {
      console.error('Error deleting history:', error);
      setError('Failed to delete history. Please try again later.');
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all history?')) {
      try {
        const response = await fetch(`${config.baseURL}/api/user/history`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete all history');
        }

        // Clear the history state
        setHistory([]);
      } catch (error) {
        console.error('Error deleting all history:', error);
        setError('Failed to delete all history. Please try again later.');
      }
    }
  };

  if (loading) {
    return <p className="text-center text-lg text-base-content">Loading history...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <Layout>
      <Head>
        <title>User History</title>
      </Head>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-6 text-primary">User History</h1>
          
          {/* Delete All Button */}
          <div className="mb-4">
            <button 
              className={`px-4 py-2 bg-red-500 text-white rounded  ${history.length === 0 ? 'opacity-40' : 'hover:bg-red-600'}`}
              onClick={handleDeleteAll}
              disabled={history.length === 0}
            >
              Clear History
            </button>
          </div>
        </div>
        
        {history.length > 0 ? (
          <ul className="space-y-4">
            {history.map((entry) => (
              <li key={entry._id} className="p-4 bg-base-200 rounded shadow flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <Link href={entry.route} className="text-blue-500 hover:underline">{entry.route}</Link>{' '}
                  <span className="text-base-content">- Visited at: {new Date(entry.visitedAt).toLocaleString()}</span>
                </div>
                <button 
                  className="mt-2 sm:mt-auto sm:ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-base-content">No history found.</p>
        )}
      </div>
    </Layout>
  );
};

export default UserHistory;