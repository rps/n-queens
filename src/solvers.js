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
  var table = copyTable(oldTable)
  var temp = [];
  _.each(table,function(arr){
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

// non working
// window.shiftOne = function(oldTable){
//   var temp = copyTable(oldTable);
//   var newTable = [];
//   var row = [];
//   console.log(JSON.stringify(oldTable));
//   for(var i = 0; i < temp.length; i++){
//     for(var j = 0; j < temp[i].length; j++){
//       if(temp[i][j] === 0){
//         row[j] = temp[i][j];
//       } else if (temp[i][j] === 1){
//         row[j] = 0
//         if(j+1 < temp[i].length){
//           row[j+1] = 1
//           j++;
//         } else {
//           row[0] = 1;
//         }
//       }
//       newTable.push(row);
//       row = [];
//     }
//   }
//   console.log(JSON.stringify(newTable));
      
// };


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){

  var availableCols = _.range(0,n);
  var board = new Board({n:n});
  var solved = {};
  var sol = [[]]
  
  var recur = function(inBoard, colsLeft, row){
    if(colsLeft.length === 0){
      sol = inBoard;
      return;
    }
    for(var i = 0; i<colsLeft.length; i++){
      var modBoard = copyTable(inBoard);  
      var arr = modBoard[row];
      var cols = colsLeft.slice(0);
      arr[cols[i]] = 1;
      var modBoard2 = new Board(modBoard);
      if((!modBoard2.hasMajorDiagonalConflictAt(cols[i]-row)) && (!modBoard2.hasMinorDiagonalConflictAt(cols[i]+row))){
        cols.splice(i,1);
        recur(modBoard,cols,row+1);
      } else {
        arr[cols[i]] = 0;
      }  
    }
  };

  if(n === (0 || 1)) {
    sol = [[1]]; 
  } else {
    recur(board,availableCols,0);  
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(sol));
  return sol;

 
};


  



  // var solution = [];

  // var initialTable = new Board({n:n});
  
  // var knights = function(table, row, col){
  //   if(table._currentAttributes[0][1] === undefined){
  //     table._currentAttributes[0][0] = 1;
  //     return;
  //   }
  //   debugger;
  //   table._currentAttributes[0][1] = 1;
  //   var newCol = col;
  //   for(var i = 0; i<n; i++){
  //     newCol += 2;
  //     if(newCol >= n){
  //       newCol = newCol % n2;
  //     }
  //     table._currentAttributes[row+i][newCol] = 1;
  //   }
  // };

  // knights(initialTable, 1, 1);

  // solution = copyTable(initialTable);



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// ------------------------------------------------ WORKING QUICKLY BUT WRONG ------------------------------
// window.countNQueensSolutions = function(n){
//   var availableCols = _.range(0,n);
//   var initialTable = new Board({n:n});
//   var board = copyTable(initialTable);
//   var solved = {};
  
//   var recur = function(modBoard, colsLeft, row){
//     if(colsLeft.length < (modBoard[0].length / 2) && solved[tester] === undefined){
//       var tester = diagFlip(modBoard);
//       var x = new Board(tester)
//       if(x.hasAnyQueensConflicts() === false){
//         solved[tester] = true;
      
//       }
//       return;
//     }

//     for(var i = 0; i<colsLeft.length; i++){
//       var arr = copyTable(modBoard);
//       var cols = colsLeft.slice(0);

//       arr[row][cols[i]] = 1;
//       cols.splice(i,1);
//       if((row+1) < arr[0].length){
//         recur(arr,cols,row+1)
//       }
      
//     }
//   };
//   recur(board,availableCols,0);

//   console.log('Number of solutions for ' + n + ' queens:', Object.keys(solved).length);
//   return Object.keys(solved).length;
// };


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// ------------------------------------------------ WORKING SLOWLY------------------------------
window.countNQueensSolutions = function(n){
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


// ------------------------------NON WORKING NEW IDEAS------------------------------------------
// window.countNQueensSolutions = function(n){
//   var availableCols = _.range(0,n);
//   var initialTable = new Board({n:n});
//   var board = copyTable(initialTable);
//   var solved = {};

//   console.log('n',n)

//   // place pieces in knight fashion
//   var knights = function(table, row, col){
//     table._currentAttributes[0][1] = 1;
//     var newCol = col;
//     var count = (n/2)-1;
//     for(var i = 0; i<count; i++){
//       newCol += 2;
//       if(newCol >= n){
//         newCol = newCol % n;
//       }
//       table._currentAttributes[row+i][newCol] = 1;
//     }
//   };
//   console.log(JSON.stringify('a',initialTable));

//   knights(initialTable, 1, 1);

//   console.log(JSON.stringify('a',initialTable));

//   // var x = copyTable(initialTable);

//   var flipper = function(table){
//     // takes top half, flips it onto bottom half, the horiz flips bottom half

//     var n = table._currentAttributes['n'];
//     var temp = vertFlip(table);
//     temp = horizFlip(temp);

//     for(var i = n/2; i < n; i++){
//       table._currentAttributes[i] = temp[i];
//     }

//     return table;

//   }
  

  
//   console.log('Number of solutions for ' + n + ' queens:', Object.keys(solved).length);
//   return Object.keys(solved).length;
// };