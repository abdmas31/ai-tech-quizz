import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMeroM44jF_uGFt5ErAiPgX-hIELlGSkg",
  authDomain: "ai-tech-quizz.firebaseapp.com",
  projectId: "ai-tech-quizz",
  storageBucket: "ai-tech-quizz.firebasestorage.app",
  messagingSenderId: "874762929723",
  appId: "1:874762929723:web:e55c20740abb34569d7e1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
