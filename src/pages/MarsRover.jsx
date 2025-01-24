import { useState, useEffect, useRef, useCallback } from 'react';
import { getMarsRoverPhotos, ROVERS, CAMERAS } from '../services/nasa';
import RoverImage from '../components/Mars/RoverImage';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

function MarsRover() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedCamera, setSelectedCamera] = useState('');

  const observer = useRef();
  const lastPhotoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  }, [selectedRover, selectedCamera]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const newPhotos = await getMarsRoverPhotos({
          rover: selectedRover,
          page,
          camera: selectedCamera
        });
        setPhotos(prev => page === 1 ? newPhotos : [...prev, ...newPhotos]);
        setHasMore(newPhotos.length > 0);
      } catch (err) {
        setError('Failed to fetch Mars Rover photos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page, selectedRover, selectedCamera]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Mars Rover Gallery</h1>
      
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          value={selectedRover}
          onChange={(e) => setSelectedRover(e.target.value.toLowerCase())}
          className="bg-space-light px-4 py-2 rounded-lg"
        >
          {ROVERS.map(rover => (
            <option key={rover} value={rover.toLowerCase()}>{rover}</option>
          ))}
        </select>

        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="bg-space-light px-4 py-2 rounded-lg"
        >
          <option value="">All Cameras</option>
          {CAMERAS.map(camera => (
            <option key={camera.id} value={camera.id}>{camera.name}</option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <div ref={lastPhotoElementRef} key={photo.id}>
                <RoverImage photo={photo} />
              </div>
            );
          }
          return <RoverImage key={photo.id} photo={photo} />;
        })}
      </div>

      {loading && <Loading />}
      {!hasMore && photos.length > 0 && (
        <p className="text-center text-gray-400 mt-8">No more photos to load</p>
      )}
    </div>
  );
}

export default MarsRover; 