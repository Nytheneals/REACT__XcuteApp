import React, { Component } from 'react';
import './App.css';

// STATELESS COMPONENT

class App extends Component {
  render() {
    return (
      // MAIN HEADER THATS HAS THE LOGO

      <div>
        <header className="mainHeader">
          <h1>Xcute`</h1>
          <nav>
            <a href="">Add New Note</a>
            <a href="">Login</a>
          </nav>
        </header>
        <section className="notes">
          <div className="noteCard">
            <i className="fa fa-edit" />
            <i className="fa fa-times" />
            <h4>Test note:</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente, quas
              maiores commodi facere aliquam nulla quasi culpa. Sed aliquid officiis veritatis rerum
              repudiandae quibusdam ab ipsam tempora obcaecati aspernatur?
            </p>
          </div>
        </section>
        <aside className="sidebar">
          <form>
            <h3>Add New note</h3>
            <div className="close-btn">
              <i className="fa fa-times" />
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" />
            <label htmlFor="note-text">Title:</label>
            <textarea type="text" name="note-text" />
            <input type="submit" value="Add New Note" />
          </form>
        </aside>
      </div>
    );
  }
}

export default App;
