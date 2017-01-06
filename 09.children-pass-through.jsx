/**
 * Children types
 * http://krasimirtsonev.com/blog/article/children-in-jsx
 */

// You might create a component designed to apply context and render its children.

class SomeContextProvider extends React.Component {
  getChildContext() {
    return {some: "context"}
  }

  render() {
    // how best do we return `children`?
  }
}

// You’re faced with a decision. Wrap children in an extraneous <div /> or return children directly.
// The first options gives you extra markup (which can break some stylesheets). The second will result in unhelpful errors.

// option 1: extra div
return <div>{children}</div>;

// option 2: unhelpful errors
return children;

// It’s best to treat children as an opaque data type. React provides React.Children for dealing with children appropriately.
return React.Children.only(this.props.children);

// Note: We should mention that there is no API that allow us accessing child's state. Or in other words we can't use this.props.children[0].state or something like that.
// The proper way of retrieving information from the children is by using props (passing callbacks).
// And that's a good thing. This approach forces us defining clear APIs and encourage the one-way direction data flow.

// Passing a child as a property
// Every React component receive props. It's nice that these props may contain all kind of data. Even other components.

// App.jsx
class App extends React.Component {
  render() {
    var title = <h1>Hello there!</h1>;

    return (
      <Header title={ title }>
        <Navigation />
      </Header>
    );
  }
}

// Header.jsx
export default class Header extends React.Component {
  render() {
    return (
      <header>
        { this.props.title }
        <hr />
        { this.props.children }
      </header>
    );
  }
};
// This technique is helpful when we have a mix between components that exist inside the Header and components that have to be provided from the outside.


// Using JSX Expression
function UserName(props) {
  return (
    <div>
      <b>{props.children.lastName}</b>
      {props.children.firstName}
    </div>
  );
}

function App() {
  var user = {
    firstName: 'Vasanth',
    lastName: 'Krishnamoorthy'
  };

  return(
    <UserName>{ user }</UserName>
  )
}

// This may look weird but may be useful in some cases. Like for example when we have some knowledge in the parent component and don’t necessary want to send it down the tree.
// The example below prints a list of TODOs.
// The App component has all the data and knows how to determine whether a TODO is completed or not.
// The TodoList component simply encapsulate the needed HTML markup.

function TodoList(props) {
  const renderTodo = (todo, i) => {
    return (
      <li key={ i }>
        { props.children(todo) }
      </li>
    );
  };
  return (
    <section className='main-section'>
      <ul className='todo-list'>{ props.todos.map(renderTodo)}</ul>
    </section>
  );
}

function App() {
  const todos = [
    { label: 'Write tests', status: 'done' },
    { label: 'Sent report', status: 'progress' },
    { label: 'Answer emails', status: 'done' }
  ];
  var isCompleted = todo => todo.status === 'done';

  return (
    <TodoList todos={ todos }>
      { todo => isCompleted(todo) ? <b>{ todo.label }</b> : todo.label }
    </TodoList>
  );
}

// Notice how the App component doesn’t expose the structure of the data. TodoList has no idea that there is label or status properties.
// When I first saw that pattern I was thinking “How’s that different by passing an additional prop?”. For example:

  <TodoList
    todos={ todos }
    renderTodo= {
      (todo) => isCompleted(todo) ? <b>{ todo.label }</b> : todo.label
    }
  />

// With `props.children`. It becomes obvious that the expression is used for rendering the children of the component.
// From another point of view having an explicit method like renderTodo makes it even clearer. So, I guess it is more or less a personal feeling.
// Vasa: Personally I like renderTodo() function being passed to the component (or) having it inside the component.