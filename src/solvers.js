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

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board._currentAttributes));
  return board._currentAttributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  console.log('n is ',n)
  var solutions = {};
  var initialTable = copyTable(findNRooksSolution(n));
  // console.log('ini',initialTable)
  solutions[initialTable] = true;
  var x = copyTable(initialTable);
  var xx = [ [0,1,0],[1,0,0],[0,0,1]]
  // console.log('x',x);
  // var y = horizFlip(x);
  console.log('xx',JSON.stringify(xx));
  console.log('1',JSON.stringify(horizFlip(xx)));

  var tempArr = horizFlip(x);
  // console.log('2',JSON.stringify(x))
  // console.log('3',JSON.stringify(tempArr))
  var xx = horizFlip([ [] ])
  solutions[tempArr] = true;
  // tempArr = vertFlip(copyTable(initialTable));
  // solutions[tempArr] = true;
  // tempArr = diagFlip(copyTable(initialTable));
  // solutions[tempArr] = true;
  tempArr = shiftOne(copyTable(initialTable));
  solutions[tempArr] = true;




  console.log('Number of solutions for ' + n + ' rooks:', Object.keys(solutions).length);
  
  return Object.keys(solutions).length;
};

window.copyTable = function(oldTable){
  var newTable = [];
  // console.log('copy1',oldTable)
  var tempArr = [];
  if(Array.isArray(oldTable)){
    // debugger;
    // console.log('xxxxx')
    for(var i = 0; i < oldTable.length; i++){
      // console.log('oldtablei',oldTable[i].slice(0))
      newTable.push(oldTable[i].slice(0));
      // console.log('newtablei',newTable)
      // newTable.push(tempArr);
      // tempArr = [];
    }
    // console.log(newTable)
        
  } else {
    for(var keys in oldTable){
      if(!isNaN(+keys)){
        for(var k = 0; k < oldTable[keys].length; k++){
          tempArr.push(oldTable[keys][k]);
        }
        newTable.push(tempArr);
        tempArr = [];
      }
    }
  }
  // console.log('copy2',newTable)
  return newTable;
}

window.horizFlip = function(oldTable){
  var newTable = [];
  var temp = [];
  // console.log('old',JSON.stringify(oldTable))

  _.each(oldTable,function(arr){
    var m = arr.slice(0).reverse();
    // console.log(arr.reverse())
    temp.push(m)
    // console.log(JSON.stringify(temp))
  });
  // console.log('temp',JSON.stringify(temp))
  return temp;
  
};

window.vertFlip = function(oldTable){

};

window.diagFlip = function(oldTable){
  // do horiz and then vert
};

window.shiftOne = function(oldTable){

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
