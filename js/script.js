// Global user state
let currentUser = null;
let userInventory = [];

// Define common battle items array at global scope to be accessible to all functions
let battleItems = [
    { name: 'AWP | Dragon Lore (Factory New)', price: '$1,850.42', rarity: 'legendary', image: 'images/weapon1.svg' },
    { name: 'Karambit | Fade (Factory New)', price: '$1,245.89', rarity: 'legendary', image: 'images/weapon2.svg' },
    { name: 'M4A4 | Howl (Minimal Wear)', price: '$985.65', rarity: 'legendary', image: 'images/weapon3.svg' },
    { name: 'AK-47 | Fire Serpent (Field-Tested)', price: '$745.20', rarity: 'rare', image: 'images/weapon4.svg' },
    { name: 'USP-S | Kill Confirmed (Minimal Wear)', price: '$152.67', rarity: 'mythical', image: 'images/weapon1.svg' },
    { name: 'Glock-18 | Fade (Factory New)', price: '$786.32', rarity: 'mythical', image: 'images/weapon2.svg' },
    { name: 'Desert Eagle | Blaze (Factory New)', price: '$430.18', rarity: 'mythical', image: 'images/weapon3.svg' }
];

// Load user data from localStorage if available
function loadUserData() {
    // Try to load user data
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Try to load inventory data
    const savedInventory = localStorage.getItem('userInventory');
    if (savedInventory) {
        userInventory = JSON.parse(savedInventory);
    }
}

