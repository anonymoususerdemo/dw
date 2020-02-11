import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form';
import Elections from './components/Elections';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        street: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
      },
      view: 'form',
      elections: null,
      error: false
    };

    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.setView = this.setView.bind(this);
  };
  
  getView() {
    switch (this.state.view) {
      case 'elections':
        return (
          <Elections 
          elections={ this.state.elections } 
          error={ this.state.error }  
          setView={ this.setView }/>
        );
      case 'form':
        return (
          <Form 
          formChange={ this.formChange } 
          formSubmit={ this.formSubmit }/>
        );
      default:
        return (
          <Form 
          formChange={ this.formChange } 
          formSubmit={ this.formSubmit }/>
        );
    };
  };

  clearError() {
    this.setState({ error: false });
  };

  setView(e) {
    const { name } = e.target;
    this.setState({ view: name });
    this.clearError();
  };

  formChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form, [name]: value
      },
    }));
  };

  // mixing conditional rendering and form submission here maybe I shoul've used hooks
  // assuming the form will be perfect
  formSubmit(e) {
    e.preventDefault();
    this.postForm();
    this.setState({
      view: 'elections'
    });
  };

  async postForm() {
    try {
      const req = await axios.post('http://localhost:3001/', this.state.form);
      this.setState({ elections: req.data });
    } catch(e) {
      console.error(e);
      this.setState({ error: true });
    };
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { this.getView() }
        </header>
      </div>
    );
  };
};

export default App;