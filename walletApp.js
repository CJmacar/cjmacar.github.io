import React, { useState, useEffect } from 'react';

function WalletApp() {
    const [walletData, setWalletData] = useState(null);

    // Function to connect the wallet
    async function connectWallet() {
        try {
            // Ensure that LeatherProvider is available
            if (!window.LeatherProvider) {
                throw new Error('LeatherProvider is not available.');
            }

            // Request addresses from the wallet
            const addresses = await window.LeatherProvider.request('getAddresses');
            
            if (addresses) {
                return addresses;
            } else {
                console.error('No addresses found.');
                return null;
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            return null;
        }
    }

    // Function to fetch wallet data
    async function fetchWalletData(userData) {
        try {
            // Implement wallet data fetching logic here
            // For demonstration, returning dummy data
            return {
                BTC: {
                    balance: 0.05,
                    USD: 1500
                },
                ETH: {
                    balance: 1.2,
                    USD: 3000
                },
                STX: {
                    balance: 150,
                    USD: 180
                }
            };
        } catch (error) {
            console.error('Error fetching wallet data:', error);
            return null;
        }
    }

    // Fetch wallet data when component mounts
    useEffect(() => {
        async function fetchData() {
            const userData = await connectWallet();
            if (userData) {
                const data = await fetchWalletData(userData);
                setWalletData(data);
            }
        }
        fetchData();
    }, []);

    // Recursive function to render wallet data
    function renderWalletData(data) {
        if (!data) {
            return <p>Failed to retrieve wallet data.</p>;
        }

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
    }

    return (
        <div>
            <h1>Wallet Data</h1>
            {walletData ? renderWalletData(walletData) : <p>Loading...</p>}
        </div>
    );
}

export default WalletApp;