// Initialize by loading user data
loadUserData();

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Show login modal
function showLoginModal() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'login-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    
    // Create tabs
    const tabs = document.createElement('div');
    tabs.className = 'login-tabs';
    
    const loginTab = document.createElement('div');
    loginTab.className = 'login-tab active';
    loginTab.textContent = 'Login';
    loginTab.dataset.tab = 'login';
    
    const registerTab = document.createElement('div');
    registerTab.className = 'login-tab';
    registerTab.textContent = 'Register';
    registerTab.dataset.tab = 'register';
    
    tabs.appendChild(loginTab);
    tabs.appendChild(registerTab);
    
    // Create login content
    const loginContent = document.createElement('div');
    loginContent.className = 'login-content active';
    loginContent.dataset.content = 'login';
    
    loginContent.innerHTML = `
        <form class="login-form" id="login-form">
            <input type="text" placeholder="Username" required>
            <input type="password" placeholder="Password" required>
            <button type="submit" class="login-button">Login</button>
            <div class="login-footer">
                <a href="#" class="forgot-password">Forgot password?</a>
                <span>Don't have an account? <a href="#" class="switch-to-register">Register</a></span>
            </div>
        </form>
    `;
    
    // Create register content
    const registerContent = document.createElement('div');
    registerContent.className = 'login-content';
    registerContent.dataset.content = 'register';
    
    registerContent.innerHTML = `
        <form class="login-form" id="register-form">
            <input type="email" placeholder="Email" required>
            <input type="text" placeholder="Username" required>
            <input type="password" placeholder="Password" required>
            <input type="password" placeholder="Confirm Password" required>
            <button type="submit" class="login-button">Create Account</button>
            <div class="login-footer">
                <span>Already have an account? <a href="#" class="switch-to-login">Login</a></span>
            </div>
        </form>
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'login-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Assemble elements
    modal.appendChild(closeBtn);
    modal.appendChild(tabs);
    modal.appendChild(loginContent);
    modal.appendChild(registerContent);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Tab switching functionality
    tabs.addEventListener('click', function(e) {
        if (e.target.classList.contains('login-tab')) {
            const targetTab = e.target.dataset.tab;
            document.querySelectorAll('.login-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');
            
            document.querySelectorAll('.login-content').forEach(content => {
                content.classList.remove('active');
                if (content.dataset.content === targetTab) {
                    content.classList.add('active');
                }
            });
        }
    });
    
    // Switch to register tab
    const switchToRegister = document.querySelector('.switch-to-register');
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            registerTab.click();
        });
    }
    
    // Switch to login tab
    const switchToLogin = document.querySelector('.switch-to-login');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            loginTab.click();
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login - in a real app this would validate against server
            if (username && password) {
                currentUser = {
                    username: username,
                    balance: '$250.00',
                    avatar: 'images/avatar.svg'
                };
                
                // Save user data to localStorage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update UI to reflect logged in state
                updateUserInterface();
                
                // Close modal
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate register - in a real app this would send to server
            if (email && username && password) {
                currentUser = {
                    username: username,
                    balance: '$100.00', // New users get starting balance
                    avatar: 'images/avatar.svg'
                };
                
                // Save user data to localStorage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update UI to reflect logged in state
                updateUserInterface();
                
                // Close modal
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Close button functionality
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Update UI based on login state
function updateUserInterface() {
    const userActions = document.querySelector('.user-actions');
    if (userActions) {
        if (isLoggedIn()) {
            userActions.innerHTML = `
                <div class="user-balance">
                    <i class="fas fa-coins"></i> ${currentUser.balance}
                </div>
                <div class="user-avatar">
                    <img src="${currentUser.avatar}" alt="${currentUser.username}">
                    <span>${currentUser.username}</span>
                </div>
                <button class="inventory-button"><i class="fas fa-box-open"></i> Inventory</button>
                <button class="deposit-button"><i class="fas fa-wallet"></i> Add Funds</button>
                <button class="logout-button">Logout</button>
            `;
            
            // Add logout functionality
            const logoutBtn = userActions.querySelector('.logout-button');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function() {
                    currentUser = null;
                    userInventory = [];
                    
                    // Clear localStorage data
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('userInventory');
                    
                    updateUserInterface();
                });
            }
            
            // Add inventory button functionality
            const inventoryBtn = userActions.querySelector('.inventory-button');
            if (inventoryBtn) {
                inventoryBtn.addEventListener('click', function() {
                    showInventory();
                });
            }
            
            // Add deposit button functionality
            const depositBtn = userActions.querySelector('.deposit-button');
            if (depositBtn) {
                depositBtn.addEventListener('click', function() {
                    showDepositModal();
                });
            }
        } else {
            userActions.innerHTML = `
                <button class="login-button">Login</button>
                <button class="register-button">Register</button>
            `;
            
            // Add login/register button handlers
            const loginBtn = userActions.querySelector('.login-button');
            const registerBtn = userActions.querySelector('.register-button');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', function() {
                    showLoginModal();
                    
                    // Select login tab
                    setTimeout(() => {
                        const loginTab = document.querySelector('.login-tab[data-tab="login"]');
                        if (loginTab) loginTab.click();
                    }, 100);
                });
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', function() {
                    showLoginModal();
                    
                    // Select register tab
                    setTimeout(() => {
                        const registerTab = document.querySelector('.login-tab[data-tab="register"]');
                        if (registerTab) registerTab.click();
                    }, 100);
                });
            }
        }
    }
    
    // Update open case buttons
    const caseButtons = document.querySelectorAll('.open-case-btn');
    if (caseButtons.length > 0) {
        caseButtons.forEach(button => {
            if (isLoggedIn()) {
                button.textContent = 'Open Case';
                button.classList.remove('disabled');
            } else {
                button.textContent = 'Login to Open';
                button.classList.add('disabled');
            }
        });
    }
    
    // Update add to cart buttons
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    if (cartButtons.length > 0) {
        cartButtons.forEach(button => {
            if (isLoggedIn()) {
                button.textContent = 'Add to Cart';
                button.classList.remove('disabled');
            } else {
                button.textContent = 'Login to Add';
                button.classList.add('disabled');
            }
        });
    }
}

// Show inventory function
function showInventory() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'inventory-overlay';
    
    // Create content
    const content = document.createElement('div');
    content.className = 'inventory-content';
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'inventory-title';
    title.textContent = 'Your Inventory';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'inventory-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Create inventory container
    const inventoryContainer = document.createElement('div');
    inventoryContainer.className = 'inventory-container';
    
    // Create tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'inventory-tabs';
    
    const itemsTab = document.createElement('button');
    itemsTab.className = 'inventory-tab active';
    itemsTab.textContent = 'Items';
    itemsTab.dataset.tab = 'items';
    
    const upgradeTab = document.createElement('button');
    upgradeTab.className = 'inventory-tab';
    upgradeTab.textContent = 'Upgrade';
    upgradeTab.dataset.tab = 'upgrade';
    
    tabsContainer.appendChild(itemsTab);
    tabsContainer.appendChild(upgradeTab);
    
    // Create content areas
    const tabContents = document.createElement('div');
    tabContents.className = 'inventory-tab-contents';
    
    // Items tab content
    const itemsContent = document.createElement('div');
    itemsContent.className = 'inventory-tab-content active';
    itemsContent.dataset.content = 'items';
    
    if (userInventory.length === 0) {
        // Show empty state
        itemsContent.innerHTML = `
            <div class="inventory-empty">
                <i class="fas fa-box-open inventory-empty-icon"></i>
                <p>Your inventory is empty</p>
                <button class="open-cases-btn">Open Cases to Get Items</button>
            </div>
        `;
    } else {
        // Create grid for items
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'inventory-items-grid';
        
        // Add items to grid
        userInventory.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = `inventory-item item-border-${item.rarity}`;
            itemEl.dataset.id = item.id;
            
            itemEl.innerHTML = `
                <div class="inventory-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="inventory-item-details">
                    <div class="inventory-item-name ${item.rarity}">${item.name}</div>
                    <div class="inventory-item-price">${item.price}</div>
                </div>
                <div class="inventory-item-actions">
                    <button class="inventory-sell-btn" data-id="${item.id}">Sell</button>
                    <button class="inventory-upgrade-btn" data-id="${item.id}">Upgrade</button>
                </div>
            `;
            
            itemsGrid.appendChild(itemEl);
        });
        
        itemsContent.appendChild(itemsGrid);
    }
    
    // Upgrade tab content
    const upgradeContent = document.createElement('div');
    upgradeContent.className = 'inventory-tab-content';
    upgradeContent.dataset.content = 'upgrade';
    
    upgradeContent.innerHTML = `
        <div class="upgrade-system">
            <div class="upgrade-instructions">
                <h3>Item Upgrade System</h3>
                <p>Select an item from your inventory on the left, then select a target item on the right to upgrade.</p>
                <p>The upgrade chance depends on the price difference between the items.</p>
            </div>
            
            <div class="upgrade-container">
                <div class="upgrade-select">
                    <h4>Select Your Item</h4>
                    <div class="upgrade-item-select">
                        ${userInventory.length > 0 ? 
                            userInventory.map(item => `
                                <div class="upgrade-item" data-id="${item.id}">
                                    <img src="${item.image}" alt="${item.name}">
                                    <div class="upgrade-item-info">
                                        <div class="upgrade-item-name ${item.rarity}">${item.name}</div>
                                        <div class="upgrade-item-price">${item.price}</div>
                                    </div>
                                </div>
                            `).join('') : '<p>You have no items to upgrade</p>'
                        }
                    </div>
                </div>
                
                <div class="upgrade-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
                
                <div class="upgrade-target">
                    <h4>Select Target Item</h4>
                    <div class="upgrade-target-select">
                        <p>First select your item on the left</p>
                    </div>
                </div>
            </div>
            
            <div class="upgrade-stats">
                <div class="upgrade-chance">
                    <span>Upgrade Chance:</span>
                    <strong>0%</strong>
                </div>
                
                <button class="upgrade-button disabled">Select Items to Upgrade</button>
            </div>
        </div>
    `;
    
    // Add contents to main container
    tabContents.appendChild(itemsContent);
    tabContents.appendChild(upgradeContent);
    
    // Assemble elements
    inventoryContainer.appendChild(tabsContainer);
    inventoryContainer.appendChild(tabContents);
    
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(inventoryContainer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add tab switching functionality
    tabsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('inventory-tab')) {
            const tabId = e.target.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.inventory-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.inventory-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.inventory-tab-content[data-content="${tabId}"]`).classList.add('active');
        }
    });
    
    // Add sell functionality
    const sellButtons = document.querySelectorAll('.inventory-sell-btn');
    sellButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            const itemIndex = userInventory.findIndex(item => item.id === itemId);
            
            if (itemIndex !== -1) {
                const item = userInventory[itemIndex];
                const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').replace(',', ''));
                
                // Add price to balance
                const newBalance = (currentBalance + price).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Remove item from inventory
                userInventory.splice(itemIndex, 1);
                
                // Update UI
                updateUserInterface();
                
                // Close and reopen inventory to refresh
                document.body.removeChild(overlay);
                showInventory();
            }
        });
    });
    
    // Add upgrade selection functionality
    const upgradeItems = document.querySelectorAll('.upgrade-item');
    upgradeItems.forEach(itemEl => {
        itemEl.addEventListener('click', function() {
            // Clear any previous selection
            document.querySelectorAll('.upgrade-item').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Mark this item as selected
            this.classList.add('selected');
            
            const itemId = parseInt(this.dataset.id);
            const selectedItem = userInventory.find(item => item.id === itemId);
            
            if (selectedItem) {
                const selectedPrice = parseFloat(selectedItem.price.replace('$', '').replace(',', ''));
                
                // Generate list of available target items (items with higher value)
                const allItems = [
                    { name: 'AWP | Dragon Lore (Factory New)', price: '$1,850.42', rarity: 'legendary', image: 'images/skins/awp/dragon_lore.png' },
                    { name: 'Karambit | Fade (Factory New)', price: '$1,245.89', rarity: 'legendary', image: 'images/skins/knife/karambit_doppler.png' },
                    { name: 'M4A4 | Howl (Minimal Wear)', price: '$985.65', rarity: 'legendary', image: 'images/skins/m4a4/howl.png' },
                    { name: 'AK-47 | Fire Serpent (Field-Tested)', price: '$745.20', rarity: 'rare', image: 'images/skins/ak47/fire_serpent.png' },
                    { name: 'Butterfly Knife | Doppler (Factory New)', price: '$1,320.75', rarity: 'legendary', image: 'images/skins/knife/butterfly_fade.png' },
                    { name: 'USP-S | Kill Confirmed (Minimal Wear)', price: '$152.67', rarity: 'mythical', image: 'images/skins/awp/neo_noir.png' },
                    { name: 'Glock-18 | Fade (Factory New)', price: '$786.32', rarity: 'mythical', image: 'images/skins/m4a4/neo_noir.png' },
                    { name: 'Desert Eagle | Blaze (Factory New)', price: '$430.18', rarity: 'mythical', image: 'images/skins/awp/wildfire.png' }
                ];
                
                // Filter items with higher prices
                const targetItems = allItems.filter(item => {
                    const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                    return price > selectedPrice;
                });
                
                // Show target items
                const targetContainer = document.querySelector('.upgrade-target-select');
                
                if (targetItems.length > 0) {
                    targetContainer.innerHTML = targetItems.map(item => {
                        const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                        const upgradeChance = Math.round((selectedPrice / price) * 100);
                        
                        return `
                            <div class="upgrade-target-item item-border-${item.rarity}" data-price="${price}" data-chance="${upgradeChance}">
                                <img src="${item.image}" alt="${item.name}">
                                <div class="upgrade-item-info">
                                    <div class="upgrade-item-name ${item.rarity}">${item.name}</div>
                                    <div class="upgrade-item-price">${item.price}</div>
                                </div>
                                <div class="upgrade-chance-label">${upgradeChance}%</div>
                            </div>
                        `;
                    }).join('');
                    
                    // Add target item selection
                    const targetItems = document.querySelectorAll('.upgrade-target-item');
                    targetItems.forEach(targetEl => {
                        targetEl.addEventListener('click', function() {
                            // Clear previous selection
                            document.querySelectorAll('.upgrade-target-item').forEach(el => {
                                el.classList.remove('selected');
                            });
                            
                            // Mark as selected
                            this.classList.add('selected');
                            
                            // Update upgrade chance display
                            const chance = parseInt(this.dataset.chance);
                            document.querySelector('.upgrade-chance strong').textContent = `${chance}%`;
                            
                            // Enable upgrade button
                            const upgradeButton = document.querySelector('.upgrade-button');
                            upgradeButton.classList.remove('disabled');
                            upgradeButton.textContent = 'Upgrade';
                            
                            // Add upgrade functionality
                            upgradeButton.onclick = function() {
                                // Generate random number to determine success
                                const random = Math.random() * 100;
                                
                                if (random <= chance) {
                                    // Success
                                    alert('Upgrade successful! You got the new item!');
                                    
                                    // Replace old item with new one
                                    const itemId = parseInt(document.querySelector('.upgrade-item.selected').dataset.id);
                                    const itemIndex = userInventory.findIndex(item => item.id === itemId);
                                    
                                    if (itemIndex !== -1) {
                                        const targetItem = document.querySelector('.upgrade-target-item.selected');
                                        const targetName = targetItem.querySelector('.upgrade-item-name').textContent;
                                        const targetPrice = targetItem.querySelector('.upgrade-item-price').textContent;
                                        const targetRarity = targetItem.classList[1].replace('item-border-', '');
                                        const targetImage = targetItem.querySelector('img').src;
                                        
                                        userInventory[itemIndex] = {
                                            id: Date.now(),
                                            name: targetName,
                                            price: targetPrice,
                                            rarity: targetRarity,
                                            image: targetImage,
                                            timestamp: new Date().toLocaleString()
                                        };
                                        
                                        // Close and reopen inventory
                                        document.body.removeChild(overlay);
                                        showInventory();
                                    }
                                } else {
                                    // Failure
                                    alert('Upgrade failed! You lost your item.');
                                    
                                    // Remove the item
                                    const itemId = parseInt(document.querySelector('.upgrade-item.selected').dataset.id);
                                    const itemIndex = userInventory.findIndex(item => item.id === itemId);
                                    
                                    if (itemIndex !== -1) {
                                        userInventory.splice(itemIndex, 1);
                                        
                                        // Close and reopen inventory
                                        document.body.removeChild(overlay);
                                        showInventory();
                                    }
                                }
                            };
                        });
                    });
                } else {
                    targetContainer.innerHTML = '<p>No available items for upgrade</p>';
                }
            }
        });
    });
    
    // Add event listener to close button
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Show deposit modal function - implementation moved to deposit.js
function showDepositModal() {
    // This is now implemented in deposit.js
    // We keep this function as a stub to avoid breaking existing code
    if (typeof window.showDepositModalImplementation === 'function') {
        window.showDepositModalImplementation();
    } else {
        console.log('Loading deposit modal implementation...');
        setTimeout(() => showDepositModal(), 100); // Try again after a short delay
        return;
    }
    
    /* The code below is kept for reference but is no longer used 
    // The implementation has been moved to deposit.js
    // Add tabs for different deposit methods
    depositContainer.innerHTML = `
        <div class="deposit-tabs">
            <button class="deposit-tab active" data-tab="cards">Credit Card</button>
            <button class="deposit-tab" data-tab="crypto">Cryptocurrency</button>
            <button class="deposit-tab" data-tab="code">Admin Code</button>
        </div>
        
        <div class="deposit-tab-contents">
            <div class="deposit-tab-content active" data-content="cards">
                <form class="deposit-form">
                    <div class="deposit-amount">
                        <h3>Select Amount</h3>
                        <div class="amount-options">
                            <button type="button" class="amount-option" data-amount="10">$10</button>
                            <button type="button" class="amount-option" data-amount="25">$25</button>
                            <button type="button" class="amount-option" data-amount="50">$50</button>
                            <button type="button" class="amount-option" data-amount="100">$100</button>
                            <button type="button" class="amount-option" data-amount="250">$250</button>
                            <button type="button" class="amount-option custom" data-amount="custom">Custom</button>
                        </div>
                        <input type="number" class="custom-amount" placeholder="Enter custom amount" style="display: none;">
                    </div>
                    
                    <div class="card-details">
                        <h3>Card Details</h3>
                        <div class="form-group">
                            <label>Card Number</label>
                            <input type="text" placeholder="1234 5678 9012 3456" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM/YY" required>
                            </div>
                            
                            <div class="form-group">
                                <label>CVC</label>
                                <input type="text" placeholder="123" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Cardholder Name</label>
                            <input type="text" placeholder="John Doe" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="deposit-submit-btn">Add Funds</button>
                </form>
            </div>
            
            <div class="deposit-tab-content" data-content="crypto">
                <h3>Cryptocurrency Payment</h3>
                <p>Send the desired amount to one of our crypto addresses below:</p>
                
                <div class="crypto-options">
                    <div class="crypto-option">
                        <i class="fab fa-bitcoin"></i>
                        <span>Bitcoin (BTC)</span>
                        <code>bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                        <button class="copy-btn" data-copy="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh">Copy</button>
                    </div>
                    
                    <div class="crypto-option">
                        <i class="fab fa-ethereum"></i>
                        <span>Ethereum (ETH)</span>
                        <code>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</code>
                        <button class="copy-btn" data-copy="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7">Copy</button>
                    </div>
                </div>
                
                <p class="crypto-note">* After sending, please contact our support team with your transaction ID to add funds to your account.</p>
            </div>
            
            <div class="deposit-tab-content" data-content="code">
                <h3>Admin Code</h3>
                <p>If you have an admin code, enter it below to redeem funds.</p>
                
                <div class="form-group">
                    <input type="text" id="admin-code" placeholder="Enter admin code" required>
                </div>
                
                <button type="button" id="redeem-code-btn">Redeem Code</button>
            </div>
        </div>
    `;
    
    // Assemble elements
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(depositContainer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add tab switching functionality
    const tabsContainer = document.querySelector('.deposit-tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('deposit-tab')) {
                const tabId = e.target.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.deposit-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update active content
                document.querySelectorAll('.deposit-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelector(`.deposit-tab-content[data-content="${tabId}"]`).classList.add('active');
            }
        });
    }
    
    // Add amount selection functionality
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.querySelector('.custom-amount');
    
    if (amountOptions.length && customAmountInput) {
        amountOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                amountOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Handle custom amount
                if (this.dataset.amount === 'custom') {
                    customAmountInput.style.display = 'block';
                    customAmountInput.focus();
                } else {
                    customAmountInput.style.display = 'none';
                }
            });
        });
    }
    
    // Add deposit form submission
    const depositForm = document.querySelector('.deposit-form');
    if (depositForm) {
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected amount
            let amount = 0;
            const activeOption = document.querySelector('.amount-option.active');
            
            if (activeOption) {
                if (activeOption.dataset.amount === 'custom') {
                    amount = parseFloat(customAmountInput.value) || 0;
                } else {
                    amount = parseFloat(activeOption.dataset.amount) || 0;
                }
            }
            
            if (amount <= 0) {
                alert('Please select or enter a valid amount');
                return;
            }
            
            // Simulate payment processing
            alert(`Processing payment of $${amount}. In a real implementation, this would connect to a payment gateway.`);
            
            // Update user balance (for demo purposes)
            const currentBalance = parseFloat(currentUser.balance.replace('$', '').replace(',', ''));
            const newBalance = (currentBalance + amount).toFixed(2);
            currentUser.balance = `$${newBalance}`;
            
            // Update UI
            updateUserInterface();
            
            // Close modal
            document.body.removeChild(overlay);
        });
    }
    
    // Add admin code redemption
    const redeemBtn = document.getElementById('redeem-code-btn');
    const adminCodeInput = document.getElementById('admin-code');
    
    if (redeemBtn && adminCodeInput) {
        redeemBtn.addEventListener('click', function() {
            const code = adminCodeInput.value.trim();
            
            // Admin codes (in a real app, these would be validated against a server)
            const adminCodes = {
                'ADMIN123': 1000,
                'DEV456': 500,
                'TEST789': 100,
                'FREEMONEY': 999999
            };
            
            if (code in adminCodes) {
                const amount = adminCodes[code];
                
                // Update user balance
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').replace(',', ''));
                const newBalance = (currentBalance + amount).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI
                updateUserInterface();
                
                alert(`Success! $${amount} has been added to your balance.`);
                
                // Close modal
                document.body.removeChild(overlay);
            } else {
                alert('Invalid admin code. Please try again.');
            }
        });
    }
    
    // Add event listener to close button
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Function to show the Plinko game
function showPlinkoGame() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'plinko-overlay';
    
    // Create content
    const content = document.createElement('div');
    content.className = 'plinko-content';
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'plinko-title';
    title.textContent = 'Plinko Game';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'plinko-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.className = 'plinko-game-container';
    
    // Create game board
    const gameBoard = document.createElement('div');
    gameBoard.className = 'plinko-board';
    
    // Create pegs in a triangular pattern
    const rows = 10;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'plinko-row';
        
        // Each row has i+1 pegs
        for (let j = 0; j <= i; j++) {
            const peg = document.createElement('div');
            peg.className = 'plinko-peg';
            row.appendChild(peg);
        }
        
        gameBoard.appendChild(row);
    }
    
    // Create multiplier slots
    const multiplierRow = document.createElement('div');
    multiplierRow.className = 'plinko-multiplier-row';
    
    // Define multipliers (based on risk level with high multipliers on the edges)
    const multipliers = [
        0.1, 0.2, 0.3, 0.5, 0.7, 1, 0.7, 0.5, 0.3, 0.2, 0.1
    ];
    
    // Add multiplier slots
    multipliers.forEach(multiplier => {
        const slot = document.createElement('div');
        slot.className = 'plinko-multiplier-slot';
        slot.textContent = `x${multiplier}`;
        
        // Color based on multiplier value
        if (multiplier > 2) {
            slot.classList.add('high-multiplier');
        } else if (multiplier > 0.5) {
            slot.classList.add('medium-multiplier');
        } else {
            slot.classList.add('low-multiplier');
        }
        
        multiplierRow.appendChild(slot);
    });
    
    // Create controls
    const controls = document.createElement('div');
    controls.className = 'plinko-controls';
    
    controls.innerHTML = `
        <div class="plinko-bet-amount">
            <label>Bet Amount:</label>
            <input type="number" id="plinko-bet-amount" min="1" value="10" step="1">
        </div>
        
        <div class="plinko-risk-level">
            <label>Risk Level:</label>
            <select id="plinko-risk">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        
        <button id="plinko-drop-btn">Drop Ball</button>
    `;
    
    // Assemble elements
    gameContainer.appendChild(gameBoard);
    gameContainer.appendChild(multiplierRow);
    
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(gameContainer);
    content.appendChild(controls);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add functionality to drop button
    const dropBtn = document.getElementById('plinko-drop-btn');
    const betAmountInput = document.getElementById('plinko-bet-amount');
    
    if (dropBtn && betAmountInput) {
        dropBtn.addEventListener('click', function() {
            // Check if user is logged in
            if (!isLoggedIn()) {
                alert('Please login to play');
                return;
            }
            
            // Get bet amount
            const betAmount = parseFloat(betAmountInput.value) || 0;
            
            // Validate bet amount
            if (betAmount <= 0) {
                alert('Please enter a valid bet amount');
                return;
            }
            
            // Check if user has enough balance
            const currentBalance = parseFloat(currentUser.balance.replace('$', '').replace(',', ''));
            
            if (currentBalance < betAmount) {
                alert(`Insufficient balance. You need $${betAmount} but you only have ${currentUser.balance}.`);
                return;
            }
            
            // Deduct bet amount from balance
            const newBalance = (currentBalance - betAmount).toFixed(2);
            currentUser.balance = `$${newBalance}`;
            
            // Update UI
            updateUserInterface();
            
            // Create ball
            const ball = document.createElement('div');
            ball.className = 'plinko-ball';
            
            // Add ball to the top of the board
            gameBoard.appendChild(ball);
            
            // Random starting position (horizontal)
            const startX = 45 + Math.random() * 10; // percentage from left
            ball.style.left = `${startX}%`;
            ball.style.top = '0';
            
            // Animate ball drop
            const pathHistory = [];
            const rows = document.querySelectorAll('.plinko-row');
            const slotWidth = 100 / multipliers.length;
            
            // Simulate path through pegs
            let currentX = startX;
            let finalSlot = 0;
            
            for (let i = 0; i < rows.length; i++) {
                // Bias the ball to move toward the center (lower payouts)
                // Use a weighted random approach - higher chance to move toward center
                let centerBias = 0.65; // 65% chance to move toward center
                const middleX = 50; // Middle of the screen
                let direction;
                
                if (currentX < middleX) {
                    // Left side - bias toward right (toward center)
                    direction = Math.random() < centerBias ? 1 : -1;
                } else {
                    // Right side - bias toward left (toward center)
                    direction = Math.random() < centerBias ? -1 : 1;
                }
                currentX += direction * 4; // adjusted based on CSS positioning
                
                // Ensure ball stays within bounds
                currentX = Math.max(Math.min(currentX, 95), 5);
                
                // Record position for animation
                pathHistory.push({ x: currentX, y: (i + 1) * 10 }); // percentage from top
                
                // Determine final slot
                if (i === rows.length - 1) {
                    finalSlot = Math.floor(currentX / slotWidth);
                    finalSlot = Math.max(Math.min(finalSlot, multipliers.length - 1), 0);
                }
            }
            
            // Animate the ball along the path
            let step = 0;
            const bounceDuration = 50; // ms between steps
            
            function animateBounce() {
                if (step < pathHistory.length) {
                    ball.style.left = `${pathHistory[step].x}%`;
                    ball.style.top = `${pathHistory[step].y}%`;
                    step++;
                    setTimeout(animateBounce, bounceDuration);
                } else {
                    // Ball has reached the bottom, animate to final slot
                    const finalX = (finalSlot * slotWidth) + (slotWidth / 2);
                    ball.style.left = `${finalX}%`;
                    ball.style.top = '100%';
                    
                    // Flash the winning slot
                    const winningSlot = document.querySelectorAll('.plinko-multiplier-slot')[finalSlot];
                    winningSlot.classList.add('winning-slot');
                    
                    // Calculate winnings
                    const multiplier = multipliers[finalSlot];
                    const winnings = (betAmount * multiplier).toFixed(2);
                    
                    // Update UI with win/loss message
                    setTimeout(() => {
                        if (multiplier > 1) {
                            alert(`You won $${winnings}!`);
                        } else if (multiplier === 1) {
                            alert(`You got your bet back: $${winnings}`);
                        } else {
                            alert(`You won $${winnings}. Better luck next time!`);
                        }
                        
                        // Add winnings to balance
                        const updatedBalance = (parseFloat(currentUser.balance.replace('$', '').replace(',', '')) + parseFloat(winnings)).toFixed(2);
                        currentUser.balance = `$${updatedBalance}`;
                        updateUserInterface();
                        
                        // Remove winning slot highlight and ball
                        winningSlot.classList.remove('winning-slot');
                        gameBoard.removeChild(ball);
                    }, 1000);
                }
            }
            
            // Start the animation
            animateBounce();
        });
    }
    
    // Add event listener to close button
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Add CSS styles for Plinko game
    const style = document.createElement('style');
    style.textContent = `
        .plinko-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .plinko-content {
            background-color: var(--bg-lighter);
            border-radius: 10px;
            padding: 30px;
            width: 90%;
            max-width: 700px;
            position: relative;
        }
        
        .plinko-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .plinko-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 20px;
            cursor: pointer;
        }
        
        .plinko-close:hover {
            color: var(--primary);
        }
        
        .plinko-game-container {
            width: 100%;
            height: 400px;
            position: relative;
            margin-bottom: 20px;
            overflow: hidden;
            background-color: var(--bg-darker);
            border-radius: 8px;
        }
        
        .plinko-board {
            width: 100%;
            height: 85%;
            position: relative;
        }
        
        .plinko-row {
            display: flex;
            justify-content: space-around;
            padding: 0 10%;
        }
        
        .plinko-peg {
            width: 12px;
            height: 12px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            margin: 0 auto;
        }
        
        .plinko-multiplier-row {
            width: 100%;
            height: 15%;
            display: flex;
            position: absolute;
            bottom: 0;
        }
        
        .plinko-multiplier-slot {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            border-top: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }
        
        .high-multiplier {
            background-color: rgba(0, 204, 102, 0.15);
            color: var(--primary);
        }
        
        .medium-multiplier {
            background-color: rgba(255, 187, 0, 0.15);
            color: #ffbb00;
        }
        
        .low-multiplier {
            background-color: rgba(255, 69, 58, 0.15);
            color: #ff453a;
        }
        
        .winning-slot {
            animation: pulse-bg 0.5s infinite alternate;
        }
        
        @keyframes pulse-bg {
            0% { background-color: rgba(255, 255, 255, 0.1); }
            100% { background-color: rgba(255, 255, 255, 0.3); }
        }
        
        .plinko-ball {
            width: 16px;
            height: 16px;
            background-color: var(--primary);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            transition: all 0.05s ease;
            box-shadow: 0 0 10px rgba(0, 204, 102, 0.7);
        }
        
        .plinko-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .plinko-bet-amount, .plinko-risk-level {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .plinko-bet-amount input, .plinko-risk-level select {
            padding: 8px 12px;
            background-color: var(--bg-darker);
            border: 1px solid var(--border-color);
            border-radius: 5px;
            color: var(--text-color);
        }
        
        #plinko-drop-btn {
            padding: 10px 20px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        #plinko-drop-btn:hover {
            background-color: var(--primary-hover);
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize user interface
    updateUserInterface();
    
    // Initialize wheel of fortune
    initializeWheel();
    
    // Admin Console Functionality
    const adminConsoleBtn = document.getElementById('admin-console-button');
    const adminOverlay = document.getElementById('admin-console-overlay');
    const adminCloseBtn = document.getElementById('admin-console-close');
    const adminCodeInput = document.getElementById('admin-access-code');
    const adminTargetInput = document.getElementById('admin-target-user');
    const adminAmountInput = document.getElementById('admin-amount');
    const adminExecuteBtn = document.getElementById('admin-execute-btn');
    const adminResult = document.getElementById('admin-console-result');
    
    // Admin console access code
    const ADMIN_CODE = 'Lemato1234';
    
    if (adminConsoleBtn && adminOverlay) {
        // Toggle admin console
        adminConsoleBtn.addEventListener('click', function() {
            adminOverlay.style.display = adminOverlay.style.display === 'block' ? 'none' : 'block';
            
            if (adminOverlay.style.display === 'block') {
                adminCodeInput.focus();
            }
        });
        
        // Close admin console
        if (adminCloseBtn) {
            adminCloseBtn.addEventListener('click', function() {
                adminOverlay.style.display = 'none';
            });
        }
        
        // Verify admin code
        if (adminCodeInput) {
            adminCodeInput.addEventListener('input', function() {
                const isValid = this.value === ADMIN_CODE;
                
                adminTargetInput.disabled = !isValid;
                adminAmountInput.disabled = !isValid;
                adminExecuteBtn.disabled = !isValid;
                
                if (isValid) {
                    adminResult.style.display = 'block';
                    adminResult.textContent = '✓ Admin access granted';
                    adminResult.style.color = 'var(--primary)';
                    
                    // Focus next input
                    adminTargetInput.focus();
                } else if (this.value.length > 0) {
                    adminResult.style.display = 'block';
                    adminResult.textContent = '✗ Invalid admin code';
                    adminResult.style.color = '#ff453a';
                } else {
                    adminResult.style.display = 'none';
                }
            });
        }
        
        // Execute admin command
        if (adminExecuteBtn) {
            adminExecuteBtn.addEventListener('click', function() {
                const username = adminTargetInput.value.trim();
                const amount = parseFloat(adminAmountInput.value);
                
                if (!username) {
                    adminResult.textContent = '✗ Please enter a username';
                    adminResult.style.color = '#ff453a';
                    return;
                }
                
                if (isNaN(amount) || amount <= 0) {
                    adminResult.textContent = '✗ Please enter a valid amount';
                    adminResult.style.color = '#ff453a';
                    return;
                }
                
                // Check if user exists and is logged in
                if (currentUser && currentUser.username === username) {
                    // Update user's balance
                    const currentBalance = parseFloat(currentUser.balance.replace('$', '').replace(',', ''));
                    const newBalance = (currentBalance + amount).toFixed(2);
                    currentUser.balance = `$${newBalance}`;
                    
                    // Update UI
                    updateUserInterface();
                    
                    adminResult.textContent = `✓ Added $${amount} to ${username}'s balance. New balance: $${newBalance}`;
                    adminResult.style.color = 'var(--primary)';
                    
                    // Reset inputs
                    adminAmountInput.value = '';
                } else {
                    adminResult.textContent = `✗ User '${username}' not found or not logged in`;
                    adminResult.style.color = '#ff453a';
                }
            });
        }
    }
    
    // Plinko Game Link
    const plinkoLink = document.getElementById('plinko-minigame-link');
    if (plinkoLink) {
        plinkoLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            if (!isLoggedIn()) {
                showLoginModal();
                return;
            }
            
            // Show Plinko game
            showPlinkoGame();
        });
    }
    
    // Upgrades Link
    const upgradesLink = document.getElementById('upgrades-link');
    if (upgradesLink) {
        upgradesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            if (!isLoggedIn()) {
                showLoginModal();
                return;
            }
            
            // Show Upgrade Modal
            showUpgradeModal();
        });
    }
    
    // Battles Link
    const battlesLink = document.getElementById('battles-link');
    if (battlesLink) {
        battlesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            if (!isLoggedIn()) {
                showLoginModal();
                return;
            }
            
            // Show Battles Modal
            showBattlesModal();
        });
    }
    
    // Wheel Game wurde entfernt
    /*
    const wheelLink = document.getElementById('wheel-minigame-link');
    if (wheelLink) {
        wheelLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            if (!isLoggedIn()) {
                showLoginModal();
                return;
            }
            
            // Show Wheel Game
            showWheelGame();
        });
    }
    */
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Filter Options
    const filterOptions = document.querySelectorAll('.filter-option');
    
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                filterOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Here you would normally filter cases based on the selected option
                console.log('Filter selected:', this.querySelector('span').textContent);
            });
        });
    }
    
    // Load More Cases Button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading by changing button text
            this.textContent = 'Loading...';
            
            // Here you would normally load more cases via AJAX
            // For demo, let's just change button text back after a delay
            setTimeout(() => {
                this.textContent = 'Load More Cases';
                alert('In a real implementation, more cases would be loaded here.');
            }, 1500);
        });
    }
    
    // Open Case Button - Simulated
    const openCaseButtons = document.querySelectorAll('.open-case-btn');
    
    if (openCaseButtons.length > 0) {
        openCaseButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if user is logged in
                if (!isLoggedIn()) {
                    // Show login modal if not logged in
                    showLoginModal();
                    return;
                }
                
                // Get case name from the parent element
                const caseItem = this.closest('.case-item');
                const caseName = caseItem.querySelector('h3').textContent;
                
                // Get case price and deduct from balance
                const casePrice = caseItem.querySelector('.case-price').textContent;
                const priceCleaned = parseFloat(casePrice.replace('$', '').trim());
                
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                
                // Check if user has enough balance
                if (currentBalance < priceCleaned) {
                    alert(`You don't have enough balance to open this case. You need $${priceCleaned} but you only have ${currentUser.balance}.`);
                    return;
                }
                
                // Deduct case price from balance
                const newBalance = (currentBalance - priceCleaned).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI to reflect new balance
                updateUserInterface();
                
                // Show a simulation popup
                simulateOpenCase(caseName);
            });
        });
    }
    
    // Search Box Functionality
    const searchBox = document.querySelector('.search-box input');
    
    if (searchBox) {
        searchBox.addEventListener('keyup', function(e) {
            // If Enter key is pressed
            if (e.keyCode === 13) {
                alert(`You searched for: ${this.value}\nIn a real implementation, this would filter the cases.`);
            }
        });
    }
    
    // Drops Slider - Simple horizontal scroll buttons
    const dropsSlider = document.querySelector('.drops-slider');
    
    if (dropsSlider) {
        // Add navigation buttons dynamically
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        // Get the parent element of the slider
        const sliderParent = dropsSlider.parentNode;
        
        // Create the wrapper structure
        sliderParent.insertBefore(sliderWrapper, dropsSlider);
        sliderWrapper.appendChild(dropsSlider);
        sliderWrapper.appendChild(prevBtn);
        sliderWrapper.appendChild(nextBtn);
        
        // Add navigation functionality
        prevBtn.addEventListener('click', () => {
            dropsSlider.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            dropsSlider.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        // Add CSS for the buttons
        const style = document.createElement('style');
        style.textContent = `
            .slider-wrapper {
                position: relative;
            }
            .slider-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: background-color 0.2s;
            }
            .slider-nav:hover {
                background-color: var(--primary);
            }
            .slider-nav.prev {
                left: 10px;
            }
            .slider-nav.next {
                right: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simulate opening a case function
    function simulateOpenCase(caseName) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'case-opening-overlay';
        
        // Create content
        const content = document.createElement('div');
        content.className = 'case-opening-content';
        
        // Create title
        const title = document.createElement('h2');
        title.textContent = `Opening ${caseName}...`;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'case-opening-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Generate all possible items with local CS:GO skin images
        const allItems = [
            { name: 'AWP | Dragon Lore (Factory New)', price: '$1,850.42', rarity: 'legendary', image: 'images/skins/awp/dragon_lore.png' },
            { name: 'Karambit | Fade (Factory New)', price: '$1,245.89', rarity: 'legendary', image: 'images/skins/knife/karambit_doppler.png' },
            { name: 'M4A4 | Howl (Minimal Wear)', price: '$985.65', rarity: 'legendary', image: 'images/skins/m4a4/howl.png' },
            { name: 'AK-47 | Fire Serpent (Field-Tested)', price: '$745.20', rarity: 'rare', image: 'images/skins/ak47/fire_serpent.png' },
            { name: 'Butterfly Knife | Doppler (Factory New)', price: '$1,320.75', rarity: 'legendary', image: 'images/skins/knife/butterfly_fade.png' },
            { name: 'USP-S | Kill Confirmed (Minimal Wear)', price: '$152.67', rarity: 'mythical', image: 'images/skins/awp/neo_noir.png' },
            { name: 'Glock-18 | Fade (Factory New)', price: '$786.32', rarity: 'mythical', image: 'images/skins/m4a4/neo_noir.png' },
            { name: 'Desert Eagle | Blaze (Factory New)', price: '$430.18', rarity: 'mythical', image: 'images/skins/awp/wildfire.png' },
            { name: 'P250 | Muertos (Field-Tested)', price: '$3.42', rarity: 'uncommon', image: 'images/skins/ak47/neon_rider.png' },
            { name: 'Five-SeveN | Monkey Business (Well-Worn)', price: '$5.73', rarity: 'uncommon', image: 'images/skins/ak47/bloodsport.png' },
            { name: 'MP9 | Rose Iron (Factory New)', price: '$2.84', rarity: 'common', image: 'images/skins/mp9/rose_iron.png' },
            { name: 'Sawed-Off | The Kraken (Minimal Wear)', price: '$4.21', rarity: 'uncommon', image: 'images/skins/p90/asiimov.png' },
            { name: 'Nova | Hyper Beast (Field-Tested)', price: '$3.67', rarity: 'uncommon', image: 'images/skins/m4a4/asiimov.png' },
            { name: 'P90 | Asiimov (Minimal Wear)', price: '$14.32', rarity: 'rare', image: 'images/skins/p90/asiimov.png' },
            { name: 'MAC-10 | Neon Rider (Factory New)', price: '$8.65', rarity: 'rare', image: 'images/skins/ak47/neon_rider.png' }
        ];

        // Define case tiers with different reward probabilities based on case name/type
        const caseTiers = {
            'Starter Case': {
                winChance: 0.85, // 85% chance of winning
                itemDistribution: {
                    common: 0.50,    // 50% chance for common items
                    uncommon: 0.35,  // 35% chance for uncommon items
                    rare: 0.10,      // 10% chance for rare items
                    mythical: 0.04,  // 4% chance for mythical items
                    legendary: 0.01  // 1% chance for legendary items
                }
            },
            'Standard Case': {
                winChance: 0.70, // 70% chance of winning
                itemDistribution: {
                    common: 0.30,    // 30% chance for common items
                    uncommon: 0.40,  // 40% chance for uncommon items
                    rare: 0.20,      // 20% chance for rare items
                    mythical: 0.07,  // 7% chance for mythical items
                    legendary: 0.03  // 3% chance for legendary items
                }
            },
            'Premium Case': {
                winChance: 0.60, // 60% chance of winning
                itemDistribution: {
                    common: 0.15,    // 15% chance for common items
                    uncommon: 0.25,  // 25% chance for uncommon items
                    rare: 0.35,      // 35% chance for rare items
                    mythical: 0.15,  // 15% chance for mythical items
                    legendary: 0.10  // 10% chance for legendary items
                }
            },
            'Legendary Case': {
                winChance: 0.40, // 40% chance of winning
                itemDistribution: {
                    common: 0.05,    // 5% chance for common items
                    uncommon: 0.10,  // 10% chance for uncommon items
                    rare: 0.25,      // 25% chance for rare items
                    mythical: 0.35,  // 35% chance for mythical items
                    legendary: 0.25  // 25% chance for legendary items
                }
            },
            'Default': { // Used for any other case names
                winChance: 0.65,
                itemDistribution: {
                    common: 0.30,
                    uncommon: 0.30,
                    rare: 0.25,
                    mythical: 0.10,
                    legendary: 0.05
                }
            }
        };
        
        // Get the case tier configuration (or use default if not found)
        const caseTier = caseTiers[caseName] || caseTiers['Default'];
        
        // Determine if user wins or loses based on winChance
        const isWin = Math.random() <= caseTier.winChance;
        
        // Function to pick a random item based on the case tier's item distribution
        function pickRandomItemByRarity() {
            // Generate a random number between 0 and 1
            const rand = Math.random();
            
            // Determine the rarity based on item distribution probabilities
            let cumulativeProbability = 0;
            let selectedRarity = null;
            
            for (const [rarity, probability] of Object.entries(caseTier.itemDistribution)) {
                cumulativeProbability += probability;
                if (rand <= cumulativeProbability) {
                    selectedRarity = rarity;
                    break;
                }
            }
            
            // Filter items by rarity
            const itemsOfSelectedRarity = allItems.filter(item => item.rarity === selectedRarity);
            const randomIndex = Math.floor(Math.random() * itemsOfSelectedRarity.length);
            return itemsOfSelectedRarity[randomIndex];
        }
        
        // Pick a winning item or a losing item based on case odds
        const winningItem = isWin ? pickRandomItemByRarity() : { 
            name: 'Nothing', 
            price: '$0.00', 
            rarity: 'common', 
            image: 'images/no-item.svg',
            isLoss: true
        };
        
        // Create a random selection of items to display in the spinner
        const spinItems = [];
        
        // Add 30 random items
        for (let i = 0; i < 30; i++) {
            const randomIndex = Math.floor(Math.random() * allItems.length);
            spinItems.push(allItems[randomIndex]);
        }
        
        // Insert the winning item at a specific position (e.g., position 25)
        const winningPosition = 25;
        spinItems[winningPosition] = winningItem;
        
        // Create the spin container
        const spinContainer = document.createElement('div');
        spinContainer.className = 'spin-container';
        
        // Add spin indicator
        const spinIndicator = document.createElement('div');
        spinIndicator.className = 'spin-indicator';
        spinContainer.appendChild(spinIndicator);
        
        // Create the items container
        const spinItemsContainer = document.createElement('div');
        spinItemsContainer.className = 'spin-items';
        
        // Add all spin items
        spinItems.forEach(item => {
            const spinItem = document.createElement('div');
            spinItem.className = `spin-item item-border-${item.rarity}`;
            
            const itemImage = document.createElement('img');
            itemImage.className = 'spin-item-image';
            itemImage.src = item.image;
            itemImage.alt = item.name;
            
            const itemName = document.createElement('div');
            itemName.className = `spin-item-name ${item.rarity}`;
            itemName.textContent = item.name;
            
            // Add price display
            const itemPrice = document.createElement('div');
            itemPrice.className = 'spin-item-price';
            itemPrice.textContent = item.price;
            
            spinItem.appendChild(itemImage);
            spinItem.appendChild(itemName);
            spinItem.appendChild(itemPrice);
            
            // Add the item-loss class to the losing item if applicable
            if (item.isLoss) {
                spinItem.classList.add('item-loss');
            }
            
            spinItemsContainer.appendChild(spinItem);
        });
        
        spinContainer.appendChild(spinItemsContainer);
        
        // Create result container (initially hidden)
        const spinResult = document.createElement('div');
        spinResult.className = 'spin-result';
        
        // Add result content based on win/loss
        if (isWin) {
            spinResult.innerHTML = `
                <div class="result-title">You Won!</div>
                <div class="result-weapon">
                    <img src="${winningItem.image}" alt="${winningItem.name}">
                    <div class="result-name ${winningItem.rarity}">${winningItem.name}</div>
                    <div class="result-price">${winningItem.price}</div>
                </div>
                <p>Congratulations! What would you like to do with your new item?</p>
                <div class="result-actions">
                    <button class="result-btn result-btn-sell">Sell for ${winningItem.price}</button>
                    <button class="result-btn result-btn-keep">Keep in Inventory</button>
                </div>
            `;
        } else {
            spinResult.innerHTML = `
                <div class="result-title">Bad Luck!</div>
                <div class="result-weapon result-empty">
                    <img src="${winningItem.image}" alt="No Item">
                    <div class="result-name">No Item</div>
                    <div class="result-price">$0.00</div>
                </div>
                <p>Better luck next time! Try a different case.</p>
                <div class="result-actions">
                    <button class="result-btn result-btn-try-again">Try Again</button>
                </div>
            `;
        }
        
        // Assemble elements
        content.appendChild(closeBtn);
        content.appendChild(title);
        content.appendChild(spinContainer);
        content.appendChild(spinResult);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        // Close button functionality
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Add result button functionality
        setTimeout(() => {
            if (isWin) {
                const sellBtn = spinResult.querySelector('.result-btn-sell');
                const keepBtn = spinResult.querySelector('.result-btn-keep');
                
                if (sellBtn) {
                    sellBtn.addEventListener('click', function() {
                        // Add the item price to the user's balance
                        const itemPrice = parseFloat(winningItem.price.replace('$', '').replace(',', ''));
                        const currentBalance = parseFloat(currentUser.balance.replace('$', ''));
                        const newBalance = (currentBalance + itemPrice).toFixed(2);
                        currentUser.balance = `$${newBalance}`;
                        
                        // Save to localStorage
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        
                        // Update UI to reflect new balance
                        updateUserInterface();
                        
                        // Create a styled notification instead of using alert
                        const notification = document.createElement('div');
                        notification.className = 'item-sold-notification';
                        notification.innerHTML = `
                            <div class="notification-content">
                                <div class="notification-text">Item sold for ${winningItem.price}! New balance: $${newBalance}</div>
                                <button class="notification-button">OK</button>
                            </div>
                        `;
                        document.body.appendChild(notification);
                        
                        // Add button functionality
                        const okButton = notification.querySelector('.notification-button');
                        okButton.addEventListener('click', function() {
                            document.body.removeChild(notification);
                        });
                        
                        // Auto-remove after 5 seconds
                        setTimeout(() => {
                            if (document.body.contains(notification)) {
                                document.body.removeChild(notification);
                            }
                        }, 5000);
                        
                        document.body.removeChild(overlay);
                    });
                }
                
                if (keepBtn) {
                    keepBtn.addEventListener('click', function() {
                        // Add the item to the user's inventory
                        userInventory.push({
                            id: Date.now(),
                            name: winningItem.name,
                            price: winningItem.price,
                            rarity: winningItem.rarity,
                            image: winningItem.image,
                            timestamp: new Date().toLocaleString()
                        });
                        
                        // Save to localStorage
                        localStorage.setItem('userInventory', JSON.stringify(userInventory));
                        
                        // Create a styled notification instead of using alert
                        const notification = document.createElement('div');
                        notification.className = 'item-sold-notification';
                        notification.innerHTML = `
                            <div class="notification-content">
                                <div class="notification-text">Item added to your inventory!</div>
                                <button class="notification-button">OK</button>
                            </div>
                        `;
                        document.body.appendChild(notification);
                        
                        // Add button functionality
                        const okButton = notification.querySelector('.notification-button');
                        okButton.addEventListener('click', function() {
                            document.body.removeChild(notification);
                        });
                        
                        // Auto-remove after 5 seconds
                        setTimeout(() => {
                            if (document.body.contains(notification)) {
                                document.body.removeChild(notification);
                            }
                        }, 5000);
                        
                        document.body.removeChild(overlay);
                    });
                }
            } else {
                // For the "Try Again" button in case of a loss
                const tryAgainBtn = spinResult.querySelector('.result-btn-try-again');
                if (tryAgainBtn) {
                    tryAgainBtn.addEventListener('click', function() {
                        document.body.removeChild(overlay);
                        // Reopen the case by clicking on a case button
                        const caseButtons = document.querySelectorAll('.open-case-btn');
                        if (caseButtons.length > 0) {
                            caseButtons[0].click();
                        }
                    });
                }
            }
        }, 100);
        
        // Start the animation after a small delay
        setTimeout(() => {
            const itemWidth = 170; // width of each item + margin
            
            // Calculate the target position to center the winning item
            const targetPosition = -(winningPosition * itemWidth - content.offsetWidth / 2 + itemWidth / 2);
            
            // Set the transform to animate the spin
            spinItemsContainer.style.transform = `translateX(${targetPosition}px)`;
            
            // Show the result after the spin animation completes
            setTimeout(() => {
                spinResult.style.display = 'block';
                title.textContent = isWin ? 'You Won!' : 'Bad Luck!';
            }, 8000); // match this to the CSS transition duration
        }, 500);
    }
    
    // Show Upgrade Modal Function
    function showUpgradeModal() {
        const upgradeModal = document.getElementById('upgrade-modal');
        
        if (!upgradeModal) {
            console.error('Upgrade modal element not found');
            return;
        }
        
        // Display the modal
        upgradeModal.style.display = 'flex';
        
        // Setup close button
        const closeBtn = upgradeModal.querySelector('.upgrade-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                upgradeModal.style.display = 'none';
            });
        }
        
        // Setup tabs
        const tabs = upgradeModal.querySelectorAll('.upgrade-tab');
        if (tabs.length > 0) {
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Handle tab change logic
                    const tabName = this.dataset.tab;
                    if (tabName === 'contract') {
                        alert('Trade Up Contract feature will be implemented soon!');
                        tabs.forEach(t => {
                            if (t.dataset.tab === 'upgrade') {
                                t.classList.add('active');
                            } else {
                                t.classList.remove('active');
                            }
                        });
                    }
                });
            });
        }
        
        // Populate inventory items
        populateUpgradeInventory();
        
        // Populate target items
        populateUpgradeTargets();
        
        // Setup price and rarity filters
        const priceFilter = document.getElementById('upgrade-price-filter');
        const rarityFilter = document.getElementById('upgrade-rarity-filter');
        
        if (priceFilter) {
            priceFilter.addEventListener('change', populateUpgradeTargets);
        }
        
        if (rarityFilter) {
            rarityFilter.addEventListener('change', populateUpgradeTargets);
        }
        
        // Setup upgrade button (the new circle button)
        const startUpgradeBtn = document.getElementById('start-upgrade-btn');
        if (startUpgradeBtn) {
            startUpgradeBtn.addEventListener('click', performUpgrade);
        }
        
        // Initialize circle
        updateUpgradeChance();
        
        // Reset result container
        const resultContainer = document.getElementById('upgrade-result');
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
    }
    
    // Populate Upgrade Inventory
    function populateUpgradeInventory() {
        const inventoryContainer = document.getElementById('upgrade-inventory-items');
        
        if (!inventoryContainer) {
            console.error('Inventory container not found');
            return;
        }
        
        // Clear container
        inventoryContainer.innerHTML = '';
        
        // Check if user has items
        if (userInventory.length === 0) {
            inventoryContainer.innerHTML = `
                <div class="no-items-message">
                    You don't have any items in your inventory.
                    Open cases to get some items first!
                </div>
            `;
            return;
        }
        
        // Add items to container
        userInventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `inventory-item item-border-${item.rarity}`;
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <img class="item-image" src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-name ${item.rarity}">${item.name}</div>
                    <div class="item-price">${item.price}</div>
                    <div class="item-rarity">${item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}</div>
                </div>
            `;
            
            // Add selection functionality
            itemElement.addEventListener('click', function() {
                // Remove selection from all inventory items
                const allItems = inventoryContainer.querySelectorAll('.inventory-item');
                allItems.forEach(i => i.classList.remove('selected'));
                
                // Add selection to clicked item
                this.classList.add('selected');
                
                // Store selected item for upgrade
                window.selectedUpgradeItem = item;
                
                // Update chance and value difference
                updateUpgradeChance();
            });
            
            inventoryContainer.appendChild(itemElement);
        });
    }
    
    // Populate Upgrade Targets
    function populateUpgradeTargets() {
        const targetContainer = document.getElementById('upgrade-target-items');
        
        if (!targetContainer) {
            console.error('Target container not found');
            return;
        }
        
        // Clear container
        targetContainer.innerHTML = '';
        
        // Get all items (in a real app, this would come from the server)
        const allItems = [
            { id: 101, name: 'AWP | Dragon Lore (Factory New)', price: '$1,850.42', rarity: 'legendary', image: 'images/skins/awp/dragon_lore.png' },
            { id: 102, name: 'Karambit | Fade (Factory New)', price: '$1,245.89', rarity: 'legendary', image: 'images/skins/knife/karambit_doppler.png' },
            { id: 103, name: 'M4A4 | Howl (Minimal Wear)', price: '$985.65', rarity: 'legendary', image: 'images/skins/m4a4/howl.png' },
            { id: 104, name: 'AK-47 | Fire Serpent (Field-Tested)', price: '$745.20', rarity: 'rare', image: 'images/skins/ak47/fire_serpent.png' },
            { id: 105, name: 'Butterfly Knife | Doppler (Factory New)', price: '$1,320.75', rarity: 'legendary', image: 'images/skins/knife/butterfly_fade.png' },
            { id: 106, name: 'USP-S | Kill Confirmed (Minimal Wear)', price: '$152.67', rarity: 'mythical', image: 'images/skins/awp/neo_noir.png' },
            { id: 107, name: 'Glock-18 | Fade (Factory New)', price: '$786.32', rarity: 'mythical', image: 'images/skins/m4a4/neo_noir.png' },
            { id: 108, name: 'Desert Eagle | Blaze (Factory New)', price: '$430.18', rarity: 'mythical', image: 'images/skins/awp/wildfire.png' },
            { id: 109, name: 'P250 | Muertos (Field-Tested)', price: '$3.42', rarity: 'uncommon', image: 'images/skins/ak47/neon_rider.png' },
            { id: 110, name: 'Five-SeveN | Monkey Business (Well-Worn)', price: '$5.73', rarity: 'uncommon', image: 'images/skins/ak47/bloodsport.png' },
            { id: 111, name: 'MP9 | Rose Iron (Factory New)', price: '$2.84', rarity: 'common', image: 'images/skins/mp9/rose_iron.png' },
            { id: 112, name: 'Sawed-Off | The Kraken (Minimal Wear)', price: '$4.21', rarity: 'uncommon', image: 'images/skins/p90/asiimov.png' },
            { id: 113, name: 'Nova | Hyper Beast (Field-Tested)', price: '$3.67', rarity: 'uncommon', image: 'images/skins/m4a4/asiimov.png' },
            { id: 114, name: 'P90 | Asiimov (Minimal Wear)', price: '$14.32', rarity: 'rare', image: 'images/skins/p90/asiimov.png' },
            { id: 115, name: 'MAC-10 | Neon Rider (Factory New)', price: '$8.65', rarity: 'rare', image: 'images/skins/ak47/neon_rider.png' }
        ];
        
        // Get filter values
        const priceFilter = document.getElementById('upgrade-price-filter').value;
        const rarityFilter = document.getElementById('upgrade-rarity-filter').value;
        
        // Filter items based on user selection
        let filteredItems = allItems;
        
        // Apply price filter
        if (priceFilter !== 'any') {
            filteredItems = filteredItems.filter(item => {
                const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                
                if (priceFilter === 'low') {
                    return price >= 1 && price <= 50;
                } else if (priceFilter === 'mid') {
                    return price > 50 && price <= 500;
                } else if (priceFilter === 'high') {
                    return price > 500;
                }
                
                return true;
            });
        }
        
        // Apply rarity filter
        if (rarityFilter !== 'any') {
            filteredItems = filteredItems.filter(item => item.rarity === rarityFilter);
        }
        
        // Get the selected inventory item price for filtering
        let selectedItemPrice = 0;
        if (window.selectedUpgradeItem) {
            selectedItemPrice = parseFloat(window.selectedUpgradeItem.price.replace('$', '').replace(',', ''));
            
            // Only show items that are more expensive than the selected item
            filteredItems = filteredItems.filter(item => {
                const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                return price > selectedItemPrice;
            });
        }
        
        // Check if any items match the filters
        if (filteredItems.length === 0) {
            targetContainer.innerHTML = `
                <div class="no-items-message">
                    No items match your current filters. Try adjusting your filter settings.
                </div>
            `;
            return;
        }
        
        // Add items to container
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `upgrade-target item-border-${item.rarity}`;
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <img class="item-image" src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-name ${item.rarity}">${item.name}</div>
                    <div class="item-price">${item.price}</div>
                    <div class="item-rarity">${item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}</div>
                </div>
            `;
            
            // Add selection functionality
            itemElement.addEventListener('click', function() {
                // Remove selection from all target items
                const allTargets = targetContainer.querySelectorAll('.upgrade-target');
                allTargets.forEach(i => i.classList.remove('selected'));
                
                // Add selection to clicked item
                this.classList.add('selected');
                
                // Store selected target for upgrade
                window.selectedUpgradeTarget = item;
                
                // Update chance and value difference
                updateUpgradeChance();
            });
            
            targetContainer.appendChild(itemElement);
        });
    }
    
    // Update Upgrade Chance
    function updateUpgradeChance() {
        const startUpgradeBtn = document.getElementById('start-upgrade-btn');
        const valueDiff = document.getElementById('value-diff');
        const circlePercentage = document.getElementById('upgrade-circle-percentage');
        const circleSlice = document.getElementById('upgrade-circle-slice');
        
        // Disable button by default
        if (startUpgradeBtn) {
            startUpgradeBtn.disabled = true;
        }
        
        // Return if either item is not selected
        if (!window.selectedUpgradeItem || !window.selectedUpgradeTarget) {
            if (circlePercentage) {
                circlePercentage.textContent = '0%';
            }
            if (valueDiff) {
                valueDiff.textContent = '$0.00';
            }
            
            // Reset circle
            if (circleSlice) {
                circleSlice.style.transform = 'rotate(0deg)';
                circleSlice.style.display = 'none';
            }
            
            return;
        }
        
        // Calculate values
        const itemPrice = parseFloat(window.selectedUpgradeItem.price.replace('$', '').replace(',', ''));
        const targetPrice = parseFloat(window.selectedUpgradeTarget.price.replace('$', '').replace(',', ''));
        
        // Calculate value difference
        const difference = targetPrice - itemPrice;
        if (valueDiff) {
            valueDiff.textContent = `$${difference.toFixed(2)}`;
        }
        
        // Calculate success chance (inverse relationship with price difference)
        // Formula: chance = (item_price / target_price) * adjustment_factor
        // This gives higher chance for smaller price gaps
        const adjustmentFactor = 100;
        let chance = (itemPrice / targetPrice) * adjustmentFactor;
        
        // Limit chance between 1% and 95%
        chance = Math.max(1, Math.min(95, chance));
        
        // Round to 1 decimal place
        chance = Math.round(chance * 10) / 10;
        
        // Update circle display
        if (circlePercentage) {
            circlePercentage.textContent = `${chance}%`;
        }
        
        // Update circle slice (green area) based on chance
        if (circleSlice) {
            // Calculate degrees for the slice (chance% of 360 degrees)
            const degrees = (chance / 100) * 360;
            
            // For a full circle we need two slices, but for less than 50% we only need one
            if (chance <= 50) {
                // Simple case: just rotate the slice by the appropriate amount
                circleSlice.style.transform = `rotate(${degrees}deg)`;
                circleSlice.style.display = 'block';
            } else {
                // For > 50%, we set the first slice to cover half the circle (180 degrees)
                // and create or update a second slice for the remainder
                circleSlice.style.transform = `rotate(180deg)`;
                
                // Check if second slice exists, create if not
                let secondSlice = document.getElementById('upgrade-circle-slice-2');
                if (!secondSlice) {
                    secondSlice = document.createElement('div');
                    secondSlice.id = 'upgrade-circle-slice-2';
                    secondSlice.className = 'upgrade-circle-slice';
                    circleSlice.parentNode.appendChild(secondSlice);
                }
                
                // The second slice needs different transformations
                secondSlice.style.transform = `rotate(${degrees - 180}deg)`;
                secondSlice.style.display = 'block';
                
                // Adjust the second slice positioning
                secondSlice.style.transformOrigin = 'left bottom';
                secondSlice.style.left = '50%';
                secondSlice.style.top = '50%';
                secondSlice.style.zIndex = '1';
            }
        }
        
        // Enable button
        if (startUpgradeBtn) {
            startUpgradeBtn.disabled = false;
        }
    }
    
    // Perform Upgrade with Circle Animation
    function performUpgrade() {
        // Return if either item is not selected
        if (!window.selectedUpgradeItem || !window.selectedUpgradeTarget) {
            alert('You need to select both an item from your inventory and a target item.');
            return;
        }
        
        // Get upgrade chance from circle percentage
        const circlePercentage = document.getElementById('upgrade-circle-percentage');
        const chance = parseFloat(circlePercentage.textContent.replace('%', ''));
        
        // Get circle elements
        const upgradeCircle = document.querySelector('.upgrade-circle');
        const indicator = document.getElementById('upgrade-circle-indicator');
        const startBtn = document.getElementById('start-upgrade-btn');
        
        // Disable the start button during animation
        if (startBtn) {
            startBtn.disabled = true;
        }
        
        // Stop existing animation if any
        if (indicator) {
            // Remove existing animation
            indicator.style.animation = 'none';
            
            // Force a reflow to ensure animation restart
            void indicator.offsetWidth;
            
            // Start a quicker animation for the upgrade process
            indicator.style.animation = 'rotate-indicator 3s linear forwards';
        }
        
        // Generate random angle for the indicator to stop at (0-359 degrees)
        const randomAngle = Math.floor(Math.random() * 360);
        const winZoneStart = 0;
        const winZoneEnd = Math.max(10, (chance / 100) * 360); // Ensure at least 10 degrees (minimum chance)
        
        // Determine if the upgrade is successful based on whether the random angle falls within the green zone
        const success = randomAngle >= winZoneStart && randomAngle <= winZoneEnd;
        
        // Create a visual animation of the circle spinner
        setTimeout(() => {
            // Stop the animation
            if (indicator) {
                indicator.style.animation = 'none';
                // Position the indicator at the final position
                indicator.style.transform = `rotate(${randomAngle}deg)`;
            }
            
            // Add win/lose animation to the circle
            if (upgradeCircle) {
                upgradeCircle.classList.add(success ? 'win-animation' : 'lose-animation');
            }
            
            // Show result after a short delay
            setTimeout(() => {
                showUpgradeResult(success);
                
                // Remove the animation class after it completes
                if (upgradeCircle) {
                    upgradeCircle.classList.remove('win-animation', 'lose-animation');
                }
            }, 1000);
        }, 3000); // Match this to the animation duration
    }
    
    // Show Upgrade Result
    function showUpgradeResult(success) {
        // Get result container
        const resultContainer = document.getElementById('upgrade-result');
        if (!resultContainer) return;
        
        // Create div for item disappear animation if failure
        let disappearingItemDiv = null;
        if (!success) {
            // Create a copy of the inventory item for the disappear animation
            const selectedItemElement = document.querySelector('.inventory-item.selected');
            if (selectedItemElement) {
                disappearingItemDiv = selectedItemElement.cloneNode(true);
                disappearingItemDiv.style.position = 'absolute';
                disappearingItemDiv.style.top = `${selectedItemElement.offsetTop}px`;
                disappearingItemDiv.style.left = `${selectedItemElement.offsetLeft}px`;
                disappearingItemDiv.style.zIndex = '1000';
                disappearingItemDiv.style.animation = 'item-disappear 1s forwards';
                
                // Add to document
                document.querySelector('.upgrade-inventory-items').appendChild(disappearingItemDiv);
            }
        }
        
        // Show result
        resultContainer.style.display = 'flex';
        resultContainer.className = 'upgrade-result fade-in ' + (success ? 'result-success' : 'result-failure');
        
        if (success) {
            // Successful upgrade
            resultContainer.innerHTML = `
                <div class="result-title">Upgrade Successful!</div>
                <div class="result-item">
                    <img src="${window.selectedUpgradeTarget.image}" alt="${window.selectedUpgradeTarget.name}">
                    <div class="result-name ${window.selectedUpgradeTarget.rarity}">${window.selectedUpgradeTarget.name}</div>
                    <div class="result-price">${window.selectedUpgradeTarget.price}</div>
                </div>
                <p>Congratulations! The upgrade was successful!</p>
                <button class="upgrade-circle-button" onclick="document.getElementById('upgrade-result').style.display='none';">Continue</button>
            `;
            
            // Remove old item from inventory
            userInventory = userInventory.filter(item => item.id !== window.selectedUpgradeItem.id);
            
            // Add new item to inventory
            userInventory.push({
                id: Date.now(),
                name: window.selectedUpgradeTarget.name,
                price: window.selectedUpgradeTarget.price,
                rarity: window.selectedUpgradeTarget.rarity,
                image: window.selectedUpgradeTarget.image,
                timestamp: new Date().toLocaleString()
            });
            
            // Save to localStorage
            localStorage.setItem('userInventory', JSON.stringify(userInventory));
            
        } else {
            // Failed upgrade
            resultContainer.innerHTML = `
                <div class="result-title">Upgrade Failed!</div>
                <div class="result-item">
                    <img src="${window.selectedUpgradeItem.image}" alt="${window.selectedUpgradeItem.name}">
                    <div class="result-name ${window.selectedUpgradeItem.rarity}">${window.selectedUpgradeItem.name}</div>
                    <div class="result-price">${window.selectedUpgradeItem.price}</div>
                </div>
                <p>Unfortunately, the upgrade failed and you lost your item.</p>
                <button class="upgrade-circle-button" onclick="document.getElementById('upgrade-result').style.display='none';">Continue</button>
            `;
            
            // Remove old item from inventory
            userInventory = userInventory.filter(item => item.id !== window.selectedUpgradeItem.id);
            
            // Save to localStorage
            localStorage.setItem('userInventory', JSON.stringify(userInventory));
        }
        
        // Refresh inventory
        populateUpgradeInventory();
        
        // Clear selections
        window.selectedUpgradeItem = null;
        window.selectedUpgradeTarget = null;
        
        // Update chance display
        updateUpgradeChance();
        
        // Remove disappearing item div after animation completes
        if (disappearingItemDiv) {
            setTimeout(() => {
                if (disappearingItemDiv.parentNode) {
                    disappearingItemDiv.parentNode.removeChild(disappearingItemDiv);
                }
            }, 1000); // Match to animation duration
        }
        
        // Re-enable start button
        const startBtn = document.getElementById('start-upgrade-btn');
        if (startBtn) {
            startBtn.disabled = true;
        }
    }
    
    // Show Battles Modal Function
    function showBattlesModal() {
        const battlesModal = document.getElementById('battles-modal');
        
        if (!battlesModal) {
            console.error('Battles modal element not found');
            return;
        }
        
        // Display the modal
        battlesModal.style.display = 'flex';
        
        // Setup close button
        const closeBtn = battlesModal.querySelector('.battles-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                battlesModal.style.display = 'none';
            });
        }
        
        // Setup tabs
        const tabs = battlesModal.querySelectorAll('.battles-tab');
        const tabContents = battlesModal.querySelectorAll('.battles-content');
        
        if (tabs.length > 0) {
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Show corresponding content
                    const tabName = this.getAttribute('data-tab');
                    tabContents.forEach(content => {
                        if (content.getAttribute('data-content') === tabName) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        }
        
        // Setup Join Battle buttons
        const joinBattleButtons = battlesModal.querySelectorAll('.battle-join-btn:not(.disabled)');
        if (joinBattleButtons.length > 0) {
            joinBattleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Get battle card
                    const battleCard = this.closest('.battle-card');
                    if (!battleCard) return;
                    
                    // Get battle info
                    const battleName = battleCard.querySelector('.battle-name').textContent;
                    const battleValue = battleCard.querySelector('.battle-value').textContent;
                    
                    // Close battles modal
                    battlesModal.style.display = 'none';
                    
                    // Show battle room
                    showBattleRoom(battleName, battleValue);
                });
            });
        }
        
        // Setup Create Battle section
        setupCreateBattleSection();
        
        // Check if user has any battles
        populateMyBattles();
    }
    
    // Setup Create Battle Section
    function setupCreateBattleSection() {
        const createBattleForm = document.querySelector('.create-battle-form');
        if (!createBattleForm) return;
        
        // Player count options
        const playerCountOptions = createBattleForm.querySelectorAll('.player-count-option');
        playerCountOptions.forEach(option => {
            option.addEventListener('click', function() {
                playerCountOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                updateBattleCost();
            });
        });
        
        // Case selection
        const battleCases = createBattleForm.querySelectorAll('.create-battle-case');
        battleCases.forEach(battleCase => {
            battleCase.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateBattleCost();
            });
        });
        
        // Add bots checkbox
        const addBotsCheckbox = document.getElementById('add-bots');
        if (addBotsCheckbox) {
            addBotsCheckbox.addEventListener('change', updateCreateBattleButton);
        }
        
        // Battle name input
        const battleNameInput = document.getElementById('battle-name');
        if (battleNameInput) {
            battleNameInput.addEventListener('input', updateCreateBattleButton);
        }
        
        // Create battle button
        const createBattleBtn = createBattleForm.querySelector('.create-battle-btn');
        if (createBattleBtn) {
            createBattleBtn.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return;
                
                // Get battle info
                const battleName = document.getElementById('battle-name').value;
                const costValue = document.querySelector('.cost-value').textContent;
                
                // Check if user has enough balance
                const cost = parseFloat(costValue.replace('$', '').trim());
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                
                if (currentBalance < cost) {
                    alert(`You don't have enough balance to create this battle. You need ${costValue} but you only have ${currentUser.balance}.`);
                    return;
                }
                
                // Deduct cost from balance
                const newBalance = (currentBalance - cost).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI to reflect new balance
                updateUserInterface();
                
                // Close battles modal
                document.getElementById('battles-modal').style.display = 'none';
                
                // Show battle room
                showBattleRoom(battleName, costValue, true);
            });
        }
        
        // Initial update
        updateBattleCost();
        updateCreateBattleButton();
    }
    
    // Update Battle Cost
    function updateBattleCost() {
        const selectedCases = document.querySelectorAll('.create-battle-case.selected');
        const playerCount = document.querySelector('.player-count-option.selected').getAttribute('data-count');
        
        let totalCost = 0;
        
        selectedCases.forEach(caseItem => {
            const priceText = caseItem.querySelector('.create-case-price').textContent;
            const price = parseFloat(priceText.replace('$', '').trim());
            totalCost += price;
        });
        
        // Update cost display
        const costValue = document.querySelector('.cost-value');
        if (costValue) {
            costValue.textContent = `$${totalCost.toFixed(2)}`;
        }
        
        // Update create button state
        updateCreateBattleButton();
    }
    
    // Update Create Battle Button
    function updateCreateBattleButton() {
        const createBattleBtn = document.querySelector('.create-battle-btn');
        const battleNameInput = document.getElementById('battle-name');
        const selectedCases = document.querySelectorAll('.create-battle-case.selected');
        
        if (!createBattleBtn || !battleNameInput) return;
        
        // Enable button if name is provided and at least one case is selected
        if (battleNameInput.value.trim() !== '' && selectedCases.length > 0) {
            createBattleBtn.classList.remove('disabled');
        } else {
            createBattleBtn.classList.add('disabled');
        }
    }
    
    // Populate My Battles
    function populateMyBattles() {
        const myBattlesList = document.getElementById('my-battles-list');
        if (!myBattlesList) return;
        
        // Clear list
        myBattlesList.innerHTML = '';
        
        // Check if user has any battles
        // For demo, we'll just show the no battles message
        myBattlesList.innerHTML = `
            <div class="no-battles-message">
                You haven't created or joined any battles yet. Create one or join an existing battle!
            </div>
        `;
    }
    
    // Show Battle Room
    function showBattleRoom(battleName, battleValue, isCreator = false) {
        const battleRoom = document.getElementById('battle-room');
        if (!battleRoom) {
            console.error('Battle room element not found');
            return;
        }
        
        // Display the battle room
        battleRoom.style.display = 'flex';
        
        // Set battle info
        const roomTitle = battleRoom.querySelector('.battle-room-title');
        const roomValue = battleRoom.querySelector('.battle-room-value');
        
        if (roomTitle) roomTitle.textContent = battleName;
        if (roomValue) roomValue.textContent = `Total Value: ${battleValue}`;
        
        // Setup close button
        const closeBtn = battleRoom.querySelector('.battle-room-close');
        if (closeBtn) {
            // Create a handler function
            const closeBtnHandler = () => {
                battleRoom.style.display = 'none';
            };
            
            // Clone the button to remove all existing event listeners
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            // Add the event listener to the new button
            newCloseBtn.addEventListener('click', closeBtnHandler);
        }
        
        // Setup start and leave battle buttons
        const startBattleBtn = battleRoom.querySelector('.start-battle-btn');
        const leaveBattleBtn = battleRoom.querySelector('.leave-battle-btn');
        
        if (startBattleBtn) {
            // First remove any existing event listeners to prevent duplicates
            startBattleBtn.removeEventListener('click', startBattle);
            
            // Only enable start button for creator
            if (isCreator) {
                startBattleBtn.disabled = false;
                startBattleBtn.addEventListener('click', startBattle);
            } else {
                startBattleBtn.disabled = true;
            }
        }
        
        if (leaveBattleBtn) {
            // First remove any existing event listeners to prevent duplicates
            const leaveBattleHandler = () => {
                battleRoom.style.display = 'none';
            };
            
            // We need to clone the button to remove all event listeners
            const newLeaveBattleBtn = leaveBattleBtn.cloneNode(true);
            leaveBattleBtn.parentNode.replaceChild(newLeaveBattleBtn, leaveBattleBtn);
            
            // Add the event listener to the new button
            newLeaveBattleBtn.addEventListener('click', leaveBattleHandler);
        }
    }
    
    // Start Battle
    function startBattle() {
        // Hide waiting status
        const waitingStatus = document.getElementById('battle-waiting');
        if (waitingStatus) {
            waitingStatus.style.display = 'none';
        }
        
        // Show loading
        const battleArea = document.querySelector('.battle-area');
        if (battleArea) {
            const loadingEl = document.createElement('div');
            loadingEl.className = 'loading-spinner';
            battleArea.appendChild(loadingEl);
            
            // Simulate battle rounds
            setTimeout(() => {
                // Remove loading
                battleArea.removeChild(loadingEl);
                
                // Create rounds
                createBattleRounds();
                
                // Show result after some delay
                setTimeout(showBattleResult, 3000);
            }, 2000);
        }
    }
    
    // The battleItems array is now defined globally
    
    // Create Battle Rounds
    function createBattleRounds() {
        const roundsContainer = document.querySelector('.battle-rounds');
        if (!roundsContainer) return;
        
        // Clear container
        roundsContainer.innerHTML = '';
        
        // Create rounds
        for (let i = 1; i <= 3; i++) {
            // Create round element
            const roundEl = document.createElement('div');
            roundEl.className = 'battle-round';
            
            // Add round header
            const headerEl = document.createElement('div');
            headerEl.className = 'round-header';
            headerEl.innerHTML = `
                <div>Round ${i}</div>
                <div class="round-case">
                    <img src="images/case${i}.svg" alt="Case">
                    <div>${i === 1 ? 'Premium Case' : i === 2 ? 'Knife Case' : 'AWP Case'}</div>
                </div>
            `;
            
            // Add round items
            const itemsEl = document.createElement('div');
            itemsEl.className = 'round-items';
            
            // Add 4 random items
            const players = ['You', 'KnifeCollector'];
            let playerItems = {};
            players.forEach(player => playerItems[player] = []);
            
            for (let j = 0; j < 4; j++) {
                // Get random item
                const randomIndex = Math.floor(Math.random() * battleItems.length);
                const item = battleItems[randomIndex];
                
                // Create item element
                const itemEl = document.createElement('div');
                itemEl.className = 'round-item';
                
                // Assign random winner
                const winner = players[Math.floor(Math.random() * players.length)];
                
                // Store item for calculating total
                const itemPrice = parseFloat(item.price.replace('$', '').replace(',', ''));
                playerItems[winner].push(itemPrice);
                
                // Add item content
                itemEl.innerHTML = `
                    <div class="round-item-inner item-border-${item.rarity}">
                        <img src="${item.image}" alt="${item.name}" class="round-item-image">
                        <div class="item-details">
                            <div class="item-name ${item.rarity}">${item.name}</div>
                            <div class="item-price">${item.price}</div>
                        </div>
                        <div class="item-winner">
                            <img src="images/${winner === 'You' ? 'avatar1.svg' : 'avatar2.svg'}" class="winner-avatar" alt="${winner}">
                        </div>
                    </div>
                `;
                
                // Add item to round
                itemsEl.appendChild(itemEl);
                
                // If this is the last round, update player winnings
                if (i === 3) {
                    // Get winner avatar and add item to their winnings
                    const winnerAvatar = winner === 'You' ? 'avatar1.svg' : 'avatar2.svg';
                    const winnerEl = document.querySelector(`.battle-participant img[src*="${winnerAvatar}"]`).closest('.battle-participant');
                    const winningItemsEl = winnerEl.querySelector('.winning-items');
                    
                    if (winningItemsEl) {
                        const winningItemEl = document.createElement('div');
                        winningItemEl.className = 'winning-item';
                        winningItemEl.innerHTML = `
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-price">${item.price}</div>
                        `;
                        winningItemsEl.appendChild(winningItemEl);
                    }
                }
            }
            
            // Add items to round
            roundEl.appendChild(headerEl);
            roundEl.appendChild(itemsEl);
            
            // Add round to container
            roundsContainer.appendChild(roundEl);
            
            // Update player totals after each round
            players.forEach(player => {
                const total = playerItems[player].reduce((sum, price) => sum + price, 0);
                const avatarSrc = player === 'You' ? 'avatar1.svg' : 'avatar2.svg';
                const playerEl = document.querySelector(`.battle-participant img[src*="${avatarSrc}"]`).closest('.battle-participant');
                const totalEl = playerEl.querySelector('.player-total');
                
                if (totalEl) {
                    totalEl.textContent = `Total: $${total.toFixed(2)}`;
                }
                
                const winningsTitle = playerEl.querySelector('.winnings-title');
                if (winningsTitle) {
                    winningsTitle.textContent = `Winnings: $${total.toFixed(2)}`;
                }
            });
        }
    }
    
    // Show Battle Result

    function showBattleResult() {
        const battleResultEl = document.getElementById('battle-result');
        if (!battleResultEl) return;
        
        // Get player totals
        const players = document.querySelectorAll('.battle-participant');
        let highestTotal = -1;
        let winner = null;
        
        players.forEach(player => {
            const totalText = player.querySelector('.player-total').textContent;
            const total = parseFloat(totalText.replace('Total: $', ''));
            
            if (total > highestTotal) {
                highestTotal = total;
                winner = player;
            }
        });
        
        // Check if player won
        const isPlayerWinner = winner && winner.classList.contains('you');
        
        // Update battle result
        battleResultEl.innerHTML = `
            <div class="result-title ${isPlayerWinner ? 'win' : 'lose'}">
                ${isPlayerWinner ? 'You Won!' : 'You Lost!'}
            </div>
            <div class="winner-info">
                <img src="${isPlayerWinner ? 'images/avatar1.svg' : 'images/avatar2.svg'}" class="winner-avatar-lg" alt="Winner">
                <div>
                    <div class="winner-name">${isPlayerWinner ? 'You' : 'KnifeCollector'}</div>
                    <div class="winner-prize">${winner.querySelector('.player-total').textContent.replace('Total', 'Prize')}</div>
                </div>
            </div>
            <div class="battle-controls">
                <button class="battle-control-btn leave-battle-btn">Back to Lobby</button>
            </div>
        `;
        
        // Display result
        battleResultEl.style.display = 'block';
        
        // Add event listener to back button
        const backBtn = battleResultEl.querySelector('.leave-battle-btn');
        if (backBtn) {
            // Create a handler function for the back button
            const backBtnHandler = () => {
                // Close battle room
                document.getElementById('battle-room').style.display = 'none';
                
                // If player won, add items to inventory
                if (isPlayerWinner) {
                    const items = winner.querySelectorAll('.winning-item');
                    
                    // Just for demo purposes, we'll add one random item to inventory
                    if (items.length > 0) {
                        const randomIndex = Math.floor(Math.random() * battleItems.length);
                        const randomItem = battleItems[randomIndex];
                        
                        userInventory.push({
                            id: Date.now(),
                            name: randomItem.name,
                            price: randomItem.price,
                            rarity: randomItem.rarity,
                            image: randomItem.image,
                            timestamp: new Date().toLocaleString()
                        });
                        
                        alert('You won! Items have been added to your inventory.');
                    }
                }
            };
            
            // Clone the button to remove all existing event listeners
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            
            // Add the event listener to the new button
            newBackBtn.addEventListener('click', backBtnHandler);
        }
    }
});

