/**
 * Always use <tbody> in tables
 */

// BAD
render () {
  return (
    <table>
      <tr>...</tr>
    </table>
  );
}

// GOOD
render () {
  return (
    <table>
      <tbody>
        <tr>...</tr>
      </tbody>
    </table>
  );
}