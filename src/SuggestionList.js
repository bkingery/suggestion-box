import React, { Component } from 'react';
import Suggestion from './Suggestion';

class SuggestionList extends Component {
  render() {
    return (
      <div className="SuggestionList">
        {this.props.suggestions.map((s, i) => <Suggestion key={i} {...s} />)}
      </div>
    );
  }
}

export default SuggestionList;
