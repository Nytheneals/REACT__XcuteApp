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
  }

  // RENDERS AFTER COMPONENT HAS RENDERED
  componentDidMount() {
    firebase
      .database()
      .ref()
      .on('value', (res) => {
        const userData = res.val(); // COPY OF THE OBJECT
        console.log(userData);
        const dataArray = [];
        // ADDING THE KEY TO THE OBJECT
        for (const key in userData) {
          userData[key].key = key;
          dataArray.push(userData[key]);
        }
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
    // PUSHING STATE TO THE DB
    dbRef.push(note);

    // REFRESH INPUT FIELDS
    this.noteTitle.value = '';
    this.noteText.value = '';
    this.showSidebar(e);
    console.table(this.state.notes);
  }

  //* ***************** UPDATE ITEM ******************//

  //* ***************** DELETE ITEM ******************//

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Xcute`</h1>
          <nav>
            <a href="" onClick={this.showSidebar}>
              Add New Note
            </a>
            <a href="">Login</a>
          </nav>
        </header>

        <section className="notes">
          {this.state.notes.map((note, index) => <NoteCard note={note} key={index} />).reverse()}
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
