/**
 * Best practices and concentions with using Functional components
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

