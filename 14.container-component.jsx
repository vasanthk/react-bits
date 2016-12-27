/**
 * “A container does data fetching and then renders its corresponding sub-component. That’s it.”—Jason Bonta
 */

// Given this reusable CommentList component.

const CommentList = ({ comments }) =>
  <ul>
    {comments.map(comment =>
      <li>{comment.body}-{comment.author}</li>
    )}
  </ul>;

// We can create a new component responsible for fetching data and rendering the stateless CommentList component.

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = {comments: []}
  }

  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: comments =>
        this.setState({comments: comments});
    });
  }

  render() {
    return <CommentList comments={this.state.comments}/>
  }
}

// We can write different containers for different application contexts.

