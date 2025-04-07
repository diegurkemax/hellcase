// Deposit Modal with PayPal Integration for Hellcase Copy

// Make the function globally available
window.showDepositModalImplementation = showDepositModal;

// Show deposit modal function
function showDepositModal() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'deposit-overlay';
    
    // Create content
    const content = document.createElement('div');
    content.className = 'deposit-content';
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'deposit-title';
    title.textContent = 'Add Funds';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'deposit-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Create content area
    const depositContainer = document.createElement('div');
    depositContainer.className = 'deposit-container';
    
    // Add tabs for different deposit methods
    depositContainer.innerHTML = `
        <div class="deposit-tabs">
            <button class="deposit-tab active" data-tab="paypal">PayPal</button>
            <button class="deposit-tab" data-tab="cards">Credit Card</button>
            <button class="deposit-tab" data-tab="crypto">Cryptocurrency</button>
            <button class="deposit-tab" data-tab="code">Admin Code</button>
        </div>
        
        <div class="deposit-tab-contents">
            <div class="deposit-tab-content active" data-content="paypal">
                <form class="deposit-form" id="paypal-form">
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
                    
                    <div class="paypal-info">
                        <div class="paypal-logo">
                            <i class="fab fa-paypal" style="font-size: 3em; color: #003087;"></i>
                        </div>
                        <p>Secure payments with PayPal. You'll be redirected to PayPal to complete your payment.</p>
                    </div>
                    
                    <button type="button" class="paypal-submit deposit-submit">Pay with PayPal</button>
                </form>
            </div>
            
            <div class="deposit-tab-content" data-content="cards">
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
                            <input type="text" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Expiration Date</label>
                                <input type="text" placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label>CVC</label>
                                <input type="text" placeholder="123">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Name on Card</label>
                            <input type="text" placeholder="John Smith">
                        </div>
                    </div>
                    
                    <button type="button" class="deposit-submit">Add Funds</button>
                </form>
            </div>
            
            <div class="deposit-tab-content" data-content="crypto">
                <div class="crypto-options">
                    <h3>Select Cryptocurrency</h3>
                    <div class="crypto-list">
                        <div class="crypto-option">
                            <img src="images/bitcoin.svg" alt="Bitcoin">
                            <span>Bitcoin</span>
                        </div>
                        <div class="crypto-option">
                            <img src="images/ethereum.svg" alt="Ethereum">
                            <span>Ethereum</span>
                        </div>
                        <div class="crypto-option">
                            <img src="images/litecoin.svg" alt="Litecoin">
                            <span>Litecoin</span>
                        </div>
                        <div class="crypto-option">
                            <img src="images/bitcoin-cash.svg" alt="Bitcoin Cash">
                            <span>Bitcoin Cash</span>
                        </div>
                    </div>
                    
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
                    
                    <div class="crypto-address">
                        <h3>Send to this address</h3>
                        <div class="address-box">
                            <span class="crypto-addr">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</span>
                            <button class="copy-address"><i class="fas fa-copy"></i></button>
                        </div>
                        <div class="qr-code">
                            <img src="images/qr-code.svg" alt="QR Code">
                        </div>
                    </div>
                    
                    <p class="crypto-note">Funds will be added to your account once the transaction is confirmed.</p>
                </div>
            </div>
            
            <div class="deposit-tab-content" data-content="code">
                <div class="code-entry">
                    <h3>Enter Admin Code</h3>
                    <p>Enter a valid admin code to receive funds.</p>
                    <div class="form-group">
                        <input type="text" id="admin-code" placeholder="Enter code">
                    </div>
                    <button type="button" class="redeem-code-btn">Redeem Code</button>
                </div>
            </div>
        </div>
    `;
    
    // Assemble the modal
    content.appendChild(title);
    content.appendChild(closeBtn);
    content.appendChild(depositContainer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Add event listeners for tabs
    const tabs = overlay.querySelectorAll('.deposit-tab');
    const tabContents = overlay.querySelectorAll('.deposit-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            overlay.querySelector(`.deposit-tab-content[data-content="${tabId}"]`).classList.add('active');
        });
    });
    
    // Add event listeners for amount options
    const amountOptions = overlay.querySelectorAll('.amount-option');
    const customAmountInputs = overlay.querySelectorAll('.custom-amount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find the parent deposit-amount element
            const depositAmount = this.closest('.deposit-amount');
            
            // Remove selected class from all options in this section
            depositAmount.querySelectorAll('.amount-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to this option
            this.classList.add('selected');
            
            // Show/hide custom amount input if needed
            const customAmount = depositAmount.querySelector('.custom-amount');
            if (this.getAttribute('data-amount') === 'custom') {
                customAmount.style.display = 'block';
                customAmount.focus();
            } else {
                customAmount.style.display = 'none';
            }
        });
    });
    
    // Add event listener for redeem code button
    const redeemCodeBtn = overlay.querySelector('.redeem-code-btn');
    if (redeemCodeBtn) {
        redeemCodeBtn.addEventListener('click', function() {
            const adminCodeInput = document.getElementById('admin-code');
            const code = adminCodeInput.value.trim();
            
            if (code === '') {
                alert('Please enter a code.');
                return;
            }
            
            // Check if code is valid
            if (code === 'Lemato1234') {
                // Add 1000 to balance
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                const newBalance = (currentBalance + 1000).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI to reflect new balance
                updateUserInterface();
                
                // Close deposit modal
                document.body.removeChild(overlay);
                
                // Show notification
                alert('Admin code redeemed successfully! $1000 has been added to your balance.');
            } else if (code === 'HelloWorld') {
                // Add 100 to balance
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                const newBalance = (currentBalance + 100).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI to reflect new balance
                updateUserInterface();
                
                // Close deposit modal
                document.body.removeChild(overlay);
                
                // Show notification
                alert('Promo code redeemed successfully! $100 has been added to your balance.');
            } else if (code === 'FreeSkins') {
                // Add 50 to balance
                const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                const newBalance = (currentBalance + 50).toFixed(2);
                currentUser.balance = `$${newBalance}`;
                
                // Update UI to reflect new balance
                updateUserInterface();
                
                // Close deposit modal
                document.body.removeChild(overlay);
                
                // Show notification
                alert('Promo code redeemed successfully! $50 has been added to your balance.');
            } else {
                // Invalid code
                alert('Invalid code. Please try again.');
            }
        });
    }
    
    // Add event listener for deposit submit button
    const depositSubmitBtns = overlay.querySelectorAll('.deposit-submit');
    depositSubmitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const activeTab = overlay.querySelector('.deposit-tab.active').getAttribute('data-tab');
            const parent = this.closest('.deposit-tab-content');
            
            // Handle PayPal payments differently
            if (activeTab === 'paypal') {
                const selectedOption = parent.querySelector('.amount-option.selected');
                let amount = 0;
                
                if (selectedOption) {
                    if (selectedOption.getAttribute('data-amount') === 'custom') {
                        const customAmountInput = parent.querySelector('.custom-amount');
                        amount = parseFloat(customAmountInput.value);
                    } else {
                        amount = parseFloat(selectedOption.getAttribute('data-amount'));
                    }
                }
                
                if (!amount || isNaN(amount) || amount <= 0) {
                    alert('Please select a valid amount');
                    return;
                }
                
                // Call the PayPal payment function from payment.js
                if (typeof initiatePayPalPayment === 'function') {
                    initiatePayPalPayment(amount);
                } else {
                    // Simulate a successful payment after a short delay (for demo)
                    alert(`Redirecting to PayPal for $${amount} payment...`);
                    
                    // Simulate successful payment after 2 seconds
                    setTimeout(() => {
                        const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
                        const newBalance = (currentBalance + amount).toFixed(2);
                        currentUser.balance = `$${newBalance}`;
                        
                        // Update UI to reflect new balance
                        updateUserInterface();
                        
                        // Close deposit modal
                        if (document.body.contains(overlay)) {
                            document.body.removeChild(overlay);
                        }
                        
                        // Show notification
                        alert(`Payment successful! $${amount} has been added to your balance.`);
                    }, 2000);
                }
                return;
            }
            
            // Get selected amount (for non-PayPal methods)
            const selectedOption = parent.querySelector('.amount-option.selected');
            let amount = 0;
            
            if (selectedOption) {
                if (selectedOption.getAttribute('data-amount') === 'custom') {
                    const customAmountInput = parent.querySelector('.custom-amount');
                    amount = parseFloat(customAmountInput.value);
                } else {
                    amount = parseFloat(selectedOption.getAttribute('data-amount'));
                }
            }
            
            if (!amount || isNaN(amount) || amount <= 0) {
                alert('Please select a valid amount');
                return;
            }
            
            // For demo purposes, just add the amount to the balance
            const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
            const newBalance = (currentBalance + amount).toFixed(2);
            currentUser.balance = `$${newBalance}`;
            
            // Update UI to reflect new balance
            updateUserInterface();
            
            // Close deposit modal
            document.body.removeChild(overlay);
            
            // Show notification
            alert(`Payment successful! $${amount} has been added to your balance.`);
        });
    });
    
    // Add event listener for copy address button
    const copyAddressBtn = overlay.querySelector('.copy-address');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', function() {
            const cryptoAddr = overlay.querySelector('.crypto-addr').textContent;
            
            // Create a temporary textarea to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = cryptoAddr;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show a notification
            alert('Address copied to clipboard!');
        });
    }
    
    // Add event listener to close button
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Add styles for the deposit modal
    const style = document.createElement('style');
    style.textContent = `
        .deposit-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .deposit-content {
            background-color: #1a1d23;
            border-radius: 10px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        }
        
        .deposit-title {
            padding: 20px;
            margin: 0;
            border-bottom: 1px solid #2a2e35;
            font-size: 24px;
            color: var(--primary);
        }
        
        .deposit-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .deposit-close:hover {
            color: var(--primary);
        }
        
        .deposit-container {
            padding: 20px;
        }
        
        .deposit-tabs {
            display: flex;
            border-bottom: 1px solid #2a2e35;
            margin-bottom: 20px;
        }
        
        .deposit-tab {
            padding: 12px 20px;
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
            flex: 1;
            text-align: center;
        }
        
        .deposit-tab:hover {
            color: white;
        }
        
        .deposit-tab.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
        }
        
        .deposit-tab-content {
            display: none;
        }
        
        .deposit-tab-content.active {
            display: block;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #ccc;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            background-color: #2a2e35;
            border: none;
            border-radius: 5px;
            color: white;
        }
        
        .form-row {
            display: flex;
            gap: 15px;
        }
        
        .form-row .form-group {
            flex: 1;
        }
        
        .deposit-submit {
            display: block;
            width: 100%;
            padding: 15px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 20px;
        }
        
        .deposit-submit:hover {
            background-color: var(--primary-dark, #2c8c09);
        }
        
        .amount-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .amount-option {
            flex: 1 0 calc(33.333% - 10px);
            background-color: #2a2e35;
            border: 2px solid #2a2e35;
            color: white;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        }
        
        .amount-option:hover {
            background-color: #32363e;
            border-color: #32363e;
        }
        
        .amount-option.selected {
            background-color: transparent;
            border-color: var(--primary);
            color: var(--primary);
        }
        
        .custom-amount {
            width: 100%;
            padding: 12px;
            border: 2px solid #2a2e35;
            background-color: #1a1d23;
            color: white;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .crypto-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .crypto-option {
            background-color: #2a2e35;
            border-radius: 5px;
            padding: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .crypto-option:hover {
            background-color: #32363e;
        }
        
        .crypto-option img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
        
        .address-box {
            background-color: #2a2e35;
            border-radius: 5px;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .crypto-addr {
            flex: 1;
            word-break: break-all;
        }
        
        .copy-address {
            background: none;
            border: none;
            color: var(--primary);
            cursor: pointer;
            margin-left: 10px;
        }
        
        .qr-code {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .qr-code img {
            width: 150px;
            height: 150px;
        }
        
        .crypto-note {
            color: #888;
            font-size: 14px;
            margin-top: 20px;
        }
        
        h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #ccc;
        }
        
        /* PayPal specific styles */
        .paypal-info {
            text-align: center;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #f7f9fa;
            border-radius: 5px;
        }
        
        .paypal-logo {
            margin-bottom: 15px;
        }
        
        .paypal-submit {
            background-color: #003087 !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .paypal-submit:before {
            content: '\\f1ed';
            font-family: 'Font Awesome 5 Brands';
            margin-right: 10px;
            font-size: 1.2em;
        }
        
        .paypal-submit:hover {
            background-color: #0070ba !important;
        }
    `;
    document.head.appendChild(style);
}