import React, { useState, useEffect } from 'react';

function WalletApp() {
    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to connect to the wallet
    const connectWallet = async () => {
        if (!window.LeatherProvider) {
            setError('LeatherProvider is not available.');
            setLoading(false);
            return null;
        }

        try {
            const addresses = await window.LeatherProvider.request('getAddresses');
            if (!addresses) throw new Error('No addresses found.');
            return addresses;
        } catch (err) {
            setError(`Error connecting wallet: ${err.message}`);
            setLoading(false);
            return null;
        }
    };

    // Function to fetch wallet data
    const fetchWalletData = async (userData) => {
        try {
            // Simulated wallet data fetching logic
            return {
                BTC: { balance: 0.05, USD: 1500 },
                ETH: { balance: 1.2, USD: 3000 },
                STX: { balance: 150, USD: 180 }
            };
        } catch (err) {
            setError(`Error fetching wallet data: ${err.message}`);
            return null;
        }
    };

    // Fetch wallet data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userData = await connectWallet();
            if (userData) {
                const data = await fetchWalletData(userData);
                setWalletData(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Recursive rendering of wallet data
    const renderWalletData = (data) => {
        if (!data) return <p>No data available.</p>;

        return (
            <ul>
                {Object.entries(data).map(([tokenType, tokenObj]) => (
                    <li key={tokenType}>
                        <strong>{tokenType}</strong>
                        <ul>
                            {Object.entries(tokenObj).map(([key, value]) => (
                                <li key={key}>{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h1>Wallet Data</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {walletData && renderWalletData(walletData)}
        </div>
    );
}

export default WalletApp;
