/**
 * Using indexes as keys
 *
 * TL;DR: Generate a unique id for every item and use it as key when rendering the list.
 *
 * @Reference:
 * https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
 */

// BAD
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// BETTER
{todos.map((todo) =>
  <Todo {...todo}
    key={todo.id} />
)}

// EVEN BETTER
var shortid = require('shortid');
function createNewTodo(text) {
  return {
    completed: false,
    id: shortid.generate(),
    text
  }
}