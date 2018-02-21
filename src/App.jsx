import React, { Component } from 'react';
import './App.css';
import NoteCard from './noteCard';
import firebase from 'firebase';

// CONNECTING TO FIREBASE REALTIME DATABASE
const config = {
  apiKey: 'AIzaSyBQpt7EfRfLwZlC_PiRgHUBoetUUYZF2oM',
  authDomain: 'xcute-2ac2f.firebaseapp.com',
  databaseURL: 'https://xcute-2ac2f.firebaseio.com',
  projectId: 'xcute-2ac2f',
  storageBucket: 'xcute-2ac2f.appspot.com',
  messagingSenderId: '666744767443',
};
firebase.initializeApp(config);

// START OF COMPONENT
class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };

    this.addNote = this.addNote.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  // RENDERS AFTER COMPONENT HAS RENDERED
  componentDidMount() {
    firebase
      .database()
      .ref()
      .on('value', (res) => {
        const userData = res.val(); // COPY OF THE OBJECT
        const dataArray = [];
        // ADDING THE KEY TO THE OBJECT
        for (const objKey in userData) {
          userData[objKey].key = objKey; // THIS TAKES THE KEY AND SETS IT AS A KEY
          // userData[objKey] IS AN OBJECT..
          dataArray.push(userData[objKey]); // WE ARE PUSHING KEYS INTO THE ARRAY
        }
        this.setState({
          notes: dataArray,
        });
      });
  }

  //* *************** SHOW SIDE BAR ****************//
  // CREATED A REFERENCE TO AN ELEMENT, USING A FUNCTION
  // ADDED A TOGGLE CLASS
  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle('show');
  }

  //* *************** ADD NEW ITEM ****************//
  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value,
    };

    // MAKING A REFERENCE TO THE FIREBASE DATABASE
    const dbRef = firebase.database().ref();
    // PUSHING NOTE TO THE DB
    dbRef.push(note);

    // REFRESH INPUT FIELDS
    this.noteTitle.value = '';
    this.noteText.value = '';
    this.showSidebar(e);
  }

  //* ***************** UPDATE ITEM ******************//
  updateNote(e) {}
  //* ***************** DELETE ITEM ******************//
  removeNote(noteId) {
    const dbRef = firebase.database().ref(noteId);
    dbRef.remove();
  }
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

            <a href="" onClick={this.createAccount}>
              Create Account
            </a>
          </nav>
        </header>

        <section className="notes">
          {this.state.notes
            .map((note, index) => (
              <NoteCard
                note={note}
                key={`note-${index}`}
                removeNote={this.removeNote}
                updateNote={this.updateNote}
              />
            ))
            .reverse()}
        </section>

        <aside className="sidebar" ref={ref => (this.sidebar = ref)}>
          <form onSubmit={this.addNote}>
            <h3>Add New note</h3>
            <div className="close-btn">
              <i className="fa fa-times" onClick={this.showSidebar} />
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" ref={ref => (this.noteTitle = ref)} />
            <label htmlFor="note-text">Note:</label>
            <textarea type="text" name="note-text" ref={ref => (this.noteText = ref)} />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
      </div>
    );
  }
}

export default App;
