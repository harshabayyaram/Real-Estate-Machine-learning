// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWzwd5zoX4GxoWxJ9Yn1ujSdOHRI1wXdY",
    authDomain: "real-estate-1fc25.firebaseapp.com",
    databaseURL: "https://real-estate-1fc25-default-rtdb.firebaseio.com",
    projectId: "real-estate-1fc25",
    storageBucket: "real-estate-1fc25.appspot.com",
    messagingSenderId: "31247126547",
    appId: "1:31247126547:web:68d627b21d0bc47d7f2fe6",
    measurementId: "G-F7QSEDZ2JV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let currentPage = 'customerDetails';

function nextPage(page) {
    document.querySelector(`.form-page.${currentPage}`).classList.remove('active');
    document.querySelector(`.form-page.${page}`).classList.add('active');
    currentPage = page;
}

function submitForm() {
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const propertyType = document.getElementById('propertyType').value;
    const propertyLocation = document.getElementById('propertyLocation').value;
    const propertyArea = document.getElementById('propertyArea').value;

    // Add logic to submit form data to Firebase
    const db = firebase.firestore();

    db.collection('sellRequests').add({
        customerName: customerName,
        customerEmail: customerEmail,
        propertyType: propertyType,
        propertyLocation: propertyLocation,
        propertyArea: propertyArea,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        alert('Form submitted successfully!');
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
    });
}
