import React, { Component } from 'react';
import SuggestionList from './SuggestionList';
import Form from './Form';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import domo from 'ryuu.js';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fc8f13',
      dark: '#ed8003',
      contrastText: '#fff'
    }
  }
});

class App extends Component {
  state = { suggestions: [] }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  post(url, body) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('POST', `${url}?append=latest`);
      req.setRequestHeader('Accept', 'application/json');
      req.setRequestHeader('Content-Type', 'text/csv');
      req.onload = () => { resolve(JSON.parse(req.response)) }
      req.onerror = () => { reject(Error("Network Error")); };
      req.send(body);
    })
  }

  addNewSuggestion = (message) => {
    const newSuggestion = {
      id: this.uuidv4(),
      message: message,
      done: false,
    };
    this.post('data/v1/suggestions/dataversions', Object.values(newSuggestion).toString())
    .then(resp => {
      this.setState(prevState => {
        newSuggestion.totalPlusOne = 0;
        return { suggestions: prevState.suggestions.concat(newSuggestion) };
      });
    });
  }

  onPlusOne = (id) => {
    this.post('/data/v1/votes/dataversions', id)
      .then(() => {
        this.setState(prevState => {
          const suggestion = prevState.suggestions.find(s => s.id === id);
          suggestion.totalPlusOne++;
          prevState.suggestions.sort((a, b) => b.totalPlusOne - a.totalPlusOne);
          return { suggestions: prevState.suggestions };
        });
      });
  }

  componentDidMount() {
    domo.getAll([
      '/data/v1/suggestions',
      '/data/v1/votes'
    ])
    .then(data => {
      const votesById = data[1].reduce((memo, d) => {
        memo[d.id] = memo[d.id] || 0;
        memo[d.id]++;
        return memo;
      }, {});
      
      const suggestions = data[0]
        .filter(d => d.done === 'false')
        .map(d => ({...d, totalPlusOne: votesById[d.id] || 0}))
        .sort((a, b) => b.totalPlusOne - a.totalPlusOne);

      this.setState({
        suggestions: suggestions
      });
    });

    domo.onDataUpdate(() => {}); // noop so the app doesn't refresh every we append to the dataset
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <SuggestionList
            suggestions={this.state.suggestions}
            onPlusOne={this.onPlusOne}
          />
          <Form onSubmit={this.addNewSuggestion} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
