import React from 'react';
import { GoogleLogout } from '@react-oauth/google';

const clientId = "370244080635-97men01476v1o2k3a9keg3g8mntaccrg.apps.googleusercontent.com";

function Logout() {
    const onLogoutSuccess = () => {
        console.log("Logout successful!");
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
                onLogoutSuccess={onLogoutSuccess}
            />
        </div>
    );
}

export default Logout;