// Wheel of Fortune Game
let wheelCanvas;
let wheelCtx;
let wheelSegments = [];
let selectedMultiplier = 1.5;
let isWheelSpinning = false;
let wheelRotation = 0;
let wheelHistory = [];

// Function to show the wheel game
function showWheelGame() {
    const modal = document.getElementById('wheel-modal');
    modal.style.display = 'flex';
    
    // Update user balance in the wheel UI
    document.getElementById('wheel-user-balance').textContent = `$${currentUser.balance.toFixed(2)}`;
    
    // Set up event listeners if they haven't been set up yet
    setupWheelEventListeners();
}

// Initialize the wheel canvas
function initializeWheel() {
    wheelCanvas = document.getElementById('wheel-canvas');
    if (!wheelCanvas) return;
    
    wheelCtx = wheelCanvas.getContext('2d');
    
    // Define wheel segments with different colors and values
    wheelSegments = [
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#2ecc71', value: 1.2, label: '1.2x' },     // Green (small win)
        { color: '#3498db', value: 1.5, label: '1.5x' },     // Blue (medium win)
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#f1c40f', value: 2, label: '2x' },         // Yellow (good win)
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#3498db', value: 1.5, label: '1.5x' },     // Blue (medium win)
        { color: '#9b59b6', value: 3, label: '3x' },         // Purple (very good win)
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#2ecc71', value: 1.2, label: '1.2x' },     // Green (small win)
        { color: '#e67e22', value: 5, label: '5x' },         // Orange (excellent win)
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#3498db', value: 1.5, label: '1.5x' },     // Blue (medium win)
        { color: '#e74c3c', value: 0, label: 'LOSE' },       // Red (lose)
        { color: '#1abc9c', value: 10, label: '10x' },       // Turquoise (amazing win)
        { color: '#e74c3c', value: 0, label: 'LOSE' }        // Red (lose)
    ];
    
    // Extra rare segment (50x) that appears less frequently when multiplier is set to 50x
    if (selectedMultiplier === 50) {
        // Replace one segment with the 50x multiplier
        const randomIndex = Math.floor(Math.random() * wheelSegments.length);
        wheelSegments[randomIndex] = { color: '#8e44ad', value: 50, label: '50x' };
    }
    
    // Draw the initial wheel
    drawWheel();
    
    // Load history from localStorage
    loadWheelHistory();
}

