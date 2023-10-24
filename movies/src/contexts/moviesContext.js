import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {

    //add here
    const [mustWatch,setMustWatch] = useState( [] )
    const addToMustWatch = (movie) => {
        let newMustWatch = [];
        if (!mustWatch.includes(movie.id)){
            newMustWatch = [...mustWatch, movie.id];
        }
        else{
            newMustWatch = [...mustWatch];
        }
        setMustWatch(newMustWatch)
    };


    const removeFromMustWatch = (movie) => {
        setMustWatch( mustWatch.filter(
            (mId) => mId !== movie.id
        ) )
    };
    //-=-=-=-=-=-

    const [favorites, setFavorites] = useState( [] )
    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)){
            newFavorites = [...favorites, movie.id];
        }
        else{
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };

    //下面一起一起的 使用{}的原因是 本身是 有多重数据类型
    const [myReviews, setMyReviews] = useState( {} )
    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    console.log(myReviews);


    return (
        <MoviesContext.Provider
            value={{
                favorites,
                mustWatch,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToMustWatch,
                removeFromMustWatch,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;