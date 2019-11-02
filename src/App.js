import React, { Component } from 'react';
import shortId from 'short-id';
import Clock from './Clock';
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
      currentName: "",
      currentTimeZone: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  };

  handleAdd(e) {
    e.preventDefault();
    this.setState({
      clocks: [
        ...copyArrayOfObjects(this.state.clocks), 
        {
          name: this.state.currentName, 
          timeZone: this.state.currentTimeZone, 
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
    const { currentName, currentTimeZone, clocks } = this.state;
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleAdd}>
          <label htmlFor="currentName">Название</label>
          <input name="currentName" type="text" value={currentName} onChange={this.handleChange} />
          <label htmlFor="currentTimeZone">Временная зона</label>
          <input name="currentTimeZone" type="text" value={currentTimeZone} onChange={this.handleChange} />
          <input type="submit" value="добавить"/>
        </form>
        <div>
          {
            clocks.map(clock => <Clock key={clock.id} clock={clock} handleDelete={this.handleDelete}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
