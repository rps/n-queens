/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// 
// take a look at solversSpec.js to see what the tests are expecting

// (There are also optimizations that will allow you to skip a lot of the dead search space)


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var board = new Board({n:n})

  for(var row = 0; row < n; row++){
    for(var i = 0; i < n; i++){
      if(i === row){
        board._currentAttributes[row][i] = 1;
      } 
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board._currentAttributes));
  return board._currentAttributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  if(n === 0) return 0;
  var solutionCount = {};
  debugger;
  var initial = findNRooksSolution(n);
  console.log('ini',initial)


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return Object.keys(solutionCount).length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
