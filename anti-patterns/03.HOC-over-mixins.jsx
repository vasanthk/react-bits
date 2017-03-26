/**
 * Use Higher order components over Mixins
 *
 * @Reference:
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 * https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html
 * http://stackoverflow.com/questions/21854938/using-mixins-vs-components-for-code-reuse-in-facebook-react
 * http://stackoverflow.com/questions/30845561/how-to-solve-this-using-composition-instead-of-mixins-in-react
 */

/**
 * SIMPLE EXAMPLE
 */
// With Mixin
var WithLink = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {message: 'Hello!'};
  },
  render: function () {
    return <input type="text" valueLink={this.linkState('message')}/>;
  }
});

// Move login to a HOC
var WithLink = React.createClass({
  getInitialState: function () {
    return {message: 'Hello!'};
  },
  render: function () {
    return <input type="text" valueLink={LinkState(this,'message')}/>;
  }
});

/**
 * ELABORATE EXAMPLE
 */

// With Mixin
var CarDataMixin = {
  componentDidMount: {
    // fetch car data and
    // call this.setState({carData: fetchedData}),
    // once data has been (asynchronously) fetched
  }
};

var FirstView = React.createClass({
  mixins: [CarDataMixin],
  render: function () {
    return (
      <div>
        <AvgSellingPricesByYear country="US" dataset={this.state.carData}/>
        <AvgSellingPricesByYear country="UK" dataset={this.state.carData}/>
        <AvgSellingPricesByYear country="FI" dataset={this.state.carData}/>
      </div>
    )
  }
});

// With HOC
var bindToCarData = function (Component) {
  return React.createClass({
    componentDidMount: {
      // fetch car data and
      // call this.setState({carData: fetchedData}),
      // once data has been (asynchronously) fetched
    },

    render: function () {
      return <Component carData={ this.state.carData }/>
    }
  });
};

// Then wrap your component when you define it.
var FirstView = bindToCarData(React.createClass({
  render: function () {
    return (
      <div>
        <AvgSellingPricesByYear country="US" dataset={this.props.carData}/>
        <AvgSellingPricesByYear country="UK" dataset={this.props.carData}/>
        <AvgSellingPricesByYear country="FI" dataset={this.props.carData}/>
      </div>
    )
  }
}));