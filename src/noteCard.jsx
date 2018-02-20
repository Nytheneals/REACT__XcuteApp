import React, { Component } from "react";

class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      note: {}
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note
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
        <form>
          <div>
            <input type="text" defaultValue={this.props.note.title} />
            <input type="text" defaultValue={this.props.note.text} />
            <input type="submit" value="Done editing" onSubmit={this.update} />
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
      </div>
    );
  }
}

export default NoteCard;
