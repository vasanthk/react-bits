// It is a good practice that our context is not just a plain object but it has an interface that allows us to store and retrieve data. For example:

// dependencies.js
export default {
  data: {},
  get(key) {
    return this.data[key];
  },
  register(key, value) {
    this.data[key] = value;
  }
}

//Then, if we go back to our example, the very top App component may look like that:
import dependencies from './dependencies';
dependencies.register('title', 'React in patterns');

class App extends React.Component {
  getChildContext() {
    return dependencies;
  }
  render() {
    return <Header />;
  }
}

App.childContextTypes = {
  data: React.PropTypes.object,
  get: React.PropTypes.func,
  register: React.PropTypes.func
};
// And our Title component gets it's data through the context:

// Title.jsx
export default class Title extends React.Component {
  render() {
    return <h1>{ this.context.get('title') }</h1>
  }
}
Title.contextTypes = {
  data: React.PropTypes.object,
  get: React.PropTypes.func,
  register: React.PropTypes.func
};

// Ideally we don't want to specify the contextTypes every time when we need an access to the context.
// This detail may be wrapped in a higher-order component.
// And even more, we may write an utility function that is more descriptive and helps us declare the exact wiring.
// ie. instead of accessing the context directly with this.context.get('title') we ask the higher-order component to
// get what we need and to pass it as a prop to our component.
// For example:

// Title.jsx
import wire from './wire';

function Title(props) {
  return <h1>{ props.title }</h1>;
}

export default wire(Title, ['title'], function resolve(title) {
  return { title };
});

// The wire function accepts first a React component, then an array with all the needed dependencies
// (which are registered already) and then a function which I like to call mapper.
// It receives what's stored in the context as a raw data and returns an object which is the actual
// React props for our component (Title). In this example we just pass what we get - a title string variable.
// However, in a real app this could be a collection of data stores, configuration or something else.
// So, it's nice that we pass exactly what we need and don't pollute the components with data that they don't need.

// Here is how the wire function looks like:

export default function wire(Component, dependencies, mapper) {
  class Inject extends React.Component {
    render() {
      var resolved = dependencies.map(this.context.get.bind(this.context));
      var props = mapper(...resolved);

      return React.createElement(Component, props);
    }
  }
  Inject.contextTypes = {
    data: React.PropTypes.object,
    get: React.PropTypes.func,
    register: React.PropTypes.func
  };
  return Inject;
};

// Inject is a higher-order component that gets access to the context and retrieves all the items listed under dependencies array.
// The mapper is a function receiving the context data and transforms it to props for our component.