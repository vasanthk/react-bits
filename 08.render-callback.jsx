// Here’s a component that uses a Render callback. It’s not useful, but it’s an easy illustration to start with.

const Width = ({ children }) => children(500)
// The component calls children as a function, with some number of arguments. Here, it’s the number 500.
// To use this component, we give it a function as children.

(<Width>
  {width => <div>window is {width}</div>}
</Width>)

// We get this output.
<div>window is 500</div>

//With this setup, we can use this width to make rendering decisions.
(<Width>
{width =>
width > 600
  ? <div>min-width requirement met!</div>
  : null
}
</Width>)

// If we plan to use this condition a lot, we can define another components to encapsulate the reused logic.
const MinWidth = ({ width: minWidth, children }) =>
(<Width>
  {width =>
    width > minWidth
      ? children
      : null
  }
</Width>);

// Obviously a static Width component isn’t useful but one that watches the browser window is. Here’s a sample implementation.
class WindowWidth extends React.Component {
  constructor () {
    super();
    this.state = { width: 0 };
  }

  componentDidMount() {
    this.setState(
      {width: window.innerWidth},
      window.addEventListener(
        "resize",
        ({target}) => this.setState({widthe: target.innerWidth})
      )
    )
  }

  render() {
    return this.props.children(this.state.width);
  }
}

// Many developers favor Higher Order Components for this type of functionality. It’s a matter of preference.