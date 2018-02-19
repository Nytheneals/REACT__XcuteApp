import React, { Component } from "react";
import "./App.css";
import NoteCard from "./noteCard";

// STATELESS COMPONENT

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };

    this.addNote = this.addNote.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
  }

  // SHOW SIDE BAR
  // CREATED A REFERENCE TO AN ELEMENT, USING A FUNCTION

  // ADDED A TOGGLE CLASS
  showSidebar(e) {
    e.preventDefault();
    // console.log(this.sidebar); able to get this because i created a reference c

    this.sidebar.classList.toggle("show");
  }

  // ADD NEW ITEM
  addNote(e) {
    e.preventDefault();
    // MAKING A COPY OF THE STATE
    const notes = this.state.notes;
    // PUSH OBJECTS TO STATE ARRAY
    notes.push({
      title: this.title.value,
      note: this.note.value
    });
    // UPDATING STATE
    this.setState({
      notes: notes
    });

    console.table(this.state.notes);
    this.title.value = "";
    this.note.value = "";
    this.showSidebar(e);
  }

  // UPDATE ITEM

  // DELETE ITEM

  render() {
    return (
      // MAIN HEADER THATS HAS THE LOGO

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
          {this.state.notes
            .map((note, index) => {
              return <NoteCard note={note} key={index} />;
            })
            .reverse()}
        </section>

        <aside className="sidebar" ref={ref => (this.sidebar = ref)}>
          <form onSubmit={this.addNote}>
            <h3>Add New note</h3>
            <div className="close-btn">
              <i className="fa fa-times" onClick={this.showSidebar} />
            </div>
            <label htmlFor="note-title">Title:</label>
            <input
              type="text"
              name="note-title"
              ref={ref => (this.title = ref)}
            />
            <label htmlFor="note-text">Note:</label>
            <textarea
              type="text"
              name="note-text"
              ref={ref => (this.note = ref)}
            />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
      </div>
    );
  }
}

export default App;
