/**
 * Reaching into a Component
 *
 * Accessing a component from the parent.
 * eg. Autofocus an input (controlled by parent component)
 *
 * @Reference:
 * https://hackernoon.com/10-react-mini-patterns-c1da92f068c5
 */

// Child Component
// An input component with a focus() method that focuses the HTML element
class Input extends Component {
  focus() {
    this.el.focus();
  }

  render() {
    return (
      <input
        ref={el=> { this.el = el; }}
      />
    );
  }
}

// Parent Component
// In the parent component, we can get a reference to the Input component and call its focus() method.
class SignInModal extends Component {
  componentDidMount() {
    // Note that when you use ref on a component, it’s a reference to
    // the component (not the underlying element), so you have access to its methods.
    this.InputComponent.focus();
  }

  render() {
    return (
      <div>
        <label>User name:</label>
        <Input
          ref={comp => { this.InputComponent = comp; }}
        />
      </div>
    )
  }
}