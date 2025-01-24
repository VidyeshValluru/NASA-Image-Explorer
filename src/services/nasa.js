import axios from 'axios';

// You can get your API key from https://api.nasa.gov/
const NASA_API_KEY = 'DEMO_KEY';

// Create axios instance with retry logic
const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov',
});

// Add response interceptor for rate limiting
nasaApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 429) {
      // Return cached data if available
      if (error.config.url.includes('apod')) {
        return {
          data: {
            title: "NASA API Rate Limit Reached",
            url: "https://apod.nasa.gov/apod/image/2401/OrionNebulaStars_Webb_960.jpg",
            explanation: "The NASA API rate limit has been reached. This is a fallback image from the James Webb Space Telescope.",
            date: new Date().toISOString().split('T')[0]
          }
        };
      }
      if (error.config.url.includes('mars-photos')) {
        return { data: { photos: [] } };
      }
    }
    return Promise.reject(error);
  }
);

export const getAPOD = async () => {
  const response = await nasaApi.get(`/planetary/apod?api_key=${NASA_API_KEY}`);
  return response.data;
};

export const ROVERS = ['Curiosity', 'Perseverance', 'Opportunity', 'Spirit'];
export const CAMERAS = [
  { id: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
  { id: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
  { id: 'MAST', name: 'Mast Camera' },
  { id: 'NAVCAM', name: 'Navigation Camera' },
];

// Different rovers have photos from different sols
const ROVER_DEFAULTS = {
  curiosity: { sol: 1000 },
  perseverance: { sol: 100 },
  opportunity: { sol: 5000 },
  spirit: { sol: 2000 }
};

export const getMarsRoverPhotos = async (params) => {
  const { rover = 'curiosity', page = 1, camera = '' } = params;
  const response = await nasaApi.get(
    `/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}${camera ? `&camera=${camera}` : ''}&api_key=${NASA_API_KEY}`
  );
  return response.data.photos;
};