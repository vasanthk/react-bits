/**
 * Stateless functions don’t hold state (as the name implies).
 */

// Events are changes in state. Their data needs to be passed to stateful container components parents.
// This is called “state hoisting”. It’s accomplished by passing a callback from a container component to a child component.
class NameContainer extends React.Component {
  render() {
    return <Name onChange={newName => alert(newName)}/>
  }
}

const Name = ({ onChange }) =>
  <input onChange={e => onChange(e.target.value)}/>

// Name receives an onChange callback from NameContainer and calls on events.
// The alert above makes for a terse demo but it’s not changing state. Let’s change the internal state of NameContainer.

class NameContainer extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return <Name onChange={newName => this.setState({name: newName})}/>
  }
}

// The state is hoisted to the container, by the provided callback, where it’s used to update local state.
// This sets a nice clear boundary and maximizes the re-usability of stateless function.
// This pattern isn’t limited to stateless functions. Because stateless function don’t have lifecycle events,
// you’ll use this pattern with component classes as well.
// Controlled input is an important pattern to know for use with state hoisting
// (It’s best to process the event object on the stateful component)