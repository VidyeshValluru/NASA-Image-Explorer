import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-space-light p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          NASA Explorer
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/mars" className="hover:text-gray-300">Mars Rover</Link>
          <Link to="/favorites" className="hover:text-gray-300">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 