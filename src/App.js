import React, { Component } from 'react';
import './App.css';
import SuggestionList from './SuggestionList';
import Form from './Form';

class App extends Component {
  state = { suggestions: [] }

  addNewSuggestion = (message) => {
    const newSuggestion = {
      message,
      totalPlusOne: 0
    };
    this.setState(prevState => ({
      suggestions: prevState.suggestions.concat(newSuggestion)
    }));
  }

  render() {
    return (
      <div className="App">
        <SuggestionList suggestions={this.state.suggestions} />
        <Form onSubmit={this.addNewSuggestion} />
      </div>
    );
  }
}

export default App;
