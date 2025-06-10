import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFdfdIFyn_4svXGpTygYQXn96gwaPqoe8",
    authDomain: "projeto-react-tarefa.firebaseapp.com",
    projectId: "projeto-react-tarefa",
    storageBucket: "projeto-react-tarefa.firebasestorage.app",
    messagingSenderId: "121420460367",
    appId: "1:121420460367:web:b129f38e27c584353a153a"
  };
  

// inicializa o firebase cria o app
const app = initializeApp(firebaseConfig);

// ativa a autenticação
const auth = getAuth(app);

// Inicializando o Firestore
const db = getFirestore(app);

export { db, auth };


