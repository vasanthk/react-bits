/**
 * The class definition for can be organized as follows:
 *
 * class definition
 *    constructor
 *        event-handlers
 *    component life-cycle events
 *    getters
 *    setters
 * defaultProps
 * propTypes
 *
 */

class Car extends React.Component {
  constructor(props) {
    super(props);

    this.state = {running: false};

    this.handleClick = () => {
      this.setState({running: !this.state.running});
    };
  }

  componentWillMount() {
    // add event listeners (Flux Store, WebSocket, document, etc.)
  }

  componentDidMount() {
    // React.findDOMNode()
  }

  componentWillUnmount() {
    // remove event listeners (WebSocket, document, etc.)
  }

  get engineStatus() {
    return (this.state.running) ? "is running" : "is off";
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.make} {this.engineStatus}
      </div>
    );
  }
}

Car.defaultProps = {
  make: 'Toyota'
};

Car.propTypes = {
  make: React.PropTypes.string
};

/**
 * Initializing state - You can do it without the constructor too.
 */

class ProfileContainer extends Component {
  state = {activeProfile: true};

  render() {
    return (
      <div>
        Is Profile Active: {this.state.activeProfile}
      </div>
    );
  }
}