// Set up event listeners for the wheel game
function setupWheelEventListeners() {
    // Close button
    document.getElementById('wheel-modal-close')?.addEventListener('click', function() {
        document.getElementById('wheel-modal').style.display = 'none';
    });
    
    // Bet input
    document.getElementById('wheel-bet-input')?.addEventListener('input', function() {
        const betValue = parseFloat(this.value);
        if (!isNaN(betValue) && betValue > 0) {
            document.getElementById('wheel-bet-value').textContent = betValue.toFixed(2);
        }
    });
    
    // Bet increase/decrease buttons
    document.getElementById('wheel-bet-increase')?.addEventListener('click', function() {
        const input = document.getElementById('wheel-bet-input');
        let value = parseFloat(input.value) || 0;
        value += 1;
        input.value = value;
        document.getElementById('wheel-bet-value').textContent = value.toFixed(2);
    });
    
    document.getElementById('wheel-bet-decrease')?.addEventListener('click', function() {
        const input = document.getElementById('wheel-bet-input');
        let value = parseFloat(input.value) || 0;
        value = Math.max(1, value - 1);
        input.value = value;
        document.getElementById('wheel-bet-value').textContent = value.toFixed(2);
    });
    
    // Bet presets
    document.querySelectorAll('.wheel-bet-preset').forEach(preset => {
        preset.addEventListener('click', function() {
            const value = parseFloat(this.dataset.value);
            document.getElementById('wheel-bet-input').value = value;
            document.getElementById('wheel-bet-value').textContent = value.toFixed(2);
        });
    });
    
    // Multiplier selection
    document.querySelectorAll('.wheel-multiplier').forEach(mult => {
        mult.addEventListener('click', function() {
            // Remove active class from all multipliers
            document.querySelectorAll('.wheel-multiplier').forEach(m => m.classList.remove('active'));
            
            // Add active class to the clicked multiplier
            this.classList.add('active');
            
            // Update the selected multiplier
            selectedMultiplier = parseFloat(this.dataset.multiplier);
            
            // Redraw the wheel with updated multipliers
            initializeWheel();
        });
    });
    
    // Spin button
    document.getElementById('wheel-spin-btn')?.addEventListener('click', spinWheel);
}

