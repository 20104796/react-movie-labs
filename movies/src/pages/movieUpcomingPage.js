import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies} from "../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import PlaylistIcon from '@mui/icons-material/PlaylistAdd';

const UpcomingMoviePage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discoverNew', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    const addToWatchlist = (movie) => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (!watchlist.some((item) => item.id === movie.id)) {
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert(`Film "${movie.title}" has been added to the playlist`);
        } else {
            alert(`Film "${movie.title}" is already in the playlist。`);
        }
    };

    return (
        <PageTemplate
            title='Upcoming Movies'
            movies={movies}
            action={(movie) => {
                return <PlaylistIcon onClick={() => addToWatchlist(movie)} />
            }}
        />
    );
};
export default UpcomingMoviePage;