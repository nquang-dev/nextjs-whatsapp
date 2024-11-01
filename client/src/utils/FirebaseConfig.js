import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFzZWktdvcZMgES2LzeEDOU89_zDTCmio",
    authDomain: "whatsapp-clone-7a9c6.firebaseapp.com",
    projectId: "whatsapp-clone-7a9c6",
    storageBucket: "whatsapp-clone-7a9c6.firebasestorage.app",
    messagingSenderId: "362914793884",
    appId: "1:362914793884:web:77a775febbac52edb7e059",
    measurementId: "G-DGFTZZM4TD"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);