import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAgeTIWXusTQi_VIskEv0K-eG-xUZfeSXM",
    authDomain: "reactapp-8566f.firebaseapp.com",
    projectId: "reactapp-8566f",
    storageBucket: "reactapp-8566f.appspot.com",
    messagingSenderId: "515094988229",
    appId: "1:515094988229:web:ef35f4c69185d9cae6b7ac",
    measurementId: "G-X1WYWWK6JN"
  };
  const firebaseapp=Firebase.initializeApp(firebaseConfig);
  Firebase.analytics();
  const db=firebaseapp.firestore();
  const auth=firebaseapp.auth();
  const storage=firebaseapp.storage();

  export { db , auth, storage };
