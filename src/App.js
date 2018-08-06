import React, { Component } from 'react';
import './App.css';
import SuggestionList from './SuggestionList';
import Form from './Form';

class App extends Component {
  state = { suggestions: [] }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addNewSuggestion = (message) => {
    const newSuggestion = {
      id: this.uuidv4(),
      message: message,
      totalPlusOne: 0,
    };
    this.setState(prevState => ({
      suggestions: prevState.suggestions.concat(newSuggestion)
    }));
  }

  onPlusOne = (index) => {
    this.setState(prevState => {
      const suggestion = prevState.suggestions[index];
      suggestion.totalPlusOne++;
      prevState.suggestions.sort((a, b) => b.totalPlusOne - a.totalPlusOne);
      return { suggestions: prevState.suggestions };
    });
  }

  componentDidMount() {
    fetch('/data/v1/suggestions')
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
      });
  }

  render() {
    return (
      <div className="App">
        <SuggestionList
          suggestions={this.state.suggestions}
          onPlusOne={this.onPlusOne}
        />
        <Form onSubmit={this.addNewSuggestion} />
      </div>
    );
  }
}

export default App;
