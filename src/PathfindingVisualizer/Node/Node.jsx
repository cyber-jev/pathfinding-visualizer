import React from 'react';
import './Node.css';

/**
 * Node component represents a single node in a grid.
 *
 * @param {object} props - The properties passed to the Node component.
 * @param {number} props.col - The column index of the node.
 * @param {boolean} props.isFinish - Indicates if the node is the finish node.
 * @param {boolean} props.isStart - Indicates if the node is the start node.
 * @param {boolean} props.isWall - Indicates if the node is a wall.
 * @param {function} props.onMouseDown - Event handler for mouse down event.
 * @param {function} props.onMouseEnter - Event handler for mouse enter event.
 * @param {function} props.onMouseUp - Event handler for mouse up event.
 * @param {number} props.row - The row index of the node.
 * @returns {JSX.Element} The Node component.
 */
const Node = props => {
  const {
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
  } = props;

  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}></div>
  );
};

export default Node;
