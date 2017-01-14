/**
 * Try as much to avoid computations/vars in render
 * This is because these vars are created and garbage collected soon after with each render (expensive)
 *
 */

// BAD
render () {
  let make = `Make: ${this.props.make}`;

  return <div>{name}</div>;
}

// GOOD
render () {
  return <div>{`Make: ${this.props.make}`}</div>;
}

// GOOD
get make () {
  return `Make: ${this.props.make}`;
}

render () {
  return <div>{this.make}</div>;
}