// Draw the wheel on the canvas
function drawWheel() {
    if (!wheelCtx) return;
    
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Draw wheel background
    wheelCtx.save();
    wheelCtx.translate(centerX, centerY);
    wheelCtx.rotate(wheelRotation);
    
    const segmentAngle = (2 * Math.PI) / wheelSegments.length;
    
    // Draw segments
    for (let i = 0; i < wheelSegments.length; i++) {
        const segment = wheelSegments[i];
        
        // Start a new path
        wheelCtx.beginPath();
        
        // Draw segment
        wheelCtx.moveTo(0, 0);
        wheelCtx.arc(0, 0, radius, i * segmentAngle, (i + 1) * segmentAngle);
        wheelCtx.closePath();
        
        // Fill segment
        wheelCtx.fillStyle = segment.color;
        wheelCtx.fill();
        
        // Draw text
        wheelCtx.save();
        wheelCtx.rotate(i * segmentAngle + segmentAngle / 2);
        wheelCtx.translate(radius / 2, 0);
        wheelCtx.rotate(Math.PI / 2);
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.font = 'bold 16px Arial';
        wheelCtx.textAlign = 'center';
        wheelCtx.fillText(segment.label, 0, 0);
        wheelCtx.restore();
    }
    
    // Draw center circle
    wheelCtx.beginPath();
    wheelCtx.arc(0, 0, 15, 0, 2 * Math.PI);
    wheelCtx.fillStyle = '#333';
    wheelCtx.fill();
    
    wheelCtx.restore();
}

