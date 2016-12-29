/**
 * Controlled - Uncontrolled Components
 * Gist: https://gist.github.com/vasanthk/a6bf35857749b09275a339f6fd9469bb
 *
 * @Reference:
 * https://www.sitepoint.com/video-controlled-vs-uncontrolled-components-in-react/
 *
 */

// It’s hard to talk about controlled inputs in the abstract. Let’s start with an uncontrolled (normal) input and go from there.

<input type="text" />
// When you fiddle with this input in the browser, you see your changes. This is normal.

// A controlled input disallows the DOM mutations that make this possible.
// You set the value of the input in component-land and it doesn’t change in DOM-land.

<input type="text" value="This won't change. Try it." />
// Obviously static inputs aren’t very useful to your users. So, we derive a value from state.

class ControlledNameInput extends React.Component {
  constructor() {
    super();
    this.state = {name: ""}
  }

  render() {
    return <input type="text" value={this.state.name} />
  }
};
// Then, changing the input is a matter of changing component state.
return (
  <input
    value={this.state.name}
    onChange={e => this.setState(e.target.value)}
  />
);

// This is a controlled input. It only updates the DOM when state has changed in our component. This is invaluable when creating consistent UIs.
// If you’re using stateless functions for form elements, read about using state hoisting to move new state up the component tree.