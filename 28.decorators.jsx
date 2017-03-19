/**
 * Decorators (supported by Babel, in Stage 2 proposal as of 03/17)
 *
 * If you’re using something like mobx, you can decorate your class components — which is the same as passing the component into a function.
 * Decorators are flexible and readable way of modifying component functionality.
 *
 * Related:
 * https://twitter.com/dan_abramov/status/628202050946514944
 * https://medium.com/@gigobyte/enhancing-react-components-with-decorators-441320e8606a
 * http://stackoverflow.com/questions/36553814/what-is-the-use-of-connect-decorator-in-react-redux
 * http://stackoverflow.com/questions/36286384/decorators-with-react-components
 */

// Non-decorators approach
class ProfileContainer extends Component {
  // Component code
}
export default observer(ProfileContainer)

// With decorators
@observer
export default class ProfileContainer extends Component {
  // Component code
}