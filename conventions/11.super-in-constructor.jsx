/**
 * ES6 class constructor super()
 *
 * Is it necessary to call super() inside constructor?
 * What is the difference between callling super() and super(props)?
 *
 * @Reference:
 * http://cheng.logdown.com/posts/2016/03/26/683329
 * http://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e
 */

/**
 * Is it necessary to call super() inside constructor?
 * Always call super() if you have a constructor and don't worry about it if you don't have a constructor.
 */

// Calling super() is necessary only if you need to have a constructor. Take a look at this code:
class MyClass extends React.component {
  render() {
    return <div>Hello { this.props.world }</div>;
  }
}

// You don't have to call super() for every react component you create. However, if there is a constructor in your code, then you MUST call super:
class MyClass extends React.component {
  constructor() {
    console.log(this); //Error: 'this' is not allowed before super()
    // The reason why this cannot be allowed before super() is because this is uninitialized if super() is not called.
  }
}

// You may think you can get away with an empty constructor without callling super():
// ES6 class constructors MUST call super if they are subclasses.
// Thus, you have to call super() as long as you have a constructor. (But a subclass does not have to have a constructor)
class MyClass extends React.component {
  constructor() {
  } // Error: missing super() call in constructor
}

/**
 * What is the difference between callling super() and super(props)?
 * Call super(props) only if you want to access this.props inside the constructor. React automatically set it for you if you want to access it anywhere else.
 */

//The effect of passing props when calling super() allows you to access this.props in the constructor:
class MyClass extends React.component {
  constructor(props) {
    super();
    console.log(this.props); // this.props is undefined
  }
}

//To fix it:
class MyClass extends React.component {
  constructor(props) {
    super(props);
    console.log(this.props); // prints out whatever is inside props
  }
}

// There is no need to pass props into the constructor if you want to use it in other places. Because React automatically set it for you
class MyClass extends React.component {
  render() {
    // There is no need to call `super(props)` or even having a constructor
    // this.props is automatically set for you by React
    // not just in render but another where else other than the constructor
    console.log(this.props);  // it works!

  }
}


