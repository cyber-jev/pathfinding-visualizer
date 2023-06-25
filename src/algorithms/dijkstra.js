/**
 * 
 *Here's how it works:

    Start by picking the city where you are right now. Let's call it the "starting city."

    Next, you make a list of all the cities you know about and mark their distances as infinity, except for the starting city. The distance from the starting city to itself is zero.

    Now, you look at all the cities connected directly to the starting city. You check the distances between the starting city and these neighboring cities. You update their distances in your list if you find a shorter path.

    From the neighboring cities, you pick the one with the shortest distance and move to that city. Let's call it the "current city."

    Once you reach the current city, you update the distances of its neighboring cities. If the distance to a neighboring city becomes shorter through the current city, you update it in your list.

    You keep repeating steps 4 and 5 until you reach the destination city or until you have checked all the cities.

    Finally, when you have checked all the cities or reached the destination city, you have found the shortest path from the starting city to the destination city. You can trace back the path by following the cities with the shortest distances in your list.

  So, to summarize, Dijkstra's algorithm finds the shortest path from one city to another by exploring neighboring cities and updating their distances until it reaches the destination city.
 */

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  console.log(unvisitedNodes);
};

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
