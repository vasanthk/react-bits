/**
 * Decorators (supported by Babel, in Stage 2 proposal as of 03/17)
 *
 * If you’re using something like mobx, you can decorate your class components — which is the same as passing the component into a function.
 * Decorators are flexible and readable way of modifying component functionality.
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