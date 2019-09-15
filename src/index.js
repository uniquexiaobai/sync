import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase/app";
import "firebase/firestore";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseContext } from './context';

import './index.css';

const firebaseConfig = {
    projectId: "sync-unique",
};

const withFireBaseContext = (Component) => {
    return (
        <FirebaseContext.Provider value={firebase.initializeApp(firebaseConfig)}>
            <Component />
        </FirebaseContext.Provider>
    );
};
   
// window.firebase = firebase.initializeApp(firebaseConfig);

ReactDOM.render(withFireBaseContext(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
