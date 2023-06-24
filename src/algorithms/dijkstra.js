/**
 * Performs Dijkstra's algorithm on the grid to find the shortest path.
 * Returns all nodes in the order in which they were visited.
 * Also makes nodes point back to their previous node, allowing us to compute the shortest path.
 *
 * @param {Node[][]} grid - The grid of nodes.
 * @param {Node} startNode - The starting node.
 * @param {Node} finishNode - The finish node.
 * @returns {Node[]} The visited nodes in order.
 */
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
}

/**
 * Sorts the unvisited nodes by their distance property in ascending order.
 *
 * @param {Node[]} unvisitedNodes - The array of unvisited nodes.
 */
const sortNodesByDistance = unvisitedNodes => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

/**
 * Updates the distances and previous nodes of the unvisited neighbors of the given node.
 *
 * @param {Node} node - The node for which to update the neighbors.
 * @param {Node[][]} grid - The grid of nodes.
 */
const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

/**
 * Gets the unvisited neighbors of the given node.
 *
 * @param {Node} node - The node for which to find unvisited neighbors.
 * @param {Node[][]} grid - The grid of nodes.
 * @returns {Node[]} The unvisited neighbors of the node.
 */
const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited);
};

/**
 * Gets all nodes from the grid as a flattened array.
 *
 * @param {Node[][]} grid - The grid of nodes.
 * @returns {Node[]} The flattened array of all nodes in the grid.
 */
const getAllNodes = grid => {
  const nodes = [];

  for (const row of grid) {
    nodes.push(...row);
  }

  return nodes;
};

/**
 * Backtracks from the finishNode to find the shortest path.
 * Only works when called after the dijkstra method.
 *
 * @param {Node} finishNode - The finish node.
 * @returns {Node[]} The nodes in the shortest path order.
 */
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
