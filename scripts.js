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
            const list = document.createElement('ul');
            const listItem = document.createElement('li');
            listItem.textContent = `${tokenType}`;
            list.appendChild(listItem);
            for (const [name, tokenObj2] of Object.entries(tokenObj)) {
                const list = document.createElement('ul');
                const listItem1 = document.createElement('li');
                listItem1.textContent = `${name}`;
                list.appendChild(listItem1);
                if (typeof(tokenObj2) != 'string') {
                    for (const [key, value] of Object.entries(tokenObj2)) {
                        const list = document.createElement('ul');
                        const listItem2 = document.createElement('li');
                        listItem2.textContent = `${key}: ${value}`;
                        list.appendChild(listItem2);
                    }
                }
                else{
                    const list = document.createElement('ul');
                    const listItem2 = document.createElement('li');
                    listItem2.textContent = `$tokenObj2`;
                    list.appendChild(listItem2);
                }
            }
            list.appendChild(list);
            walletDataElement.appendChild(list);
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
