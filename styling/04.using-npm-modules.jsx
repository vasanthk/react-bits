/**
 * Using npm modules
 * For more complex color/style transformation logic, it's always god to use it from a separate npm module (or) create one.
 *
 * @Reference:
 * http://jxnblk.com/writing/posts/patterns-for-style-composition-in-react/
 */

// Example
// For darkening scales in CSS you can use `chroma-js` module
import chroma from 'chroma-js'

const alpha = (color) => (a) => chroma(color).alpha(a).css();

const darken = alpha('#000');

const shade = [
  darken(0),
  darken(1 / 8),
  darken(1 / 4)
  // More...
];

const blueAlpha = [
  alpha(blue)(0),
  alpha(blue)(1 / 4),
  alpha(blue)(1 / 2),
  alpha(blue)(3 / 4),
  alpha(blue)(1)
];