// Show a notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'item-sold-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-text">${message}</div>
            <button class="notification-button">OK</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Add button functionality
    const okButton = notification.querySelector('.notification-button');
    okButton.addEventListener('click', function() {
        document.body.removeChild(notification);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Spin the wheel
function spinWheel() {
    if (isWheelSpinning) return;
    
    // Hide previous result if visible
    document.getElementById('wheel-result').style.display = 'none';
    
    // Get bet amount
    const betAmount = parseFloat(document.getElementById('wheel-bet-input').value);
    
    // Validate bet
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount.');
        return;
    }
    
    // Check if user has enough balance
    if (currentUser.balance < betAmount) {
        alert('Insufficient balance. Please add funds to your account.');
        return;
    }
    
    // Deduct bet from balance
    currentUser.balance -= betAmount;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInterface();
    
    // Update balance in wheel UI
    document.getElementById('wheel-user-balance').textContent = `$${currentUser.balance.toFixed(2)}`;
    
    // Set flag to prevent multiple spins
    isWheelSpinning = true;
    document.getElementById('wheel-spin-btn').disabled = true;
    
    // Randomize the result based on selected multiplier
    let winProbability = 0.4;  // Base probability: 40% chance to win
    
    // Adjust probability based on selected multiplier
    if (selectedMultiplier === 2) winProbability = 0.35;
    else if (selectedMultiplier === 3) winProbability = 0.3;
    else if (selectedMultiplier === 5) winProbability = 0.2;
    else if (selectedMultiplier === 10) winProbability = 0.1;
    else if (selectedMultiplier === 50) winProbability = 0.02;
    
    // Determine if the player wins
    const isWin = Math.random() < winProbability;
    
    // Find a suitable segment to land on
    let targetSegment;
    if (isWin) {
        // Filter winning segments with values close to the selected multiplier
        const winningSegments = wheelSegments.filter(segment => 
            segment.value > 0 && 
            (selectedMultiplier <= 2 || segment.value <= selectedMultiplier)
        );
        
        if (winningSegments.length > 0) {
            // For high multipliers, occasionally give a high win
            if (selectedMultiplier >= 5 && Math.random() < 0.1) {
                // Find the highest value that's not greater than the selected multiplier
                targetSegment = winningSegments.reduce((prev, current) => 
                    (current.value > prev.value && current.value <= selectedMultiplier) ? current : prev, 
                    winningSegments[0]
                );
            } else {
                // Pick a random winning segment
                targetSegment = winningSegments[Math.floor(Math.random() * winningSegments.length)];
            }
        } else {
            // Fallback to a 1.2x win if no suitable segment is found
            targetSegment = { value: 1.2, label: '1.2x' };
        }
    } else {
        // Get a losing segment
        const losingSegments = wheelSegments.filter(segment => segment.value === 0);
        targetSegment = losingSegments[Math.floor(Math.random() * losingSegments.length)];
    }
    
    // Find the index of the target segment
    const targetIndex = wheelSegments.findIndex(segment => 
        segment.value === targetSegment.value && segment.label === targetSegment.label
    );
    
    // Calculate the rotation needed to land on the target segment
    const segmentAngle = (2 * Math.PI) / wheelSegments.length;
    let targetAngle = (targetIndex * segmentAngle) + segmentAngle / 2;
    
    // Add several full rotations plus the target angle
    const spinAmount = (Math.PI * 2 * 4) + (Math.PI * 2 - targetAngle);
    
    // Animate the spin
    const startRotation = wheelRotation;
    const startTime = Date.now();
    const spinDuration = 5000; // 5 seconds
    
    function animateSpin() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing function to slow down at the end
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Update rotation
        wheelRotation = startRotation + (spinAmount * easeOut);
        
        // Draw the wheel
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            // Spin complete
            isWheelSpinning = false;
            document.getElementById('wheel-spin-btn').disabled = false;
            
            // Process the result
            processWheelResult(targetSegment, betAmount);
        }
    }
    
    // Start animation
    animateSpin();
}

