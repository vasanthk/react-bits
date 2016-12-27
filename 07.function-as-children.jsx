// Using a function as children isn’t inherently useful.

<div>{
  () => { return "hello world!" }()
  }</div>

// However, it can be used in component authoring for some serious power. This technique is commonly referred to as render callbacks.
// This is a powerful technique used by libraries like ReactMotion. When applied, rendering logic can be kept in the owner component, instead of being delegated.