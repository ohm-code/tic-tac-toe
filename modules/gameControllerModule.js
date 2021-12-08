//aidevelopment


//main module for game functions
const gameController = (() => {
    const createBoard = () => {
        return {
        0: ["","",""],
        1: ["","",""],
        2: ["","",""],
    }};
    //private functions
    const _allEqual = (array,playerPiece) => {
        console.log(array);
        console.log(playerPiece);
        return array.every(val => val==playerPiece);
    }
    const _updateBoard = (board,playerPiece, keyIndex, arrayIndex) => { 
        if (!valueAt(board,keyIndex,arrayIndex)){//updates the board with piece, x or o
        board[keyIndex][arrayIndex] = playerPiece;
        
        }else {console.log("invalid play")}; //******change this to alert or display message
    }

    //public functions
    const valueAt = (boardObject,keyIndex,arrayIndex) => {
        return boardObject[keyIndex][arrayIndex]
    }; 
    const resetBoard = (board)=>{
        Object.keys(board).forEach(element => {
            board[element] = ["","",""];
        });
    }

    const winCondition = (board, playerPiece) => {
        let diagonalLR = [board[0][0],board[1][1],board[2][2]];
        let diagonalRL = [board[0][2],board[1][1],board[2][0]];
        let column0 = [board[0][0],board[1][0],board[2][0]];
        let column1 = [board[0][1],board[1][1],board[2][1]];
        let column2 = [board[0][2],board[1][2],board[2][2]];

        if(_allEqual(diagonalLR, playerPiece)|| _allEqual(diagonalRL,playerPiece)|| _allEqual(board[0],playerPiece) ||
        _allEqual(board[1],playerPiece) || _allEqual(board[2],playerPiece) || _allEqual(column0,playerPiece) || _allEqual(column1,playerPiece) || _allEqual(column2,playerPiece) ){
            alert(playerPiece +" winCondition!") //****change this to alert or display message */
        }else {return "no win condition"}
    }

    const playMove = (board,keyIndex,arrayIndex)=>{
        console.log("playmove catch")
        if (!valueAt(board,keyIndex,arrayIndex)){
           if (xTurn){
                    console.log("xplay");
                    _updateBoard(board,"x", keyIndex, arrayIndex);
                    winCondition(board,"x");
                    xTurn = false;
                    return
            }else {
                    console.log("oplay");
                    _updateBoard(board,"o", keyIndex, arrayIndex)
                    winCondition(board,"o")
                    xTurn = true;
                    return
            }
    
    }}      
    
    return{
        createBoard,
        resetBoard,
        winCondition,
        playMove,
        valueAt,
    }
})();

//// testing


const generateBoard = (board) => {
    function createDiv(classname,id) {
        const container = document.getElementById('gameBoardContainer');
        console.log(container); 
        const box = document.createElement('div');
        box.className = classname; 
        box.id = classname+id;
    
        for (let i=0; i<3; i++){
            const grid = document.createElement('div'); 
            grid.className = "column"; 
            grid.id = id +" " +i;
            let keyI = grid.id.charAt(0);
            let arrayI =grid.id.charAt(2);
            grid.textContent = gameController.valueAt(board,keyI,arrayI)
            grid.addEventListener('click', () =>{
                console.log("click caught");
                gameController.playMove(board,keyI,arrayI);
                grid.textContent = gameController.valueAt(board,keyI,arrayI);
                if(aiPlayer){
                    aiPlayBoard[keyI][arrayI] = grid.textContent;
                }
            });
            box.appendChild(grid);
        }
        container.appendChild(box);
    } 
    const createRow = (row, ID)=> {
        createDiv(row, ID)
    }
    createRow("row",Object.keys(board)[0]);
    createRow("row",Object.keys(board)[1]);
    createRow("row",Object.keys(board)[2]);
}


const board = gameController.createBoard();
console.log("check" + board[0])
generateBoard(board)

console.log(Object.values(board)[0])

//ai development
