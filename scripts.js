// Initialize Leather
const { connectStacksWallet, stacksWebApi } = require('@blockstack/stacks-web-api');

// Function to connect the Stacks wallet
async function connectWallet() {
    try {
        const userData = await connectStacksWallet();
        return userData;
    } catch (error) {
        console.error('Error connecting wallet:', error);
        return null;
    }
}

// Function to retrieve wallet data
async function getWalletData() {
    try {
        const balances = await stacksWebApi.getAccountBalance();
        return balances;
    } catch (error) {
        console.error('Error retrieving wallet data:', error);
        return null;
    }
}

// Function to display wallet data on the webpage
function displayWalletData(data) {
    const walletDataElement = document.getElementById('walletData');
    walletDataElement.innerHTML = ''; // Clear previous data
    
    if (data) {
        const list = document.createElement('ul');
        for (const coin of data) {
            const listItem = document.createElement('li');
            listItem.textContent = `${coin.coin}: ${coin.amount}`;
            list.appendChild(listItem);
        }
        walletDataElement.appendChild(list);
    } else {
        walletDataElement.textContent = 'Failed to retrieve wallet data.';
    }
}

// Event listener for connecting the wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    const userData = await connectWallet();
    if (userData) {
        const walletData = await getWalletData();
        displayWalletData(walletData);
    }
});
