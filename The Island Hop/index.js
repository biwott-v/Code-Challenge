function canReachLastIsland(arr) {
    // The farthest island I can reach
    let maxDistance = 0;
  
    for (let currentIsland = 0; currentIsland < arr.length; currentIsland++) {
      // If the current island is beyond our max distance, we're stuck
      if (currentIsland > maxDistance) {
        return false;
      }
  
      // Reassigning the value of max reach from current island
      maxDistance = (maxDistance, currentIsland + arr[currentIsland]);
  
      // If we can reach or go beyond the last island, return true early
      if (maxDistance >= arr.length - 1) {
        return true;
      }
    }
  
    // If we finish loop and didn't reach last island
    return false;
  }
  console.log(canReachLastIsland([3, 2, 1, 1, 4]));
  console.log(canReachLastIsland([2, 3, 1, 0, 4]));
  console.log(canReachLastIsland([2, 3, 1, 1, 4]));
  console.log(canReachLastIsland([3, 2, 0, 1, 4]));