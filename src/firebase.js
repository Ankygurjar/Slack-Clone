import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA90G8LV5wD_PrlIMT87xdgeFu5eQIJkfw",
    authDomain: "slack-306d0.firebaseapp.com",
    projectId: "slack-306d0",
    storageBucket: "slack-306d0.appspot.com",
    messagingSenderId: "280544695766",
    appId: "1:280544695766:web:04e85d5ce9cb4591bf0077",
    measurementId: "G-7CW80SRK62"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, db };