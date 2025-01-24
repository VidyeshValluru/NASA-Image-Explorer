import { useFavorites } from '../../context/FavoritesContext';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

function RoverImage({ photo }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(photo.id);

  const handleFavoriteClick = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(photo.id);
    } else {
      addFavorite({
        id: photo.id,
        type: 'rover',
        imageUrl: photo.img_src,
        rover: photo.rover.name,
        camera: photo.camera.full_name,
        sol: photo.sol,
        earthDate: photo.earth_date
      });
    }
  };

  return (
    <div className="bg-space-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative aspect-square">
        <img
          src={photo.img_src}
          alt={`Mars Rover ${photo.rover.name} - ${photo.camera.full_name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
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
      <div className="p-4">
        <p className="font-semibold">{photo.camera.full_name}</p>
        <p className="text-sm text-gray-400">
          {photo.rover.name} - Sol {photo.sol}
        </p>
        <p className="text-sm text-gray-400">{photo.earth_date}</p>
      </div>
    </div>
  );
}

export default RoverImage; 