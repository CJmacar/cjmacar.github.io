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

// Function to retrieve token value from alexlab.co API
async function getTokenValue(tokenName) {
    try {
        const response = await fetch(`https://alexlab.co/api/v1/token/${tokenName}/price`);
        const data = await response.json();
        return data.price; // Assuming the API returns the token price
    } catch (error) {
        console.error('Error retrieving token value:', error);
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

// Function to retrieve token value from stackswap.org API
async function getTokenValueFromStackswap(tokenName) {
    try {
        const response = await fetch(`https://api.stackswap.org/prices/stacks/${tokenName}`);
        const data = await response.json();
        return data.price; // Assuming the API returns the token price
    } catch (error) {
        console.error('Error retrieving token value from Stackswap:', error);
        return null;
    }
}

// Function to display wallet data on the webpage
async function displayWalletData(data) {
    const walletDataElement = document.getElementById('walletData');
    walletDataElement.innerHTML = ''; // Clear previous data
    
    if (data) {
        for (const [tokenType, tokenObj] of Object.entries(data)) {
            const tokenTypeList = document.createElement('ul');
            tokenTypeList.classList.add('token-type'); // Add token-type class
            tokenTypeList.classList.add('clickable'); 
            tokenTypeList.classList.add('nested'); 
            
            const tokenTypeItem = document.createElement('li');
            tokenTypeItem.textContent = `${tokenType}`;
            tokenTypeItem.classList.add('token-type-item'); // Add token-type-item class
            tokenTypeList.appendChild(tokenTypeItem);
            
            if (typeof tokenObj === 'object') {
                for (const [name, tokenObj2] of Object.entries(tokenObj)) {
                    const nameList = document.createElement('ul');
                    nameList.classList.add('name-list'); // Add name-list class
                    nameList.classList.add('clickable'); 
                    nameList.classList.add('nested'); 
                    
                    const nameItem = document.createElement('li');
                    nameItem.textContent = `${name}`;
                    nameItem.classList.add('name-item'); // Add name-item class
                    nameList.appendChild(nameItem);

                    if (typeof tokenObj2 === 'object') {
                        for (const [key, value] of Object.entries(tokenObj2)) {
                            const propertyList = document.createElement('ul');
                            propertyList.classList.add('property-list'); // Add property-list class
                            propertyList.classList.add('nested'); 
                            
                            const propertyItem = document.createElement('li');
                            propertyItem.textContent = `${key}: ${value}`;
                            propertyItem.classList.add('property-item'); // Add property-item class
                            propertyList.appendChild(propertyItem);
                            nameList.appendChild(propertyList);
                        }
                    } else {
                        const propertyList = document.createElement('ul');
                        propertyList.classList.add('property-list'); // Add property-list class
                        propertyList.classList.add('clickable'); 
                        propertyList.classList.add('nested'); 
                        
                        const propertyItem = document.createElement('li');
                        propertyItem.textContent = `${tokenObj2}`;
                        propertyItem.classList.add('property-item'); // Add property-item class
                        propertyList.appendChild(propertyItem);
                        nameList.appendChild(propertyList);

                        // Fetch token value and display
                        const tokenValue = await getTokenValue(name);
                        if (tokenValue !== null) {
                            const valueItem = document.createElement('li');
                            valueItem.textContent = `Value: ${tokenValue}`;
                            valueItem.classList.add('property-item'); // Add property-item class
                            propertyList.appendChild(valueItem);
                        }

                        // Fetch token value from Stackswap API and display
                        const tokenValueFromStackswap = await getTokenValueFromStackswap(name);
                        if (tokenValueFromStackswap !== null) {
                            const valueItemFromStackswap = document.createElement('li');
                            valueItemFromStackswap.textContent = `Value (Stackswap): ${tokenValueFromStackswap}`;
                            valueItemFromStackswap.classList.add('property-item'); // Add property-item class
                            propertyList.appendChild(valueItemFromStackswap);
                        }
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


