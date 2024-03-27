// Function to connect the Stacks wallet
async function connectWallet() {
    const addresses = await window.LeatherProvider?.request('getAddresses');
try{
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
async function getWalletData() {
    try {
        // Your code to retrieve wallet data using Leather
        // Example: const data = await getWalletDataFromAPI();
        return data;
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
        displayListItems(data, list);
        walletDataElement.appendChild(list);
    } else {
        walletDataElement.textContent = 'Failed to retrieve wallet data.';
    }
}

// Recursive function to display list items
function displayListItems(data, parent) {
    for (const [tokenType, tokenObj] of Object.entries(data)) {
        const listItem = document.createElement('li');
        const label = document.createElement('span');
        label.textContent = tokenType;
        label.classList.add('clickable'); // Add clickable class to make it expandable
        listItem.appendChild(label);

        const sublist = document.createElement('ul');
        sublist.classList.add('hidden'); // Initially hide the sublist
        if (typeof tokenObj === 'object') {
            displayListItems(tokenObj, sublist);
        } else {
            const propertyItem = document.createElement('li');
            propertyItem.textContent = `${tokenType}: ${tokenObj}`;
            sublist.appendChild(propertyItem);
        }
        listItem.appendChild(sublist);
        parent.appendChild(listItem);
    }
}

// Event listener for expanding and collapsing list items
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('clickable')) {
        const sublist = target.nextElementSibling;
        sublist.classList.toggle('hidden'); // Toggle the visibility of the sublist
    }
});

// Event listener for connecting the wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    const userData = await connectWallet();
    if (userData) {
        const walletData = await getWalletData();
        displayWalletData(walletData);
    }
});
