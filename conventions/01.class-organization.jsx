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
 * @Reference:
 * https://github.com/planningcenter/react-patterns#component-organization
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

/**
 * propTypes and defaultProps
 *
 * propTypes and defaultProps can be declared as static properties.
 * They should be immediately visible to other devs reading the file an declared higher up in the file, since they serve as documentation.
 */

class ProfileContainer extends Component {
  state = {activeProfile: false};

  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  };

  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  };

  render() {
    return (
      <div>
        Is Profile Active: {this.state.activeProfile}
      </div>
    );
  }
}

/**
 * Class methods (using arrow functions)
 * With class components, when you pass methods to subcomponents, you have to ensure that they have the right `this` when they’re called.
 * This is usually achieved by passing this.handleSubmit.bind(this) to the subcomponent.
 * However using arrow functions does not create its own this context, so this has its original meaning from the enclosing context.
 */

class ProfileContainer extends Component {
  state = {activeProfile: false};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.model.save()
  };

  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  };

  handleExpand = (e) => {
    e.preventDefault();
    this.setState({activeProfile: !this.state.activeProfile})
  };

  render() {
    return (
      <div>
        Is Profile Active: {this.state.activeProfile}
      </div>
    );
  }
}