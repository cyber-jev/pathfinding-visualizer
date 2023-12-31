import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

import "./PathfindingVisualizer.css";

// Constants defining the start and finish node positions
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

//  PathfindingVisualizer component represents a pathfinding visualizer using Dijkstra's algorithm.
// It renders a grid of nodes and provides user interactions for adding walls and visualizing the algorithm.
const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]); // The grid representing the nodes
  const [mouseIsPressed, setMouseIsPressed] = useState(false); // Whether the mouse button is pressed or not

  // Initializes the grid when the component mounts
  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  //  Event handler for when the mouse button is pressed on a node
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  //  Event handler for when the mouse enters a node
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  //   Event handler for when the mouse button is released
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  //  Animates the visited nodes during the algorithm execution
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        // Animation for the shortest path
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      // Animation for visited nodes
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-visited";
        }
      }, 10 * i);
    }
  };

  // Animates the shortest path after the algorithm has finished
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-shortest-path";
        }
      }, 50 * i);
    }
  };

  // Starts the visualization of Dijkstra's algorithm
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="pathfinder-wrapper">
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onMouseUp={handleMouseUp}
                    row={row}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Initializes the grid by creating an array of nodes with the specified number of rows and columns.
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// Creates a node object with the specified row and column coordinates.
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// Toggles the wall property of the node in the grid at the given row and column coordinates.
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = [...grid];
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathfindingVisualizer;
