import { 
  Outlet, 
  // useLocation 
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // const location = useLocation(); // Get the current location
  // const isAdminRoute = location.pathname.startsWith('/dashboard'); // Check if the current route is for admin

  return (
          // Home/User Layout
          <>
            <Header />
            <main className="no-scrollbar min-h-screen max-w-screen-2xl mx-auto font-primary">
              <Outlet />
            </main>
            <Footer />
          </>
  );
}
export default App;
