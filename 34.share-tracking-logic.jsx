/**
 * Using HOC to share tracking logic across various UX components
 *
 * eg. Adding analytics tracking across various components.
 *
 * - Helps to keep it DRY (Do not Repeat Yourself)
 * - Removing tracking logic etc. from the presentational component makes it well testable, which is key.
 */

import tracker from './tracker.js';

// HOC
const pageLoadTracking = (ComposedComponent) => class HOC extends Component {
  componentDidMount() {
    tracker.trackPageLoad(this.props.trackingData);
  }

  componentDidUpdate() {
    tracker.trackPageLoad(this.props.trackingData);
  }

  render() {
    return <ComposedComponent {...this.props} />
  }
};

// Usage
import LoginComponent from "./login";

const LoginWithTracking = pageLoadTracking(LoginComponent);

class SampleComponent extends Component {
  render() {
    const trackingData = {/** Nested Object **/};
    return <LoginWithTracking trackingData={trackingData}/>
  }
}