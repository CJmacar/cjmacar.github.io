import React, { useState } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { TokenList } from './components/TokenList';
import { TokenChart } from './components/TokenChart';

function App() {
  const [address, setAddress] = useState('');
  const [historicalData, setHistoricalData] = useState([]);

  return (
    <div className="App">
      <h1>STX Wallet Dashboard</h1>
      <WalletConnect setAddress={setAddress} />
      {address && (
        <>
          <TokenList address={address} />
          <TokenChart historicalData={historicalData} />
        </>
      )}
    </div>
  );
}

export default App;