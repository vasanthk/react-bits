/**
 * Use Recompose to memoize prop values
 *
 * @Reference:
 * https://github.com/acdlite/recompose#composition
 */


// BAD
export default (props, context) => {
  // ... do expensive compute on props ...
  return <SomeComponent {...props} />
}


// GOOD
import { pure } from 'recompose';
// This won't be called when the props DONT change
export default pure((props, context) => {
  // ... do expensive compute on props ...
  return <SomeComponent someProp={props.someProp}/>
})