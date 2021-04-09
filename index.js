(function () {
  const maze = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  const start = {x: 4, y: 0};
  console.log(walk(maze, start));

  function walk(maze, start) {
    const visitedFrom = {}; // store visited cells and path from as {key: string; value: number[]}
    const exit = traverse(maze, start, visitedFrom); // traverse to find exit
    if (!exit) return "maze is not solvable";
    return restorePath(exit, visitedFrom, []); // return shortest path

    function traverse(maze, start, visitedFrom) {
      const edgeX = maze[0].length - 1;
      const edgeY = maze.length - 1;
      const startArray = [start.x, start.y]; // prefer array
      const queue = [startArray];
      visitedFrom[startArray] = "start";

      for (let i = 0; queue.length; i++) {
        const [x, y] = queue.shift();

        if (i && checkIfEdge(x, y)) return [x, y]; // exit is reached

        for (const next of getPassableNeibs(x, y, [])) {
          if (visitedFrom[next]) continue;
          queue.push(next);
          visitedFrom[next] = [x, y];
        }
      }

      function checkIfEdge(x, y) {
        if (!x || x === edgeX) return true;
        if (!y || y === edgeY) return true;
        return false;
      }

      function getPassableNeibs(x, y, neibs) {
        if (x && maze[y][x - 1]) neibs.push([x - 1, y]);         // left
        if (x < edgeX && maze[y][x + 1]) neibs.push([x + 1, y]); // right
        if (y && maze[y - 1][x]) neibs.push([x, y - 1]);         // top
        if (y < edgeY && maze[y + 1][x]) neibs.push([x, y + 1]); // bottom
        return neibs;
      }
    }

    function restorePath(current, visitedFrom, path) {
      while (visitedFrom[current]) {
        path.push(current);
        current = visitedFrom[current];
      }

      return path.reverse();
    }
  }
})();
