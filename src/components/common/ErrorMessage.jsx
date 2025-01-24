function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 text-red-500">
      {message || 'An error occurred. Please try again later.'}
    </div>
  );
}

export default ErrorMessage; 