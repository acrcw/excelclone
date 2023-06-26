//storage
let collectedgraphcomponent=[];
let graphcompentmatrix = [];
// for (let i = 0; i < rows; i++) {
//     let row = []; // row to represent cell row 
//     for (let j = 0; j < cols; j++) {
//         // push array of object-> represnent a node with rowid colid
//         row.push([]);
//     }
//     graphcompentmatrix.push(row);
// }
function isgraphcyclic(graphcompentmatrix) {
    let Visited=[]; // node visted tracce
    let dfsVisited = []; //  stack trace
    for (let i = 0; i < rows; i++) {
        let Node=[];
        let dfsVisitedrow = [];
        for (let j = 0; j < cols; j++) 
        {
            Node.push(false);
            dfsVisitedrow.push(false);
        }
    
        Visited.push(Node)
        dfsVisited.push(dfsVisitedrow)
    }
  

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (Visited[i][j]===false)
            {
                if (detectcycle(graphcompentmatrix, i, j, Visited, dfsVisited) == true) return {row:i,col:j};
            } 
                

        }
    }

    return null;
}

function detectcycle(graphcompentmatrix, srcrow, srccol, Visited, dfsVisited) {
    Visited[srcrow][srccol] = true;
    dfsVisited[srcrow][srccol] = true;
    for (let child = 0; child < graphcompentmatrix[srcrow][srccol].length; child++) {
        let obj = graphcompentmatrix[srcrow][srccol][child]
     
        if (Visited[obj.childrid][obj.childcid] == false) {
            if (detectcycle(graphcompentmatrix, obj.childrid, obj.childcid, Visited, dfsVisited) === true) {
                return true; //cycle detected
            }
        }
        else if (Visited[obj.childrid][obj.childcid] === true && dfsVisited[obj.childrid][obj.childcid] === true) // found a node again in stack
        {
            return true; //cycle detected
        }
    }

    dfsVisited[srcrow][srccol] = false;
 
    return false;
}