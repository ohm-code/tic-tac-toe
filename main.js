import {aiController} from './modules/aiControllerModule.js';

console.log(aiController.aiLogicArray);

const playerOnePiece = "x"
const playerTwoPiece = "o"
let aiPlayer = true;

let turn = 0;
let xTurn = ()=>{
    return turn%2>0? true:false
}; 
const container = document.getElementById('gameBoardContainer');
const winMessage = document.getElementById('winMessage');
const pMessage= document.querySelector('p');



const playerPiece = (() =>{
    return xTurn? "x":"o";
})()

//adapter  ai array index <-> array pair for gameboard coordinates
const mapAiArraytoGameBoard = (index) =>{
    switch(index){
        case 1:
            return [0,1];
        case 2:
            return [0,2];
        case 3:
            return [1,0];
        case 4:
            return [1,1];    
        case 5:
            return [1,2];
        case 6:
            return [2,0];
        case 7:
            return [2,1];
        case 8:
            return [2,2];    
        case 0:
            return [0,0];          
    }
}
const mapGameboardtoAiArray = (coord) =>{
    switch(coord){
        case 'x01':
            return 1;
        case 'x02':
            return 2;
        case 'x10':
            return 3;
        case 'x11':
            return 4;    
        case 'x12':
            return 5;
        case 'x20':
            return 6;
        case 'x21':
            return 7; 
        case 'x22':
            return 8;    
        case 'x00':
            return 0;           
    }
}


//gameController logic 
const gameController = (() => {
    const createBoard = () => {
        return {
        0: ["","",""],
        1: ["","",""],
        2: ["","",""],
    }};
    //private functions
    const _allEqual = (array,playerPiece) => {
        return array.every(val => val==playerPiece);
    }
    const _updateBoard = (board,playerPiece, keyIndex, arrayIndex) => { 
        if (!valueAt(board,keyIndex,arrayIndex)){//updates the board with piece, x or o
        board[keyIndex][arrayIndex] = playerPiece;
        }else {console.log("invalid play")}; //******change this to alert or display message
    }

    //public functions
    const valueAt = (boardObject,keyIndex,arrayIndex) => {  //done
        return boardObject[keyIndex][arrayIndex]
    }; 
    const resetBoard = ()=>{
        aiController.resetAiLogicArray(); 
        turn = 0; 
        xTurn = true;
        pMessage.textContent = aiPlayer? "MODE: You are currently playing vs. Computer ** Be warned, the AI plays a perfect game.":
            "MODE: Player vs Player. May the best player win!"
        Object.keys(board).forEach(element => {
            console.log('success')  
            board[element] = ["","",""];
            updateDisplay(); 
            winMessage.style.display = 'none'; 
        })
    }
 
    const winCondition = (board, playerPiece) => {  //done 
        let diagonalLR = [board[0][0],board[1][1],board[2][2]];
        let diagonalRL = [board[0][2],board[1][1],board[2][0]];
        let column0 = [board[0][0],board[1][0],board[2][0]];
        let column1 = [board[0][1],board[1][1],board[2][1]];
        let column2 = [board[0][2],board[1][2],board[2][2]];
        if (turn ==9){
            winMessage.textContent = "Tie!!";
            winMessage.style.display = 'inline-block';
            return
        }
        if(_allEqual(diagonalLR, playerPiece)|| _allEqual(diagonalRL,playerPiece)|| _allEqual(board[0],playerPiece) ||
        _allEqual(board[1],playerPiece) || _allEqual(board[2],playerPiece) || _allEqual(column0,playerPiece) || _allEqual(column1,playerPiece) || _allEqual(column2,playerPiece) ){
            let winner = '';
            if (aiPlayer){
                winner = playerPiece=='x'? 'Player':'AI'
                return
            }
            else { 
                winner = playerPiece =='x'? 'Player One':'Player Two'
                winMessage.textContent = winner + " Wins!!"
                winMessage.style.display = 'inline-block';
                return
            } 
    }}

    const playMove = (board,keyIndex,arrayIndex)=>{
        console.log("playmove catch")
        if (!valueAt(board,keyIndex,arrayIndex)){
         if(!aiPlayer){ // no ai player
           if (xTurn){ 
                    console.log("xplay");
                    _updateBoard(board,"x", keyIndex, arrayIndex);
                    xTurn = false;
                    turn++
                    if(turn == 9){console.log("tie")}
                    return
            }else {
                    console.log("oplay");
                    _updateBoard(board,"o", keyIndex, arrayIndex)
                    xTurn = true;
                    turn++
                    if (turn == 9){console.log("tie")}
                    return
            }}
        else{//aiplayer logic
            if (xTurn){
                console.log("xplay");
                _updateBoard(board,"x", keyIndex, arrayIndex);
                let holder = "x"+keyIndex+arrayIndex
                console.log(mapGameboardtoAiArray(holder));
                aiController.playerMoveAiUpdate(mapGameboardtoAiArray(holder),"x");
                xTurn = false;
                turn++
                //ai play part
               //aiplay
               if (turn == 9){return console.log("tie")
                }else 
                setTimeout(()=>{
                    let move = aiController.aiMoveChoice("o");
                    console.log("aimovechoice is " + move)
                    _updateBoard(board,"o", mapAiArraytoGameBoard(move)[0], mapAiArraytoGameBoard(move)[1]);
                    aiController.playerMoveAiUpdate(move,"o");
                    xTurn = true;
                    console.log("settimeoutsuccess")
                    turn++
                    updateDisplay()
                },370);
            }
    }}      
}   
    return{
        createBoard,
        resetBoard,
        winCondition,
        playMove,
        valueAt,
    }
})();

const generateBoard = (board) => {
    function createDiv(classname,id) {
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
            grid.addEventListener('click', () =>{
                gameController.playMove(board,keyI,arrayI);
                updateDisplay();
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
//end gameController Logic

//game inititalization
const board = gameController.createBoard();
generateBoard(board)
const column = document.querySelectorAll('div.column')
const newGame = document.getElementById('newGame'); 
const twoPlayer =document.getElementById('2player');
const vsComputer = document.getElementById('vsComputer')

vsComputer.addEventListener('click',()=>{
    console.log("aiplayer true caught")
    aiPlayer=true;
    gameController.resetBoard(); 
}
)
twoPlayer.addEventListener('click', ()=> {
    aiPlayer=false; 
    gameController.resetBoard();
})

newGame.addEventListener('click', gameController.resetBoard)  //gameController.resetBoard()
const updateDisplay = () => {
    column.forEach((e,i)=>{
        e.textContent = gameController.valueAt(board,mapAiArraytoGameBoard(i)[0],mapAiArraytoGameBoard(i)[1])
    });gameController.winCondition(board,'x'); gameController.winCondition(board,'o');
}

