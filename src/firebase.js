import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5SaiN76hKAB9xSJBfndUqDomL3PNtV3g',
  authDomain: 'ehealth-7009b.firebaseapp.com',
  databaseURL: 'https://ehealth-7009b.firebaseio.com',
  projectId: 'ehealth-7009b',
  storageBucket: 'ehealth-7009b.appspot.com',
  messagingSenderId: '969063748888',
  appId: '1:969063748888:web:7c58efcc2de40b672ffa6d'
}

// Initialize Firebase

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db
