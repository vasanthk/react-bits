/**
 * Components for formatting text
 *
 * Instead of formatting text by calling helper functions inside render, we can create a separate component that
 * handles this.
 *
 * @Reference:
 * https://hackernoon.com/10-react-mini-patterns-c1da92f068c5
 */

/**
 * WITH COMPONENT
 */
const Price = (props) => {
  // toLocaleString is not React specific syntax - it is a native JavaScript function used fo formatting
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  const price = props.children.toLocaleString('en', {
    style: props.showSymbol ? 'currency' : undefined,
    currency: props.showSymbol ? 'USD' : undefined,
    maximumFractionDigits: props.showDecimals ? 2 : 0
  });

  return <span className={props.className}>{price}</span>
};

Price.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.number,
  showDecimals: React.PropTypes.bool,
  showSymbol: React.PropTypes.bool,
};

Price.defaultProps = {
  children: 0,
  showDecimals: true,
  showSymbol: true,
};

const Page = () => {
  const lambPrice = 1234.567;
  const jetPrice = 999999.99;
  const bootPrice = 34.567;

  return (
    <div>
      <p>One lamb is <Price className="expensive">{lambPrice}</Price></p>
      <p>One jet is <Price showDecimals={false}>{jetPrice}</Price></p>
      <p>Those gumboots will set ya back <Price showDecimals={false} showSymbol={false}>{bootPrice}</Price> bucks.</p>
    </div>
  );
};

/**
 * WITHOUT COMPONENT
 */
function numberToPrice(num, options = {}) {
  const showSymbol = options.showSymbol !== false;
  const showDecimals = options.showDecimals !== false;

  return num.toLocaleString('en', {
    style: showSymbol ? 'currency' : undefined,
    currency: showSymbol ? 'USD' : undefined,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
}

const Page = () => {
  const lambPrice = 1234.567;
  const jetPrice = 999999.99;
  const bootPrice = 34.567;

  return (
    <div>
      <p>One lamb is <span className="expensive">{numberToPrice(lambPrice)}</span></p>
      <p>One jet is {numberToPrice(jetPrice, { showDecimals: false })}</p>
      <p>Those gumboots will set ya back {numberToPrice(bootPrice, { showDecimals: false, showSymbol: false })} bucks.</p>
    </div>
  );
};