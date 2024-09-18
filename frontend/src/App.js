import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './componets/Header';
import Footer from './componets/Footer';
import { setUserDetails } from './store/userSlice';
import SummaryApi from './common/index';
import Context from './context/index';
import './App.css';
// Replace with your Google OAuth Client ID

function App() {
    const dispatch = useDispatch();
    const [cartProductCount, setCartProductCount] = useState(0);

    // Fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) {
                dispatch(setUserDetails(result.data));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Fetch cart count
    const fetchUserAddToCart = async () => {
        try {
            const response = await fetch(SummaryApi.Count_Add_TO_CART.url, {
                method: SummaryApi.Count_Add_TO_CART.method,
                credentials: 'include',
            });
            const result = await response.json();
            console.log("Cart count response:", result); // Debug log
            if (result.success) {
                setCartProductCount(result.data?.count || 0);
            } else {
                console.error("Error fetching cart count:", result.message);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };
    

    useEffect(() => {
        fetchUserDetails();
        fetchUserAddToCart();
        const interval = setInterval(fetchUserAddToCart, 5000);  // Poll cart count every 5 seconds
        return () => clearInterval(interval);  // Cleanup on component unmount
    }, []);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Context.Provider value={{ fetchUserDetails, fetchUserAddToCart, cartProductCount }}>
                <ToastContainer />
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
