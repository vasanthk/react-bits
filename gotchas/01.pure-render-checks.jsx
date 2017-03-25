/**
 * Pure Render Checks
 *
 * Pure render?
 * With React.js pure render I mean components that implement the shouldComponentUpdate method with shallow equality checks.
 * Examples of this are the React.PureComponent, PureRenderMixin, recompose/pure and many others.
 *
 * @Reference:
 * https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f
 */


/**
 * CASE 1
 */

// BAD
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          // The issue is with {this.props.options || []} - it caused all the cells to be re-rendered even for a single cell change.
          // Why?
          // You see the options array was passed deep down in the Cell elements. Normally this would not be an issue.
          // The other Cell elements would not be re-rendered because they can do the cheap shallow equality check and
          // skip the render entirely but in this case the options prop was null and the default array was used.
          // As you should know the array literal is the same as new Array() which creates a new array instance.
          // This completely destroyed every pure render optimization inside the Cell elements.
          // In Javascript different instances have different identities and thus the shallow equality check always
          // produces false and tells React to re-render the components.
          <Cell data={i} options={this.props.options || []}/>
        )}
      </div>
    );
  }
}

// GOOD
const defaultval = [];  // <---  The fix (defaultProps could also have been used).
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          <Cell data={i} options={this.props.options || defaultval}/>
        )}
      </div>
    );
  }
}

/**
 * CASE 2
 *
 * Similar issue with using functions in render() as well
 */

// BAD
class App extends PureComponent {
  render() {
    return <MyInput
      onChange={e => this.props.update(e.target.value)}/>;
  }
}
// BAD - again
class App extends PureComponent {
  update(e) {
    this.props.update(e.target.value);
  }

  render() {
    return <MyInput onChange={this.update.bind(this)}/>;
  }
}

// ^^In both cases a new function is created with a new identity. Just like with the array literal.
// We need to bind the function early

// GOOD
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    this.props.update(e.target.value);
  }

  render() {
    return <MyInput onChange={this.update}/>;
  }
}