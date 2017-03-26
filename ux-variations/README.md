# Handling UX variations for multiple brands and apps


## [Slides from my talk](https://speakerdeck.com/vasa/building-multitenant-ui-with-react-dot-js)


A few general coding principles which help write reusable React components

## Single Responsibility Principle

**In React**

Components/Containers code must essentially deal with only one chunk of the UI feature/functionality.

* Eg. Shipping Address component

* Address container (Only has address related fields), Name container (first and last name), Phone component, State, City and Zip code container

**In Redux**

All API related call go into Redux thunks/other async handling sections (redux-promise, sagas etc)

* The thunks are responsible only for the dispatching action on AJAX begin/fail and complete.

* Any routing has to be dealt with the receiving component via a promise.

## Keep it Simple Stupid (KISS)

* Essentially, if the component needs no state - use stateless functions.

* Perf matters: **Stateless fns > ES6 class components > React.createClass()**

* Don’t pass any more props than required {...this.props} only if the list is big -- if not pass individual props.

* Too much flows of control (If-else variations) inside the component is usually a red-flag. This most likely means - need to split up the component or create a separate variation.

* Don’t optimize prematurely - Making the current component reusable with current variations known.

## Articles

[Building React Components for Multiple Brands and Applications](https://medium.com/walmartlabs/building-react-components-for-multiple-brands-and-applications-7e9157a39db4)

