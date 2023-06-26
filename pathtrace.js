async function tracepath(graphcompentmatrix, respobj) {
    let Visited = []; // node visted tracce
    let dfsVisited = []; //  stack trace
    for (let i = 0; i < rows; i++) {
        let Node = [];
        let dfsVisitedrow = [];
        for (let j = 0; j < cols; j++) {
            Node.push(false);
            dfsVisitedrow.push(false);
        }

        Visited.push(Node)
        dfsVisited.push(dfsVisitedrow)
    }


    let resp = await trace(graphcompentmatrix, respobj.row, respobj.col, Visited, dfsVisited)
    if (resp === true) return Promise.resolve(true);
    return Promise.resolve(false);

}

function coloringpromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
    // return P;
}
//coloring cells for trace
async function trace(graphcompentmatrix, srcrow, srccol, Visited, dfsVisited) {
    Visited[srcrow][srccol] = true;
    dfsVisited[srcrow][srccol] = true;

    //get the ui cell to color


    let cell = document.querySelector(`.row-cell[rid="${srcrow}"][cid="${srccol}"]`)

    cell.style.backgroundColor = "#576574";
    await coloringpromise();



    for (let child = 0; child < graphcompentmatrix[srcrow][srccol].length; child++) {
        let obj = graphcompentmatrix[srcrow][srccol][child]

        if (Visited[obj.childrid][obj.childcid] == false) {
            let rp = await trace(graphcompentmatrix, obj.childrid, obj.childcid, Visited, dfsVisited)
            if (rp === true) {
                cell.style.backgroundColor = "#FFFFFF";
                await coloringpromise();


                return Promise.resolve(true); //cycle detected
            }
            await coloringpromise();
            cell.style.backgroundColor="#FFFFFF";

        }
        else if (Visited[obj.childrid][obj.childcid] === true && dfsVisited[obj.childrid][obj.childcid] === true) // found a node again in stack
        {
            // let nextcell=document.getElementById(`${String.fromCharCode(65 + obj.childcid)}${1 + obj.childrid}`)
            let nextcell = document.querySelector(`.row-cell[rid="${obj.childrid}"][cid="${obj.childcid}"]`)
            nextcell.style.backgroundColor = "#9980FA";
            await coloringpromise();

            nextcell.style.backgroundColor = "#576574";
            await coloringpromise();
            cell.style.backgroundColor = "#FFFFFF";
            await coloringpromise();
            return Promise.resolve(true); //cycle detected
        }
    }

    dfsVisited[srcrow][srccol] = false;

    return Promise.resolve(false);
} 