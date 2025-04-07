// PayPal Integration for Hellcase Copy
// This script handles payments through PayPal for the Hellcase Clone

// Your PayPal Client ID from the PayPal Developer Dashboard
// Go to developer.paypal.com and create an app to get this
const PAYPAL_CLIENT_ID = "AYroVBQhdZB7wX7HevOvSXhCfQWPdJt6DKRBFo1-zMkAd7G_vTyEL7BtZkWZiR2OS-jDG0VKh-luTDGM"; // Sandbox PayPal Client ID

// Load the PayPal JS SDK script dynamically
function loadPayPalScript() {
    return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector('script[src*="paypal-sdk"]')) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
        document.head.appendChild(script);
    });
}

// Function to initiate a PayPal payment
function initiatePayPalPayment(amount) {
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
        showNotification("Please enter a valid amount", "error");
        return;
    }

    // Format amount to 2 decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);
    
    // Create a transaction ID for this payment
    const transactionId = `TR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Show loading indicator
    const overlay = document.querySelector('.deposit-overlay');
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'paypal-loading';
    loadingContainer.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Connecting to PayPal...</p>
    `;
    overlay.appendChild(loadingContainer);

    // Try to load the PayPal SDK
    loadPayPalScript()
        .then(() => {
            // Remove loading indicator
            overlay.removeChild(loadingContainer);
            
            // Create PayPal button container
            const paypalBtnContainer = document.createElement('div');
            paypalBtnContainer.id = 'paypal-button-container';
            paypalBtnContainer.className = 'paypal-button-container';
            
            // Create overlay for PayPal checkout
            const paypalOverlay = document.createElement('div');
            paypalOverlay.className = 'paypal-checkout-overlay';
            paypalOverlay.innerHTML = `
                <div class="paypal-checkout-container">
                    <div class="paypal-checkout-header">
                        <h3>Complete your payment</h3>
                        <button class="paypal-checkout-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="paypal-checkout-amount">
                        <p>Amount: <strong>$${formattedAmount}</strong></p>
                    </div>
                </div>
            `;
            
            // Add the PayPal button container to the checkout container
            const checkoutContainer = paypalOverlay.querySelector('.paypal-checkout-container');
            checkoutContainer.appendChild(paypalBtnContainer);
            document.body.appendChild(paypalOverlay);
            
            // Add event listener to close button
            const closeBtn = paypalOverlay.querySelector('.paypal-checkout-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(paypalOverlay);
            });
            
            // Check if PayPal is available in the current environment
            if (!window.paypal) {
                console.error('PayPal SDK not available');
                showNotification("PayPal payment service is currently unavailable", "error");
                document.body.removeChild(paypalOverlay);
                
                // Fall back to simulation for demo purposes
                simulatePayPalPayment(formattedAmount, transactionId);
                return;
            }
            
            // Render the PayPal buttons
            window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay'
                },
                
                // Set up the transaction
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Coins for Hellcase Copy',
                            amount: {
                                currency_code: 'USD',
                                value: formattedAmount
                            }
                        }]
                    });
                },
                
                // Handle approved transactions
                onApprove: (data, actions) => {
                    return actions.order.capture().then(function(details) {
                        console.log('Transaction completed by ' + details.payer.name.given_name, details);
                        
                        // Close the PayPal overlay
                        document.body.removeChild(paypalOverlay);
                        
                        // Close the deposit modal if it's still open
                        const depositOverlay = document.querySelector('.deposit-overlay');
                        if (depositOverlay) {
                            document.body.removeChild(depositOverlay);
                        }
                        
                        // Process successful payment
                        simulateSuccessfulPayment(formattedAmount, data.orderID);
                    });
                },
                
                // Handle errors or cancellations
                onError: (err) => {
                    console.error('PayPal error:', err);
                    showNotification("Payment error: " + err.message, "error");
                },
                
                onCancel: () => {
                    console.log('Payment cancelled');
                    showNotification("Payment cancelled", "warning");
                    document.body.removeChild(paypalOverlay);
                }
            }).render('#paypal-button-container');
        })
        .catch(error => {
            console.error('Error loading PayPal:', error);
            
            // Remove loading indicator
            if (overlay.contains(loadingContainer)) {
                overlay.removeChild(loadingContainer);
            }
            
            // Show error message
            showNotification("Could not connect to PayPal. Please try again later.", "error");
            
            // Fall back to simulation for demo purposes
            simulatePayPalPayment(formattedAmount, transactionId);
        });
}