// Function to get random CS:GO skin based on multiplier value
function getRandomSkinForMultiplier(multiplier) {
    // Define skins with local CS:GO skin images based on price/rarity tiers
    const skinTiers = {
        low: [
            { name: 'P250 | Muertos (Field-Tested)', price: '$3.42', rarity: 'uncommon', image: 'images/weapon4.svg' },
            { name: 'Five-SeveN | Monkey Business (Well-Worn)', price: '$5.73', rarity: 'uncommon', image: 'images/weapon5.svg' },
            { name: 'MP9 | Rose Iron (Factory New)', price: '$2.84', rarity: 'common', image: 'images/weapon1.svg' },
            { name: 'Sawed-Off | The Kraken (Minimal Wear)', price: '$4.21', rarity: 'uncommon', image: 'images/weapon2.svg' },
            { name: 'Nova | Hyper Beast (Field-Tested)', price: '$3.67', rarity: 'uncommon', image: 'images/weapon3.svg' }
        ],
        medium: [
            { name: 'P90 | Asiimov (Minimal Wear)', price: '$14.32', rarity: 'rare', image: 'images/weapon4.svg' },
            { name: 'MAC-10 | Neon Rider (Factory New)', price: '$8.65', rarity: 'rare', image: 'images/weapon5.svg' },
            { name: 'USP-S | Kill Confirmed (Minimal Wear)', price: '$152.67', rarity: 'mythical', image: 'images/weapon1.svg' },
            { name: 'Desert Eagle | Blaze (Factory New)', price: '$430.18', rarity: 'mythical', image: 'images/weapon3.svg' }
        ],
        high: [
            { name: 'AK-47 | Fire Serpent (Field-Tested)', price: '$745.20', rarity: 'rare', image: 'images/weapon4.svg' },
            { name: 'Glock-18 | Fade (Factory New)', price: '$786.32', rarity: 'mythical', image: 'images/weapon2.svg' },
            { name: 'M4A4 | Howl (Minimal Wear)', price: '$985.65', rarity: 'legendary', image: 'images/weapon3.svg' }
        ],
        jackpot: [
            { name: 'AWP | Dragon Lore (Factory New)', price: '$1,850.42', rarity: 'legendary', image: 'images/weapon1.svg' },
            { name: 'Karambit | Fade (Factory New)', price: '$1,245.89', rarity: 'legendary', image: 'images/weapon2.svg' },
            { name: 'Butterfly Knife | Doppler (Factory New)', price: '$1,320.75', rarity: 'legendary', image: 'images/weapon5.svg' }
        ]
    };
    
    // Select skin tier based on multiplier
    let tier;
    if (multiplier <= 1.5) {
        tier = 'low';  // 1.2x - 1.5x
    } else if (multiplier <= 3) {
        tier = 'medium'; // 2x - 3x
    } else if (multiplier <= 10) {
        tier = 'high';  // 5x - 10x
    } else {
        tier = 'jackpot'; // 50x
    }
    
    // Pick a random skin from the selected tier
    const skins = skinTiers[tier];
    const randomIndex = Math.floor(Math.random() * skins.length);
    
    return skins[randomIndex];
}

