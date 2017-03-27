/**
 * Best practices and conventions with using Functional components
 *
 * @Reference:
 * https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8
 */

/**
 * propTypes
 * Here, we assign the propTypes before the component declaration, so they are immediately visible.
 * We’re able to do this because of JavaScript function hoisting.
 */
import React from 'react'

SampleComponent.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  featureFlag: React.PropTypes.bool
};
// Component declaration

/**
 * Destructuring Props and defaultProps
 */
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  // Note: We can also use default arguments to act as defaultProps. If expanded is undefined, we set it to false.
  const formStyle = expanded ? {height: 'auto'} : {height: 0};
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

/**
 * Gotcha: Avoid the following ES6 syntax (Hopefully this is not an issue in future, since I love terseness <3)
 *
 * 1) This lack of name will not be a problem if your Babel is set up correctly — but if it’s not,
 * any errors will show up as occurring in <<anonymous>> which is terrible for debugging.
 *
 * 2) Unnamed functions can also cause problems with Jest, a React testing library.
 * Due to the potential for difficult-to-understand bugs (and the lack of real benefit) we recommend using function instead of const.
 */
const ExpandableForm = ({ onExpand, expanded, children }) => {};


/**
 * Wrapping Decorators
 *
 * Since you can’t use decorators with functional components, you simply pass it the function in as an argument
 */

function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}
export default observer(ExpandableForm)


