import React, { Component } from 'react';
import './App.css';
import SuggestionList from './SuggestionList';
import Form from './Form';
import domo from 'ryuu.js';

class App extends Component {
  state = { suggestions: [] }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  postNewSuggestion(suggestion) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('POST', 'data/v1/suggestions/dataversions?append=latest');
      req.setRequestHeader('Accept', 'application/json');
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = () => { resolve(JSON.parse(req.response)) }
      req.onerror = () => { reject(Error("Network Error")); };
      req.send(suggestion);
    })
  }

  addNewSuggestion = (message) => {
    const newSuggestion = {
      id: this.uuidv4(),
      message: message,
      totalPlusOne: 0,
      done: false
    };
    // fetch('data/v1/suggestions/dataversions?append=latest', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: newSuggestion
    // })
    this.postNewSuggestion(newSuggestion)
    .then(resp => {
      this.setState(prevState => ({
        suggestions: prevState.suggestions.concat(newSuggestion)
      }));
    });
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
    domo.get('/data/v1/suggestions')
      .then(data => {
        this.setState({
          suggestions: data
        });
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