// Process the wheel spin result
function processWheelResult(segment, betAmount) {
    const resultDiv = document.getElementById('wheel-result');
    const resultTitle = resultDiv.querySelector('.result-title');
    const resultMultiplier = resultDiv.querySelector('.result-multiplier');
    const resultPayout = resultDiv.querySelector('.result-payout span');
    
    // Calculate winnings
    const winnings = segment.value > 0 ? betAmount * segment.value : 0;
    const isWin = winnings > 0;
    
    // Update the result display
    resultTitle.textContent = isWin ? 'YOU WON!' : 'YOU LOST!';
    resultTitle.className = 'result-title ' + (isWin ? 'win' : 'lose');
    
    resultMultiplier.textContent = isWin ? `x${segment.value}` : 'x0';
    
    resultPayout.textContent = `$${winnings.toFixed(2)}`;
    
    resultDiv.className = 'wheel-result ' + (isWin ? 'win' : 'lose');
    resultDiv.style.display = 'block';
    
    // If player won, display a random CS:GO skin based on the multiplier
    if (isWin) {
        // Get a skin based on the multiplier
        const skin = getRandomSkinForMultiplier(segment.value);
        
        // Create or get the skin container
        let skinContainer = resultDiv.querySelector('.wheel-skin-reward');
        if (!skinContainer) {
            skinContainer = document.createElement('div');
            skinContainer.className = 'wheel-skin-reward';
            resultDiv.appendChild(skinContainer);
        }
        
        // Update skin container with the selected skin
        skinContainer.innerHTML = `
            <div class="wheel-won-skin">
                <div class="skin-image-container item-border-${skin.rarity}">
                    <img src="${skin.image}" alt="${skin.name}" class="skin-image">
                </div>
                <div class="skin-details">
                    <div class="skin-name ${skin.rarity}">${skin.name}</div>
                    <div class="skin-price">${skin.price}</div>
                </div>
                <div class="skin-actions">
                    <button class="skin-add-btn">Add to Inventory</button>
                    <button class="skin-sell-btn">Sell for ${skin.price}</button>
                </div>
            </div>
        `;
        
        // Add event listeners to buttons
        const addToInventoryBtn = skinContainer.querySelector('.skin-add-btn');
        const sellSkinBtn = skinContainer.querySelector('.skin-sell-btn');
        
        addToInventoryBtn.addEventListener('click', function() {
            // Add the item to the user's inventory
            userInventory.push({
                id: Date.now(),
                name: skin.name,
                price: skin.price,
                rarity: skin.rarity,
                image: skin.image,
                timestamp: new Date().toLocaleString()
            });
            
            localStorage.setItem('userInventory', JSON.stringify(userInventory));
            
            showNotification(`${skin.name} added to your inventory!`);
            
            // Remove skin from result
            skinContainer.remove();
        });
        
        sellSkinBtn.addEventListener('click', function() {
            // Extract price value
            const priceValue = parseFloat(skin.price.replace('$', '').replace(',', ''));
            
            // Add to user balance
            currentUser.balance += priceValue;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserInterface();
            
            // Update wheel balance display
            document.getElementById('wheel-user-balance').textContent = `$${currentUser.balance.toFixed(2)}`;
            
            showNotification(`Sold ${skin.name} for ${skin.price}!`);
            
            // Remove skin from result
            skinContainer.remove();
        });
    } else {
        // If there's a skin container from a previous spin, remove it
        const skinContainer = resultDiv.querySelector('.wheel-skin-reward');
        if (skinContainer) {
            skinContainer.remove();
        }
    }
    
    // Add result to history
    addWheelHistoryItem(isWin, segment.value);
    
    // If player won, add winnings to balance
    if (isWin) {
        currentUser.balance += winnings;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInterface();
        
        // Update balance in wheel UI
        document.getElementById('wheel-user-balance').textContent = `$${currentUser.balance.toFixed(2)}`;
        
        // Display a notification
        showNotification(`You won $${winnings.toFixed(2)} on the Wheel of Fortune!`);
    }
}

// Add an item to the wheel history
function addWheelHistoryItem(isWin, multiplier) {
    // Create history item
    const historyItem = {
        isWin,
        multiplier,
        timestamp: Date.now()
    };
    
    // Add to history array
    wheelHistory.unshift(historyItem);
    
    // Limit history to last 20 items
    if (wheelHistory.length > 20) {
        wheelHistory.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('wheelHistory', JSON.stringify(wheelHistory));
    
    // Update the UI
    updateWheelHistory();
}

// Load wheel history from localStorage
function loadWheelHistory() {
    const savedHistory = localStorage.getItem('wheelHistory');
    if (savedHistory) {
        wheelHistory = JSON.parse(savedHistory);
        updateWheelHistory();
    }
}

// Update the wheel history display
function updateWheelHistory() {
    const historyContainer = document.getElementById('wheel-history-container');
    if (!historyContainer) return;
    
    // Clear current history
    historyContainer.innerHTML = '';
    
    // Add each history item
    wheelHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'wheel-history-item ' + (item.isWin ? 'win' : 'lose');
        historyItem.textContent = item.isWin ? `${item.multiplier}x` : '0x';
        
        historyContainer.appendChild(historyItem);
    });
}