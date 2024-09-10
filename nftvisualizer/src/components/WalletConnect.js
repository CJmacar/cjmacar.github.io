// src/components/WalletConnect.js
import React, { useState } from 'react';
import { UserSession, AppConfig } from '@stacks/auth';
import { showConnect, authenticate } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const WalletConnect = ({ setAddress }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    authenticate({
      userSession,
      onFinish: (data) => {
        const address = data.profile.stxAddress.mainnet;
        setAddress(address);
        setIsLoggedIn(true);
      },
      network: new StacksMainnet(),
    });
  };

  const onLogout = () => {
    userSession.signUserOut();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLogin}>Connect to Xverse</button>
      )}
    </div>
  );
};
