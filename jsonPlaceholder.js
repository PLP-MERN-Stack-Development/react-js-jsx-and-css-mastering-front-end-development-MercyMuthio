export const jsonPlaceholderAPI = {
  async getUsers(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
      );
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  },

  async searchUsers(query) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${query}`
      );
      if (!response.ok) throw new Error('Failed to search users');
      return await response.json();
    } catch (error) {
      throw new Error(`Search Error: ${error.message}`);
    }
  }
};
