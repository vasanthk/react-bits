/**
 * Context
 * https://facebook.github.io/react/docs/context.html
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