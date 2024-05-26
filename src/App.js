import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import Login from './components/Login';
import ReactLoading from 'react-loading';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './index.css';

const firebaseConfig = {
 
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="white
        " />
      </div>
    );
  }

  return (
    <div className="App">
      {user ? <Main /> : <Login />}
    </div>
  );
}

export default App;
