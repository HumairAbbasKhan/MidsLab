import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://dev.iqrakitab.net/api/books');
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();

    // Clean up function
    return () => {};
  }, []);

  return { books, loading };
};

export default useFetchBooks;
