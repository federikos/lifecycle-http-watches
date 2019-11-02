import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      rafId: null,
    }
    this.repeatOften = this.repeatOften.bind(this);
  }

  repeatOften() {
    const clock = this.props.clock;
    const offset = parseInt(clock.timeZone);

    this.setState({
      hours: moment().utcOffset(offset).hours(),
      minutes: moment().utcOffset(offset).minutes(),
      seconds: moment().utcOffset(offset).seconds(),
      rafId: requestAnimationFrame(this.repeatOften),
    })
  }

  componentDidMount() {
    requestAnimationFrame(this.repeatOften);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.rafId);
  }

  render() {
    const {hours, minutes, seconds} = this.state;
    const {handleDelete, clock} = this.props;

    return (
      <div className="clock-wrapper">
        <span className="clock-name">{clock.name}</span>
        <div className="clock-watches">
          <div className="clock-hand clock-hand__hours" style={{transform: `rotate(${hours * 360 / 12}deg)`}}></div>
          <div className="clock-hand" style={{transform: `rotate(${minutes * 360 / 60}deg)`}}></div>
          <div className="clock-hand clock-hand__seconds" style={{transform: `rotate(${seconds * 360 / 60}deg)`}}></div>
          <button className="clock-btn" onClick={() => handleDelete(clock.id)} aria-label="delete clock">x</button>
        </div>
        <span className="clock-digital">{`${hours}:${minutes}:${seconds}`}</span>
      </div>
    );
  }
}

export default Clock;