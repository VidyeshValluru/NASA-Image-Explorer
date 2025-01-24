import { useFavorites } from '../context/FavoritesContext';
import APODCard from '../components/APOD/APODCard';
import RoverImage from '../components/Mars/RoverImage';

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-400">
          You haven't added any favorites yet. Explore the APOD and Mars Rover sections to add some!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Your Favorites</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(item => (
          <div key={item.id}>
            {item.type === 'apod' ? (
              <APODCard data={item} />
            ) : (
              <RoverImage photo={{
                id: item.id,
                img_src: item.imageUrl,
                rover: { name: item.rover },
                camera: { full_name: item.camera },
                sol: item.sol,
                earth_date: item.earthDate
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites; 