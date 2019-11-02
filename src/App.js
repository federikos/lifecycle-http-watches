import React, { Component } from 'react';
import shortId from 'short-id';
import Clock from './Clock';
import Form from './Form';
import './App.css';

const copyArrayOfObjects = (arr) => arr.map(obj => {
  return {...obj};
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [
        //{name: 'Minsk', timeZone: '3', id: 0, }
      ],
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd(e, name, timeZone) {
    e.preventDefault();
    this.setState({
      clocks: [
        ...copyArrayOfObjects(this.state.clocks), 
        {
          name: name, 
          timeZone: timeZone, 
          id: shortId.generate()
        }
      ]});
  }

  handleDelete(id) {
    this.setState(prevState => {
      const newClocks = prevState.clocks.filter(clock => clock.id !== id);
      return {
        clocks: newClocks
      }
    })
  }

  render() {
    const {clocks} = this.state;
    return (
      <div className="App">
        <Form handleAdd={this.handleAdd}/>
        <div className="clocks-wrapper">
          {
            clocks.map(clock => <Clock key={clock.id} clock={clock} handleDelete={this.handleDelete}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
