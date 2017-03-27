/**
 * Using Higher order components (HOC) for UX variations
 *
 * eg. Toggling features On/Off
 */

// featureToggle.js
const isFeatureOn = function (featureName) {
  // return true or false
};

import {isFeatureOn} from './featureToggle';

const toggleOn = (featureName, ComposedComponent) => class HOC extends Component {
  render() {
    return isFeatureOn(featureName) ? <ComposedComponent {...this.props} /> : null;
  }
};

// Usage
import AdsComponent from './Ads'
const Ads = toggleOn('ads', AdsComponent);
