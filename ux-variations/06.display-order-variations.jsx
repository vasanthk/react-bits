/**
 * Display UI elements in different order
 *
 * @Reference:
 * https://speakerdeck.com/vasa/building-multitenant-ui-with-react-dot-js
 */

// Use a prop to specify order – Map through ReactElements and render it based on order prop.
class PageSections extends Component {
  render() {
    const pageItems = this.props.contentOrder.map(
      (content) => {
        const renderFunc = this.contentOrderMap[content];
        return (typeof renderFunc === 'function') ? renderFunc() : null;
      }
    );

    return (
      <div className="page-content">
        {pageItems}
      </div>
    )
  }
}