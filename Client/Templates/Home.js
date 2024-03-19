$(document).ready(function() {
    // Function to handle the logout icon click event
    $('#logoutBtn').click(function () {
        // Add logic for logout here
        console.log('Logout clicked');
    });

    // Function to handle the profile icon click event
    $('#profileBtn').click(function () {
        // Add logic for profile here
        console.log('Profile clicked');
    });

    // Function to handle the dashboard icon click event
    $('#dashboardBtn').click(function () {
        // Add logic for dashboard here
        console.log('Dashboard clicked');
    });

    // Function to handle the SELL button click event
    $('#sellBtn').click(function () {
        // Redirect to sell.html
        window.location.href = 'sell.html';
        console.log('SELL button clicked');
    });

    // Function to handle the BUY button click event
    $('#buyBtn').click(function () {
        // Redirect to buy.html
        window.location.href = 'buy.html';
        console.log('BUY button clicked');
    });

    // Function to handle the EXPLORE button click event
    $('#exploreBtn').click(function () {
        // Redirect to explore.html
        window.location.href = 'explore.html';
        console.log('EXPLORE button clicked');
    });
});
