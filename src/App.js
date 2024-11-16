 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=d92cb96762f8ccb3d5dad6b39ded83f4'
      );
      setPopularMovies(response.data.results);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

   
  const filteredMovies = popularMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const openModal = movie => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

   
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="mt-3">
        <form
          className="max-w-md mx-auto"
          onSubmit={e => e.preventDefault()}  
        >
          <div className="relative">
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search Movies by title"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              required
            />
          </div>
        </form>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            className="max-w-sm bg-white ml-8 mr-3 mt-3 border border-gray-200 rounded-lg shadow"
          >
            <img
              className="w-full h-64 object-cover rounded-t-lg"
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className="p-5">
              <h5
                className="mb-2 text-xl font-bold tracking-tight text-gray-900 cursor-pointer"
                onClick={() => openModal(movie)}  
              >
                {movie.title}
              </h5>
              <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
              <p className="mt-2 mb-3 text-sm text-gray-700">
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

       
      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-2xl p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Release Date: {selectedMovie.release_date}</p>
            <p className="text-sm text-gray-700 mb-4">Genre IDs: {selectedMovie.genre_ids.join(', ')}</p>
            <p className="text-base mb-4">{selectedMovie.overview}</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
