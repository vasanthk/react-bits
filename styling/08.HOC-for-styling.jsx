/**
 * Using HOC for styling
 * Sometimes there are isolated UI components that only require a minimal amount of state for interaction, and using them as standalone components is sufficient
 * eg. Interactions in a Carousel
 *
 * @Reference:
 * http://jxnblk.com/writing/posts/patterns-for-style-composition-in-react/
 */

// Example: Carousel
// The HOC will have a current slide index and have previous and next methods.


// Higher order component
import React from 'react'
// This could be named something more generic like Counter or Cycle
const CarouselContainer = (Comp) => {
  class Carousel extends React.Component {
    constructor() {
      super();
      this.state = {
        index: 0
      };
      this.previous = () => {
        const { index } = this.state;
        if (index > 0) {
          this.setState({index: index - 1})
        }
      };

      this.next = () => {
        const { index } = this.state;
        this.setState({index: index + 1})
      }
    }

    render() {
      return (
        <Comp
          {...this.props}
          {...this.state}
          previous={this.previous}
          next={this.next}/>
      )
    }
  }
  return Carousel
};
export default CarouselContainer;

// Using the HOC
// UI component
const Carousel = ({ index, ...props }) => {
  const length = props.length || props.children.length || 0;

  const sx = {
    root: {
      overflow: 'hidden'
    },
    inner: {
      whiteSpace: 'nowrap',
      height: '100%',
      transition: 'transform .2s ease-out',
      transform: `translateX(${index % length * -100}%)`
    },
    child: {
      display: 'inline-block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      outline: '1px solid red',
      width: '100%',
      height: '100%'
    }
  };

  const children = React.Children.map(props.children, (child, i) => {
    return (
      <div style={sx.child}>
        {child}
      </div>
    )
  });

  return (
    <div style={sx.root}>
      <div style={sx.inner}>
        {children}
      </div>
    </div>
  )
};

// Final Carousel component
const HeroCarousel = (props) => {
  return (
    <div>
      <Carousel index={props.index}>
        <div>Slide one</div>
        <div>Slide two</div>
        <div>Slide three</div>
      </Carousel>
      <Button
        onClick={props.previous}
        children='Previous'/>
      <Button
        onClick={props.next}
        children='Next'/>
    </div>
  )
};

// Wrap the component with the functionality from the higher order component
export default CarouselContainer(HeroCarousel)

// By keeping the styling separate from the interactive state, any number of carousel variations can be created from these reusable parts.
// Usage example
const Carousel = () => (
  <div>
    <HeroCarousel />
  </div>
);

