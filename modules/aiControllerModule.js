let playerPiece = 'x';

const aiController = (() => {
    const aiLogicArrayConstant = () => {return [3,2,3,2,4,2,3,2,3]}
    let aiLogicArray= aiLogicArrayConstant();

    const playerPieceReturn = (() =>{
        return playerPiece
    })();

    const aiLogicObject = {
        diagonalL: [0,4,8],
        diagonalR: [2,4,6],
        r1: [0,1,2],
        r2: [3,4,5],
        r3: [6,7,8],
        c1: [0,3,6],
        c2: [1,4,7],
        c3: [2,5,8],
    }

    let aiLogicObjectArray =Object.values(aiLogicObject) // access values in aiLogicObject as array of arrays

    const aiLogicArrayToObject = () =>{return (  //return object containing aiLogic Array values mapped to aiLogicObject 
            aiLogicObjectArray.map((subArray)=>{
            return (subArray.map((e)=>{return aiLogicArray[e]}))
            })
    )}
            
    const playerMoveAiUpdate = (aiLogicArrayIndex,playerPiece) => {
        aiLogicObjectArray.forEach((subarray,index)=>{
            if(aiLogicObjectArray[index].includes(aiLogicArrayIndex)){ //returning each array in aiLogicObject that includes the aiLogicArrayIndex
                aiLogicObjectArray[index].forEach((current, index) =>{
                    if(Number.isInteger(aiLogicArray[current])){
                        aiLogicArray[aiLogicArrayIndex] = playerPiece;
                        if(playerPiece == 'x'){
                            aiLogicArray[current] -= 1;
                        }else return
        }})}})}

    function getOccurence(array,value){
        return array.filter((v)=> (v === value)).length;
    }

    const aiMoveChoice = ()=>{
        //if there is a 0 play choice = zero
        if (savingMove(playerPiece)){
            return savingMove(playerPiece)
        }else{
            console.log(aiLogicArray)
            let aiLogicArraytoNumber = aiLogicArray.filter((e)=>Number.isInteger(e));
            console.log(aiLogicArraytoNumber);
            let maxMoveScore = aiLogicArraytoNumber.reduce( //movescore of optimal move
                (maxMove, current)=>{return Math.max(maxMove,current);},0)
            return aiLogicArray.findIndex((e) => e == maxMoveScore) //return first index in aiLogicArray that matches the maxMoveScore
        }
    }

        const savingMovesArray = () =>{
            return(aiLogicArrayToObject().map((subarray,keyindexoutput)=> { 
            if (getOccurence(subarray,'o')==2){ //check for 2 "x" or "o" as designated by playerPiece parameter
                for (let i =0; i<3; i++){
                    if (Number.isInteger(subarray[i])){ //look for the remaining valid play
                        return (aiLogicObjectArray[keyindexoutput][i]); //return arrayLogicArray index for winning move
                        } }}            
            if (getOccurence(subarray,'x')==2){ //check for 2 "x" or "o" as designated by playerPiece parameter
                for (let i =0; i<3; i++){
                    if (Number.isInteger(subarray[i])){ //look for the remaining valid play
                        return (aiLogicObjectArray[keyindexoutput][i]); //return arrayLogicArray index for saving move
                    } }}
        }))
        }
    
    
    const savingMove = (playerPieceReturn) =>{
        return (
            savingMovesArray(playerPieceReturn).find( v => Number.isInteger(v)) // return array of playerpiece
        )
    }
    return {
        savingMove,
        playerMoveAiUpdate,
        aiMoveChoice,
        //remove after this after testing
        aiLogicArray,
        aiLogicArrayConstant,
        savingMovesArray,
    }
})()
 //testing
export{
    aiController,
    }

