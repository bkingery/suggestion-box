import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Suggestion extends Component {
  render() {
    return (
      <div className="Suggestion">
        <div className="description">{this.props.message}</div>
        <Button variant="outlined">+1</Button>
        <div className="total">{this.props.totalPlusOne}</div>
      </div>
    );
  }
}

export default Suggestion;
