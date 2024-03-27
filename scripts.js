// Function to connect the Stacks wallet
async function connectWallet() {
    try {
        const addresses = await window.LeatherProvider?.request('getAddresses');

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

// Function to retrieve wallet data
async function getWalletData(userData) {
    try {
        const response = await fetch('https://api.mainnet.hiro.so/extended/v1/address/' + userData.result.addresses[2].address +'/balances')
        const balance = response.json()
        return balance;
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
        for (const [tokenType, tokenObj] of Object.entries(data)) {
            const tokenTypeList = document.createElement('ul');
            const tokenTypeItem = document.createElement('li');
            tokenTypeItem.textContent = `${tokenType}`;
            tokenTypeList.appendChild(tokenTypeItem);
            
            if (typeof tokenObj === 'object') {
                for (const [name, tokenObj2] of Object.entries(tokenObj)) {
                    const nameList = document.createElement('ul');
                    const nameItem = document.createElement('li');
                    nameItem.textContent = `${name}`;
                    nameList.appendChild(nameItem);

                    if (typeof tokenObj2 === 'object') {
                        for (const [key, value] of Object.entries(tokenObj2)) {
                            const propertyList = document.createElement('ul');
                            const propertyItem = document.createElement('li');
                            propertyItem.textContent = `${key}: ${value}`;
                            propertyList.appendChild(propertyItem);
                            nameList.appendChild(propertyList);
                        }
                    } else {
                        const propertyList = document.createElement('ul');
                        const propertyItem = document.createElement('li');
                        propertyItem.textContent = `${tokenObj2}`;
                        propertyList.appendChild(propertyItem);
                        nameList.appendChild(propertyList);
                    }
                    tokenTypeList.appendChild(nameList);
                }
            } else {
                const tokenTypeList = document.createElement('ul');
                const tokenTypeItem = document.createElement('li');
                tokenTypeItem.textContent = `${tokenObj}`;
                tokenTypeList.appendChild(tokenTypeItem);
            }
            walletDataElement.appendChild(tokenTypeList);
        }
    } else {
        walletDataElement.textContent = 'Failed to retrieve wallet data.';
    }
}


// Event listener for connecting the wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    const userData = await connectWallet();
    if (userData) {
        const walletData = await getWalletData(userData);
        displayWalletData(walletData);
    }
});
