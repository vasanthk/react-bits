/**
 * Conditionals in JSX
 *
 * @Reference:
 * https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8
 *
 */

// Instead of
const sampleComponent = () => {
  return isTrue ? <p>True!</p> : <none/>
};

// Use short-circuit evaluation
const sampleComponent = () => {
  return isTrue && <p>True!</p>
};

/**
 * For Complex scenarios with too many ternaries:
 * Best approach: Move logic to subcomponents
 * Alternate hacky approach: Use IIFE
 */

// Y soo many ternary??? :-/
const sampleComponent = () => {
  return (
    <div>
      {flag && flag2 && !flag3
        ? flag4
        ? <p>Blah</p>
        : flag5
        ? <p>Meh</p>
        : <p>Herp</p>
        : <p>Derp</p>
      }
    </div>
  )
};

// There are some libraries that solve this problem (JSX-Control Statements), but rather than introduce another dependency
// use an IIFE and return values by using if-else statement inside
// IIFE Reference: http://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript

const sampleComponent = () => {
  return (
    <div>
      {
        (() => {
          if (flag && flag2 && !flag3) {
            if (flag4) {
              return <p>Blah</p>
            } else if (flag5) {
              return <p>Meh</p>
            } else {
              return <p>Herp</p>
            }
          } else {
            return <p>Derp</p>
          }
        })()
      }
    </div>
  )
};