// Helper function to simulate PayPal payment for demo/fallback
function simulatePayPalPayment(amount, transactionId) {
    // Show a notification that we're using a demo mode
    showNotification("Using demo mode: PayPal integration requires a valid Client ID", "warning");
    
    // Ask if the user wants to simulate a successful payment
    if (confirm(`DEMO MODE: Simulate a successful payment of $${amount}?`)) {
        // Simulate successful payment
        simulateSuccessfulPayment(amount, transactionId);
    }
}

// Function to simulate a successful PayPal payment
function simulateSuccessfulPayment(amount, transactionId) {
    // Update user's balance
    const currentBalance = parseFloat(currentUser.balance.replace('$', '').trim());
    const newBalance = (currentBalance + parseFloat(amount)).toFixed(2);
    currentUser.balance = `$${newBalance}`;
    
    // Update UI to reflect new balance
    updateUserInterface();
    
    // Close deposit modal if it's still open
    const overlay = document.querySelector('.deposit-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
    
    // Show success notification
    showNotification(`Payment successful! $${amount} has been added to your balance.`, "success");
    
    // Log transaction
    console.log(`Payment successful: $${amount}, Transaction ID: ${transactionId}`);
}

// Initialize PayPal integration by adding event listeners to the deposit form
function initializePayPalIntegration() {
    // This function will be called when the deposit modal is opened
    document.addEventListener('click', function(e) {
        // Check if this is a PayPal submit button
        if (e.target.classList.contains('paypal-submit')) {
            e.preventDefault();
            
            // Find the closest form
            const form = e.target.closest('form');
            if (!form) return;
            
            // Get selected amount
            const selectedOption = form.querySelector('.amount-option.selected');
            let amount = 0;
            
            if (selectedOption) {
                if (selectedOption.dataset.amount === 'custom') {
                    // Get value from custom amount input
                    const customAmountInput = form.querySelector('.custom-amount');
                    amount = customAmountInput.value;
                } else {
                    // Get amount from the selected button
                    amount = selectedOption.dataset.amount;
                }
            }
            
            // Initiate PayPal payment with the selected amount
            initiatePayPalPayment(amount);
        }
        
        // Check if this is an amount option button
        if (e.target.classList.contains('amount-option')) {
            const amountOptions = e.target.parentElement.querySelectorAll('.amount-option');
            const customAmountInput = e.target.parentElement.parentElement.querySelector('.custom-amount');
            
            // Remove selected class from all options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to this option
            e.target.classList.add('selected');
            
            // Show/hide custom amount input
            if (e.target.dataset.amount === 'custom') {
                customAmountInput.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountInput.style.display = 'none';
            }
        }
    });
    
    // Event delegation for tab navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('deposit-tab')) {
            const tabId = e.target.dataset.tab;
            
            // Get all tabs and tab contents
            const tabs = document.querySelectorAll('.deposit-tab');
            const tabContents = document.querySelectorAll('.deposit-tab-content');
            
            // Remove active class from all tabs and tab contents
            tabs.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected tab
            e.target.classList.add('active');
            
            // Add active class to corresponding tab content
            const selectedContent = document.querySelector(`.deposit-tab-content[data-content="${tabId}"]`);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        }
    });
}

// Initialize PayPal integration
document.addEventListener('DOMContentLoaded', initializePayPalIntegration);