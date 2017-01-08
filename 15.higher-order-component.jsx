/**
 * A higher-order function is a function that takes and/or returns a function. It’s not more complicated than that. So, what’s a higher-order component?
 * If you’re already using container components, these are just generic containers, wrapped up in a function.
 *
 * Higher-order components look really similar to the decorator design pattern.
 * It is wrapping a component and attaching some new functionalities or props to it.
 */

// Let’s start with our stateless Greeting component.
const Greeting = ({ name }) => {
  if (!name) { return <div>Connecting...</div> }

  return <div>Hi {name}!</div>
};

// If it gets props.name, it’s gonna render that data. Otherwise it’ll say that it’s “Connecting…”.
// Now for the higher-order bit.

const Connect = ComposedComponent =>
  class extends React.Component {
    constructor() {
      super();
      this.state = { name: "" }
    }

    componentDidMount() {
      // this would fetch or connect to a store
      this.setState({ name: "Michael" })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          name={this.state.name}
        />
      )
    }
  };

// This is just a function that returns component that renders the component we passed as an argument.
// Last step, we need to wrap our our Greeting component in Connect.

const ConnectedMyComponent = Connect(Greeting);
// This is a powerful pattern for providing fetching and providing data to any number of stateless function components.


// Advantage of using HOC:
// HOCs give us control on the input data that we want to send as props.
// Let's say that we have a configuration setting that OriginalComponent needs:

var config = require('path/to/configuration');

var enhanceComponent = (Component) =>
  class Enhance extends React.Component {
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          title={ config.appTitle }
        />
      )
    }
  };

// The knowledge for the configuration is hidden into the higher-order component.
// OriginalComponent knows only that it receives a prop called title. Where it comes from it is not important.
// That's a huge advantage because it helps us testing the component in an isolation and provides nice mechanism for mocking.