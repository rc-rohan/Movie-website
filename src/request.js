const API_KEY = "26b98914bdfa3dc71c2d2c964644b132";



const requests = {
    base_url: `https://api.themoviedb.org/3/`,
    img_url: `https://image.tmdb.org/t/p/w500`,
    fetchTrending:`trending/movie/day?api_key=${API_KEY}`,
    fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_networks=213`,
    fetchActionMovies: `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28`,
    fetchComedyMovies: `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35`,
    fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35`,
    fetchRomanceMovies: `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749`,
    fetchDocumentaries: `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35`,
};

// https://api.themoviedb.org/3/discover/movie?api_key=26b98914bdfa3dc71c2d2c964644b132&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35

export default requests;
// discover/tv?api_key=26b98914bdfa3dc71c2d2c964644b132&language=en-US&sort_by=popularity.desc&page=1&with_networks=213