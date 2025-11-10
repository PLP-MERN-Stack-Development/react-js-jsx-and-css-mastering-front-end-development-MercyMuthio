import React, { useState, useEffect } from 'react';
import { jsonPlaceholderAPI } from '../api/jsonPlaceholder';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUsers = async (pageNum = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (search) {
        data = await jsonPlaceholderAPI.searchUsers(search);
      } else {
        data = await jsonPlaceholderAPI.getUsers(pageNum);
      }
      setUsers(search || pageNum === 1 ? data : [...users, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers(1, searchQuery);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadUsers(nextPage, searchQuery);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Users from API
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name, email, or username..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Button type="submit" disabled={loading}>
              Search
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchQuery('');
                setPage(1);
                loadUsers(1);
              }}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && users.length === 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
          </div>
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  @{user.username}
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
                  {user.email}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.company.name}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {!loading && users.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No users found. {searchQuery && 'Try a different search term.'}
          </div>
        )}

        {/* Load More Button */}
        {!searchQuery && users.length > 0 && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="secondary"
            >
              {loading ? 'Loading...' : 'Load More Users'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Users;
