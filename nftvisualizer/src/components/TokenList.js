// src/components/TokenList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const TokenList = ({ address }) => {
  const [tokens, setTokens] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (!address) return;

    // Fetch token balances from the Stacks blockchain
    const fetchTokens = async () => {
      const response = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/tokens`);
      setTokens(response.data.tokens);
    };

    // Fetch historical price data (using Coingecko API as an example)
    const fetchHistoricalData = async () => {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/stacks/market_chart?vs_currency=usd&days=30`);
      setHistoricalData(response.data.prices);
    };

    fetchTokens();
    fetchHistoricalData();
  }, [address]);

  return (
    <div>
      <h3>Token Balances</h3>
      <ul>
        {tokens.map(token => (
          <li key={token.id}>{token.asset_identifier}: {token.balance}</li>
        ))}
      </ul>
    </div>
  );
};
