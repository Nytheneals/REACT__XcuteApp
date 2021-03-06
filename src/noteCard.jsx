import React, { Component } from 'react';
import firebase from 'firebase';

class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      note: {},
    };
    this.save = this.save.bind(this);
  }

  // UPDATER

  save(e) {
    e.preventDefault();
    const dbRef = firebase.database().ref(this.props.note.key);

    dbRef.update({
      title: this.noteTitle.value,
      text: this.noteText.value,
    });

    this.setState({
      editing: false,
    });
  }

  render() {
    let editingTemp = (
      <span>
        <h4>{this.props.note.title}</h4>
        <p>{this.props.note.text}</p>
      </span>
    );
    if (this.state.editing) {
      editingTemp = (
        <form onSubmit={this.save}>
          <div>
            <input
              type="text"
              defaultValue={this.props.note.title}
              name="title"
              ref={ref => (this.noteTitle = ref)}
            />
            <input
              type="text"
              defaultValue={this.props.note.text}
              name="text"
              ref={ref => (this.noteText = ref)}
            />
            <input type="submit" value="Done editing" />
          </div>
        </form>
      );
    }

    return (
      <div className="noteCard">
        <i
          className="fa fa-edit"
          onClick={() => {
            this.setState({ editing: true });
          }}
        />
        <i
          className="fa fa-times"
          onClick={() => {
            this.props.removeNote(this.props.note.key);
          }}
        />
        {editingTemp}
      </div>
    );
  }
}

export default NoteCard;
