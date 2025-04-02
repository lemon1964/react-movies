import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Search } from '../components/Search';
import { Preloader } from '../components/Preloader';
import { CategoryList } from '../components/CategoryList';

const API_KEY = process.env.REACT_APP_API_KEY;

function Home() {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { pathname, search } = useLocation();
    const { push } = useHistory();

    const searchMovies = (str, type = 'all') => {
        if (!str) return;

        setLoading(true);
        setError(null);

        fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.Response === "True") {
                    setMovies(data.Search);
                } else {
                    setError(data.Error || "No results");
                    setMovies([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch movies");
                setLoading(false);
            });

            push({
                pathname,
                search: `?search=${str}&type=${type}`,
              });
              
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const searchQuery = searchParams.get('search') || '';
        const searchType = searchParams.get('type') || 'all';
      
        if (searchQuery) {
          searchMovies(searchQuery, searchType); // ✅ передаём type
        } else {
          fetch('/categories.json')
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch');
              }
              return res.json();
            })
            .then((data) => {
              setCategories(data);
              setMovies([]);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setError('Failed to load categories');
              setLoading(false);
            });
        }      
        // eslint-disable-next-line
    }, [search]);

    return (
        <>
            <Search searchMovies={searchMovies} />
            {loading ? (
                <Preloader />
            ) : error ? (
                <div className="red-text">{error}</div>
            ) : movies.length > 0 ? (
                <CategoryList movies={movies} />
            ) : (
                <CategoryList catalog={categories} />
            )}
        </>
    );
}

export { Home };
