import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOBGb6G8ZHap9H8pbSXyjLbh3oEeYneKE",
    authDomain: "aswin-message-2.firebaseapp.com",
    projectId: "aswin-message-2",
    storageBucket: "aswin-message-2.appspot.com",
    messagingSenderId: "596998229721",
    appId: "1:596998229721:web:d8ffb708398a2bf13a78c8",
    measurementId: "G-YKQN7KWMHF"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
  const db=app.firestore()
  const auth=app.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {db,auth,provider}