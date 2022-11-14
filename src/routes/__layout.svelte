<script>
  import "../app.css";
  import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: "AIzaSyB1TDjVtgeiVuOG_uXS4HscDfOe8-5XZA0",
    authDomain: "registrocyr.firebaseapp.com",
    projectId: "registrocyr",
    storageBucket: "registrocyr.appspot.com",
    messagingSenderId: "229106348846",
    appId: "1:229106348846:web:83809001b94775427980bf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>

<slot />