import { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

function APODCard({ data }) {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.url);

  const handleFavoriteClick = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(data.url);
    } else {
      addFavorite({
        id: data.url,
        type: 'apod',
        title: data.title,
        imageUrl: data.url,
        date: data.date,
        explanation: data.explanation
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-space-light rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        {imageError ? (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400 text-center p-4">
              Image currently unavailable
            </p>
          </div>
        ) : (
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-auto"
            onError={handleImageError}
          />
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
        >
          {isCurrentlyFavorite ? (
            <HeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartOutline className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{data.date}</p>
        <p className="text-gray-300">{data.explanation}</p>
      </div>
    </div>
  );
}

export default APODCard; 