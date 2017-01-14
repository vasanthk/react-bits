/**
 * Use React’s String.fromCharCode() for special characters.
 */

// BAD
<div>Racing · Michael Schumacher</div>

// GOOD
<div>{`Racing ${String.fromCharCode(183)} Michael Schumacher`}</div>

