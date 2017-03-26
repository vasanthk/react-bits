/**
 * Avoid async initialization in componentWillMount()
 *
 * componentWillMount() is invoked immediately before mounting occurs.
 * It is called before render(), therefore setting state in this method will not trigger a re-rendering.
 * Avoid introducing any side-effects or subscriptions in this method.
 */

// Make async calls for component initialization in componentDidMount instead of componentWillMount
function componentDidMount() {
  axios.get(`api/messages`)
    .then((result) => {
      const messages = result.data
      console.log("COMPONENT WILL Mount messages : ", messages);
      this.setState({
        messages: [...messages.content]
      })
    })
}