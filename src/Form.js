import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Form extends Component {
  state = { input: '' }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <form 
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <TextField
          className="TextField"
          value={this.state.input}
          onChange={(event) => this.setState({ input: event.target.value })}
          label="Type a suggestion"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    );
  }
}

export default Form;
