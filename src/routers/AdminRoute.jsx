import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to='/admin'/>
    }
  return children ? children : 
  <Outlet/>
}

export default AdminRoute

// Add prop validation
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children prop is passed and is valid React node
}