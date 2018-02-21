import React, { Component } from "react";
import "./App.css";
import NoteCard from "./noteCard";
import firebase from "firebase";

// CONNECTING TO FIREBASE REALTIME DATABASE
const config = {
  apiKey: "AIzaSyBQpt7EfRfLwZlC_PiRgHUBoetUUYZF2oM",
  authDomain: "xcute-2ac2f.firebaseapp.com",
  databaseURL: "https://xcute-2ac2f.firebaseio.com",
  projectId: "xcute-2ac2f",
  storageBucket: "xcute-2ac2f.appspot.com",
  messagingSenderId: "666744767443"
};
firebase.initializeApp(config);

// START OF COMPONENT
class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };

    this.addNote = this.addNote.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showCreate = this.showCreate.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  // RENDERS AFTER COMPONENT HAS RENDERED
  componentDidMount() {
    firebase
      .database()
      .ref()
      .on("value", res => {
        const userData = res.val(); // COPY OF THE OBJECT
        const dataArray = [];
        // ADDING THE KEY TO THE OBJECT
        for (const objKey in userData) {
          userData[objKey].key = objKey; // THIS TAKES THE KEY AND SETS IT AS A KEY
          // userData[objKey] IS AN OBJECT..
          dataArray.push(userData[objKey]); // WE ARE PUSHING KEYS INTO THE ARRAY
        }
        this.setState({
          notes: dataArray
        });
      });
  }

  //* *************** SHOW SIDE BAR ****************//
  // CREATED A REFERENCE TO AN ELEMENT, USING A FUNCTION
  // ADDED A TOGGLE CLASS
  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
  }

  //* *************** ADD NEW ITEM ****************//
  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };

    // MAKING A REFERENCE TO THE FIREBASE DATABASE
    const dbRef = firebase.database().ref();
    // PUSHING NOTE TO THE DB
    dbRef.push(note);

    // REFRESH INPUT FIELDS
    this.noteTitle.value = "";
    this.noteText.value = "";
    this.showSidebar(e);
  }

  //* ***************** UPDATE ITEM ******************//
  updateNote(e) {}
  //* ***************** DELETE ITEM ******************//
  removeNote(noteId) {
    const dbRef = firebase.database().ref(noteId);
    dbRef.remove();
  }

  // AUTHENTICATION
  showCreate(e) {
    e.preventDefault();
    this.overlay.classList.toggle("show");
    this.createUserModal.classList.toggle("show");
  }
  // CREATE AN ACCOUNT
  createUser(e) {
    e.preventDefault();
    // CHECK WHETHER THE PASSWORDS MATCH
    // IF SO CREATE USER
    const password = this.createPassword.value;
    const confirm = this.confirmPassword.value;
    const email = this.createEmail.value;

    if (password === confirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => this.showCreate(e))
        .catch(function(error) {
          alert(error);
        });
    } else {
      alert("Password must match");
    }
  }

  // SIGN IN USER

  showLogin(e) {
    e.preventDefault();
    this.overlay.classList.toggle("show");
    this.loginModal.classList.toggle("show");
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.userEmail.value;
    const password = this.userPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => this.showLogin(e))
      .catch(function(error) {
        alert(error.message);
      });
  }

  // SIGNOUT USER
  //* **************** COMPONENT RENDER ****************//
  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Xcute`</h1>
          <nav>
            <a href="" onClick={this.showSidebar}>
              Add New Note
            </a>

            <a href="" onClick={this.showCreate}>
              Create Account
            </a>
            <a href="" onClick={this.showLogin}>
              Login
            </a>
          </nav>
        </header>
        <div className="overlay" ref={ref => (this.overlay = ref)} />
        {/* NOTE CARD  */}
        <section className="notes">
          {this.state.notes
            .map((note, i) => (
              <NoteCard
                note={note}
                key={`note-${i}`}
                removeNote={this.removeNote}
                updateNote={this.updateNote}
              />
            ))
            .reverse()}
        </section>
        <aside className="sidebar" ref={ref => (this.sidebar = ref)}>
          <form onSubmit={this.addNote}>
            <h3>Add New note</h3>
            <div className="close-btn" onClick={this.showSidebar}>
              <i className="fa fa-times" />
            </div>
            <label htmlFor="note-title">Title:</label>
            <input
              type="text"
              name="note-title"
              ref={ref => (this.noteTitle = ref)}
            />
            <label htmlFor="note-text">Note:</label>
            <textarea
              type="text"
              name="note-text"
              ref={ref => (this.noteText = ref)}
            />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
        {/* LOGIN FORM */}
        <div className="loginModal modal" ref={ref => (this.loginModal = ref)}>
          <div className="close">
            <i className="fa fa-times" onClick={this.showLogin} />
          </div>
          <form action="" onSubmit={this.loginUser}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                ref={ref => (this.userEmail = ref)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                ref={ref => (this.userPassword = ref)}
              />
            </div>
            <div>
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
        {/* CREATE USER */}
        <div
          className="createUserModal modal"
          ref={ref => (this.createUserModal = ref)}
        >
          <div className="close" onClick={this.showCreate}>
            <i className="fa fa-times" />
          </div>

          <form action="" onSubmit={this.createUser}>
            <div>
              <label htmlFor="createEmail">Email:</label>
              <input
                type="text"
                name="createEmail"
                ref={ref => (this.createEmail = ref)}
              />
            </div>
            <div>
              <label htmlFor="createPassword">Password:</label>
              <input
                type="password"
                name="createPassword"
                ref={ref => (this.createPassword = ref)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                ref={ref => (this.confirmPassword = ref)}
              />
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
