import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Error = ({ errorCode, message }) => {
  const navigate = useNavigate();

  // Handler to navigate back to the homepage
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='overflow-hidden'>
    <div className='lg:scale-150 my-40 container items-center justify-center'>
    <div className="text-center w-full p-4">
      <div className="mb-8">
        <div className="flex justify-center space-x-4">
          <div className="h-16 w-6 bg-orange-300 rounded-sm"></div>
          <div className="h-20 w-6 bg-gray-300 rounded-sm"></div>
          <div className="h-14 w-6 bg-blue-900 rounded-sm"></div>
          <div className="h-18 w-6 bg-gray-400 rounded-sm"></div>
          <div className="h-16 w-6 bg-orange-400 rounded-sm"></div>
        </div>
      </div>

      <h1 className="text-9xl font-bold text-blue-950">{errorCode || '404'}</h1>
      <p className="text-xl font-semibold text-gray-800 mt-4">
        {message || "Looks like you’ve got lost..."}
      </p>
      <p className="text-md text-gray-600 mt-2">
        {errorCode === '404'
          ? 'The page you’re looking for doesn’t exist or has been moved.'
          : errorCode === '500'
          ? 'Something went wrong on our end. Please try again later.'
          : 'An unexpected error occurred.'}
      </p>

      <button
        onClick={handleGoHome}
        className="mt-6 inline-block px-6 py-2 bg-gray-300 text-black font-semibold rounded-md shadow-lg hover:bg-gray-700 hover:text-gray-100"
      >
        Go Home
      </button>
    </div>
    </div>
    </div>
  );
};

// Prop validation using PropTypes
Error.propTypes = {
  errorCode: PropTypes.string,
  message: PropTypes.string,
};

export default Error;
