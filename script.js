const firebaseConfig = {
  apiKey: "AIzaSyAEvALh9iVizjmfCW0vNv1jrc0lHxPoDsQ",
  authDomain: "formdetails-a6640.firebaseapp.com",
  databaseURL: "https://formdetails-a6640-default-rtdb.firebaseio.com",
  projectId: "formdetails-a6640",
  storageBucket: "formdetails-a6640.appspot.com",
  messagingSenderId: "717825695115",
  appId: "1:717825695115:web:9d25aeb2300e3c8abe638e",

  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

let paymentFormDB = firebase.database().ref("paymentForm");

document.getElementById("paymentForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  let cardNumber = document.getElementById("cardNumber");
  let cvvNumber = document.getElementById("cvvNumber");
  let alert = document.getElementById("alert");

  if (cardNumber.value.length !== 16 || cvvNumber.value.length !== 3) {
    alertMessage(alert, "please fill correct details");
  } else {
    let firstName = getElementVal("firstName");
    let lastName = getElementVal("lastName");
    let email = getElementVal("email");
    
    saveMessages(firstName, lastName, email);
    alertMessage(alert, "Your message sent");
    document.getElementById("paymentForm").reset();
  }
}

const alertMessage = (alert, text) => {
   alert.style.display = "block";
   alert.innerHTML = text;
   setTimeout(() => {
     alert.style.display = "none";
   }, 3000);
}

const saveMessages = (firstName, lastName, email) => {
  let newpaymentForm = paymentFormDB.push();
  newpaymentForm.set({
    firstName,
    lastName,
    email,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
