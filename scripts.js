// Function to connect the Stacks wallet
async function connectWallet() {
    try {
        const response = await window.LeatherProvider?.request('getAddresses');
        if (response && response.result) {
            return response.result.addresses;
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
        const response = await fetch('https://api.mainnet.hiro.so/extended/v1/address/' + userData[2].address + '/balances');
        const balance = await response.json();
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
        displayListItems(data, walletDataElement);
    } else {
        walletDataElement.textContent = 'Failed to retrieve wallet data.';
    }
}

// Recursive function to display list items
function displayListItems(data, parent) {
    for (const [tokenType, tokenObj] of Object.entries(data)) {
        const listItem = document.createElement('li');
        listItem.textContent = tokenType;
        if (typeof tokenObj === 'object') {
            listItem.classList.add('clickable'); // Add clickable class for items with nested items
            listItem.classList.add('caret'); // Add caret class for items with nested items
            const sublist = document.createElement('ul');
            sublist.classList.add('nested'); // Add nested class
            displayListItems(tokenObj, sublist);
            listItem.appendChild(sublist);
        } else {
            const propertyItem = document.createElement('li');
            propertyItem.textContent = `${tokenType}: ${tokenObj}`;
            parent.appendChild(propertyItem);
        }
        parent.appendChild(listItem);
    }
}

// Event listener for expanding and collapsing list items
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('clickable')) {
        event.target.classList.toggle('active'); // Toggle active class for styling
        const sublist = event.target.querySelector('.nested');
        if (sublist) {
            sublist.classList.toggle('hidden'); // Toggle hidden class to show/hide sublist
        }
    }
});

// Event listener for connecting the wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    const userData = await connectWallet();
    if (userData) {
        const walletData = await getWalletData(userData);
        displayWalletData(walletData);
    }
});
