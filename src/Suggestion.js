import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Suggestion extends Component {
  render() {
    return (
      <Paper className="Suggestion">
        <div className="description">{this.props.message}</div>
        <Button variant="outlined" onClick={this.props.onPlusOne}>+1</Button>
        <div className="total">{this.props.totalPlusOne}</div>
      </Paper>
    );
  }
}

export default Suggestion;
