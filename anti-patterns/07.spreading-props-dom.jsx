/**
 * Spreading props on DOM elements
 * When we spread props we run into the risk of adding unknown HTML attributes, which is a bad practice.
 *
 *
 * @Reference:
 * React Design Patterns and best practices by Michele Bertoli
 */

// BAD
// This will try to add the unknown HTML attribute `flag` to the DOM element

const Sample = () => (<Spread flag={true} className="content"/>);
const Spread = (props) => (<div {...props}>Test</div>);

// GOOD
// By creating props specifically for DOM attribute, we can safely spread.
const Sample = () => (<Spread flag={true} domProps={{className: "content"}}/>);
const Spread = (props) => (<div {...props.domProps}>Test</div>);