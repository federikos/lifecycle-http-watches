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
      <div>
        {`${hours}:${minutes}:${seconds}`}
        <button onClick={() => handleDelete(clock.id)}>delete clock</button>
      </div>
    );
  }
}

export default Clock;