/**
 * Presentational and Container components
 *
 * Reference:
 * https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.mbglcakmp
 * https://github.com/krasimir/react-in-patterns/tree/master/patterns/presentational-and-container
 */

// PROBLEM

// Data and logic together.

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: this.props.time};
    this._update = this._updateTime.bind(this);
  }

  render() {
    var time = this._formatTime(this.state.time);
    return (
      <h1>{ time.hours } : { time.minutes } : { time.seconds }</h1>
    );
  }

  componentDidMount() {
    this._interval = setInterval(this._update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _formatTime(time) {
    var [ hours, minutes, seconds ] = [
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    ].map(num => num < 10 ? '0' + num : num);

    return {hours, minutes, seconds};
  }

  _updateTime() {
    this.setState({time: new Date(this.state.time.getTime() + 1000)});
  }
}

ReactDOM.render(<Clock time={ new Date() }/>, ...);

// SOLUTION

// Let's split the component into two parts - container and presentation.

// Container
// Containers know about data, it's shape and where it comes from. They know details about how the things work or the so called business logic.
// They receive information and format it so it is easy to use by the presentational component. Very often we use higher-order components to create containers.
// Their render method contains only the presentational component.

// Clock/index.js
import Clock from './Clock.jsx'; // <-- that's the presentational component

export default class ClockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: props.time};
    this._update = this._updateTime.bind(this);
  }

  render() {
    return <Clock { ...this._extract(this.state.time) }/>;
  }

  componentDidMount() {
    this._interval = setInterval(this._update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _extract(time) {
    return {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds()
    };
  }

  _updateTime() {
    this.setState({time: new Date(this.state.time.getTime() + 1000)});
  }
};

// Presentational component
// Presentational components are concert with how the things look. They have the additional markup needed for making the page pretty.
// Such components are not bound to anything and have no dependencies.
// Very often implemented as a stateless functional components they don't have internal state.

// Clock/Clock.jsx
export default function Clock(props) {
  var [ hours, minutes, seconds ] = [
    props.hours,
    props.minutes,
    props.seconds
  ].map(num => num < 10 ? '0' + num : num);

  return <h1>{ hours } : { minutes } : { seconds }</h1>;
};

// The nice things about containers is that they encapsulate logic and may inject data into different renderers.
// Very often a file that exports a container is not sending out a class directly but a function.
// For example, instead of using

import Clock from './Clock.jsx';
export default class ClockContainer extends React.Component {
  render() {
    return <Clock />;
  }
}

// We may export a function that accepts the presentational component:
export default function (Component) {
  return class Container extends React.Component {
    render() {
      return <Component />;
    }
  }
}
// Using this technique our container is really flexible in rendering its result.
// It will be really helpful if we want to switch from digital to analog clock representation.