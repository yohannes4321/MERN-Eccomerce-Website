import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './componets/Header';
import Footer from './componets/Footer';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import SummaryApi from './common/index';
import Context from './context/index';
import './App.css';
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider

const clientId = "370244080635-97men01476v1o2k3a9keg3g8mntaccrg.apps.googleusercontent.com";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });
      const datavalue = await response.json();
      if (datavalue.success) {
        dispatch(setUserDetails(datavalue.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.Count_Add_TO_CART.url, {
        method: SummaryApi.Count_Add_TO_CART.method,
        credentials: 'include',
      });
      const datavalue = await response.json();
      setCartProductCount(datavalue?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }
    gapi.load('client:auth2', start);
    fetchUserDetails();
    fetchUserAddToCart();

    // Polling every 5 seconds
    const interval = setInterval(fetchUserAddToCart, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}> {/* Wrap your app with GoogleOAuthProvider */}
      <Context.Provider value={{ fetchUserDetails, fetchUserAddToCart, cartProductCount }}>
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-200px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
