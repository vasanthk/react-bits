/**
 * Use findDOMNode() over callback refs
 *
 * Note:
 * React also supports using a string (instead of a callback) as a ref prop on any component, although this approach is mostly legacy at this point.
 * https://facebook.github.io/react/docs/more-about-refs.html
 * http://stackoverflow.com/questions/37468913/why-ref-string-is-legacy
 *
 * @Reference:
 * https://github.com/yannickcr/eslint-plugin-react/issues/678#issue-165177220
 */

/**
 * findDOMNode(this)
 */

// Before:
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }

  render() {
    return <div />
  }
}

// After:
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
    return <div ref={node => this.node = node}/>
  }
}
/**
 * findDOMNode(stringDOMRef)
 */

// Before:
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this.refs.something).scrollIntoView();
  }

  render() {
    return (
      <div>
        <div ref='something'/>
      </div>
    )
  }
}

// After:
class MyComponent extends Component {
  componentDidMount() {
    this.something.scrollIntoView();
  }

  render() {
    return (
      <div>
        <div ref={node => this.something = node}/>
      </div>
    )
  }
}
/**
 * findDOMNode(childComponentStringRef)
 */

// Before:
class Field extends Component {
  render() {
    return <input type='text'/>
  }
}

class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this.refs.myInput).focus();
  }

  render() {
    return (
      <div>
        Hello,
        <Field ref='myInput'/>
      </div>
    )
  }
}

// After:
class Field extends Component {
  render() {
    return (
      <input type='text' ref={this.props.inputRef}/>
    )
  }
}

class MyComponent extends Component {
  componentDidMount() {
    this.inputNode.focus();
  }

  render() {
    return (
      <div>
        Hello,
        <Field inputRef={node => this.inputNode = node}/>
      </div>
    )
  }
}