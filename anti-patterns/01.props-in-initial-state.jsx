/**
 * Props in Initial State
 *
 * From docs:
 * Using props to generate state in getInitialState often leads to duplication of “source of truth”, i.e. where the real data is.
 * This is because getInitialState is only invoked when the component is first created.
 *
 * The danger is that if the props on the component are changed without the component being ‘refreshed’,
 * the new prop value will never be displayed because the constructor function (or getInitialState) will never update the current state of the component.
 * The initialization of state from props only runs when the component is first created.
 *
 * @Reference:
 * https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e
 *
 */

// Bad
class SampleComponent extends Component {
  // constructor function (or getInitialState)
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      inputVal: props.inputValue
    };
  }

  render() {
    return <div>{this.state.inputVal && <AnotherComponent/>}</div>
  }
}

// Good
class SampleComponent extends Component {
  // constructor function (or getInitialState)
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  render() {
    return <div>{this.props.inputValue && <AnotherComponent/>}</div>
  }
}