// Layout components result in some form of static DOM element. It might not need to update frequently, if ever.

// Consider a component that renders two children side-by-side.

<HorizontalSplit
  leftSide={<SomeSmartComponent />}
  rightSide={<AnotherSmartComponent />}
/>

// We can aggressively optimize this component.

// While HorizontalSplit will be parent to both components, it will never be their owner.
// We can tell it to update never, without interrupting the lifecycle of the components inside.

class HorizontalSplit extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    <FlexContainer>
      <div>{this.props.leftSide}</div>
      <div>{this.props.rightSide}</div>
    </FlexContainer>
  }
}
