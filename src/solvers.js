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
  var availableCols = _.range(0,n);
  var initialTable = new Board({n:n});
  var board = copyTable(initialTable);
  var solved = {};

  var recur = function(modBoard, colsLeft, row){
    if(colsLeft.length === 0){
      solved[modBoard] = true;
      return;
    }

    for(var i = 0; i<colsLeft.length; i++){
      var arr = copyTable(modBoard);
      var cols = colsLeft.slice(0);

      arr[row][cols[i]] = 1;
      cols.splice(i,1);
      recur(arr,cols,row+1)
    }
  };
  recur(board,availableCols,0);

  console.log('Number of solutions for ' + n + ' rooks:', Object.keys(solved).length);
  return Object.keys(solved).length;
};

window.copyTable = function(oldTable){
  var newTable = [];
  var tempArr = [];
  if(Array.isArray(oldTable)){
    for(var i = 0; i < oldTable.length; i++){
      newTable.push(oldTable[i].slice(0));
    }        
  } else {
    for(var keys in oldTable._currentAttributes){
      if(!isNaN(+keys)){
        for(var k = 0; k < oldTable._currentAttributes[keys].length; k++){
          tempArr.push(oldTable._currentAttributes[keys][k]);
        }
        newTable.push(tempArr);
        tempArr = [];
      }
    }
  }
  return newTable;
}

window.horizFlip = function(oldTable){
  var newTable = [];
  var temp = [];
  _.each(oldTable,function(arr){
    var m = arr.slice(0).reverse();
    temp.push(m)
  });
  return temp;
};

window.vertFlip = function(oldTable){
  var temp = copyTable(oldTable);
  return temp.reverse();
};

window.diagFlip = function(oldTable){
  var ret = horizFlip(oldTable);  
  return vertFlip(ret);
};

window.shiftOne = function(oldTable){
  var temp = copyTable(oldTable);
  var newTable = [];
  var row = [];
  debugger;
  console.log(JSON.stringify(oldTable));
  for(var i = 0; i < temp.length; i++){
    for(var j = 0; j < temp[i].length; j++){
      if(temp[i][j] === 0){
        row[j] = temp[i][j];
      } else if (temp[i][j] === 1){
        row[j] = 0
        if(j+1 < temp[i].length){
          row[j+1] = 1
          j++;
        } else {
          row[0] = 1;
        }
      }
      newTable.push(row);
      row = [];
    }
  }
  console.log(JSON.stringify(newTable));
      
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  // run rooks solutions but check for diagconflicts before adding to storage
  var availableCols = _.range(0,n);
  var initialTable = new Board({n:n});
  var board = copyTable(initialTable);
  var solved = {};
  
  var recur = function(modBoard, colsLeft, row){
    if(colsLeft.length === 0){
      var x = new Board(modBoard)
      if(x.hasAnyMajorDiagonalConflicts() === false && x.hasAnyMinorDiagonalConflicts() === false){
        solved[modBoard] = true;
      }
      return;
    }

    for(var i = 0; i<colsLeft.length; i++){
      var arr = copyTable(modBoard);
      var cols = colsLeft.slice(0);

      arr[row][cols[i]] = 1;
      cols.splice(i,1);
      recur(arr,cols,row+1)
      
    }
  };
  recur(board,availableCols,0);

  console.log('Number of solutions for ' + n + ' queens:', Object.keys(solved).length);
  return Object.keys(solved).length;
};
