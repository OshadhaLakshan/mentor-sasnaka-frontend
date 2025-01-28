import useAuth from '../context/useAuth';
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';


const PrivateRoute = ({children}) => {
  const {currentUser} = useAuth();
  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace/>

}

// Define prop types
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children prop is passed and is valid React node
};

export default PrivateRoute