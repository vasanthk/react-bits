/**
 * Using getters for computed props/state
 */

// Computed props

// BAD
makeAndName () {
  return `${this.props.make} ${this.props.name}`;
}

// GOOD
get brand () {
  return `${this.props.make} ${this.props.name}`;
}

// Computed State

// BAD
isAccelerating () {
  return this.state.isRunning && this.state.pushingPedal;
}

// GOOD
get isAccelerating () {
  return this.state.isRunning && this.state.pushingPedal;
}

render () {
  return (
    <div>
      {this.props.brand}
      {(this.state.running)
        ? <span>is running</span>
        : null
      }
    </div>
  );
}