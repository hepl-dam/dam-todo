import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    // vos infos de connexion FB
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;