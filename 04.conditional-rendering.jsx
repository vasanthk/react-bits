/**
 * You can’t use regular if/else conditions inside a component definition. The conditional (ternary) operator is your friend.
 */

//if
function render() {
  return condition && <span>Rendered when `truthy`</span>
}

// unless
function render() {
  return condition || <span>Rendered when `falsey`</span>
}

// if- else (tidy one - liners)
function render() {
  return condition
    ? <span>Rendered when `truthy`</span>
    : <span>Rendered when `falsey`</span>
}

// if- else (big blocks)
function render() {
  return condition ? (
    <span>
    Rendered when `truthy`
  </span>
  ) : (
    <span>
    Rendered when `falsey`
  </span>
  )
}