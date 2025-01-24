import { useState, useEffect } from 'react';
import { getAPOD } from '../services/nasa';
import APODCard from '../components/APOD/APODCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

function Home() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAPOD = async () => {
      if (!mounted) return;
      
      try {
        setLoading(true);
        const data = await getAPOD();
        if (mounted) {
          setApodData(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error('APOD fetch error:', err);
          setError('Failed to fetch Astronomy Picture of the Day');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAPOD();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!apodData) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Astronomy Picture of the Day
      </h1>
      <APODCard data={apodData} />
    </div>
  );
}

export default Home; 