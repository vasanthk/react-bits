/**
 * Dependency Injection
 *
 * @Reference:
 * What is Dependency Injection?
 * https://www.youtube.com/watch?v=IKD2-MAkXyQ
 *
 * DI in JavaScript:
 * https://www.youtube.com/watch?v=jXhdOTw1q5Q
 * http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript
 *
 * In React:
 * https://github.com/krasimir/react-in-patterns/tree/master/patterns/dependency-injection
 */

// In React the need of dependency injector is easily visible. Let's consider the following application tree:

// Title.jsx
export default function Title(props) {
  return <h1>{ props.title }</h1>;
}

// -----------------------------------
// Header.jsx
import Title from './Title.jsx';
export default function Header() {
  return (
    <header>
      <Title />
    </header>
  );
}

// -----------------------------------
// App.jsx
import Header from './Header.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: 'React Dependency Injection' };
  }
  render() {
    return <Header />;
  }
}
// The string "React Dependency Injection" should somehow reach the Title component.
// The direct way of doing this is to pass it from App to Header and then Header to pass it to Title.
// However, this may work for these three components but what happens if there are multiple properties and deeper nesting.
// Lots of components will have to mention properties that they are not interested in.
// It is clear that most React components receive their dependencies via props but the question is how these dependencies reach that point.


// One way to achieve dependency injection is by using higher-order component may be used to inject data.

// inject.jsx
var title = 'React Dependency Injection';
export default function inject(Component) {
  return class Injector extends React.Component {
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          title={ title }
        />
      )
    }
  };
}

// Title.jsx
export default function Title(props) {
  return <h1>{ props.title }</h1>;
}

// -----------------------------------
// Header.jsx
import inject from './inject.jsx';
import Title from './Title.jsx';

var EnhancedTitle = inject(Title);
export default function Header() {
  return (
    <header>
      <EnhancedTitle />
    </header>
  );
}

// The title is hidden in a middle layer (higher-order component) where we pass it as a prop to the original Title component.
// That's all nice but it solves only half of the problem.
// Now we don't have to pass the title down the tree but how this data will reach the enhance.jsx helper.

// Using React's context
// React has the concept of context. The context is something that every component may have access to.
// It's something like an event bus but for data. A single model which we can access from everywhere.

// a place where we'll define the context
var context = { title: 'React in patterns' };
class App extends React.Component {
  getChildContext() {
    return context;
  }
  // ...
}

App.childContextTypes = {
  title: React.PropTypes.string
};

// a place where we need data
class Inject extends React.Component {
  render() {
    var title = this.context.title;
  // ...
  }
}
Inject.contextTypes = {
  title: React.PropTypes.string
};

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
