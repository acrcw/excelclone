// to store value of div in object
for (let i = 0; i < allrowcells.length; i++) // 100rows
{
    allrowcells[i].addEventListener("blur", (e) => {
        let row = e.target.getAttribute("rid");

        let col = e.target.getAttribute("cid");
        let cellobj = sheetDB[row][col];
        if (e.target.innerHTML == cellobj.value) return;

        cellobj.value = e.target.innerHTML;
        if (cellobj.formula) {

            removechildnodestoparent(cellobj.formula);
            cellobj.formula = "";
        }

        updatechildnodes(e.target.getAttribute("id"))
    })
}

// formula bar evaluation
let formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown", async(e) => {
    let formula = formulabar.value.trim().split(" ").join(" ");
    if (e.key === "Enter" && formula) {
        let adressbar = document.querySelector(".address-bar"); // get the current address
        let cell = document.getElementById(adressbar.value)
        let row = cell.getAttribute("rid");
        let col = cell.getAttribute("cid");
        let cellobj = sheetDB[row][col]; // get the  current storage

        //for new formula break old links
        if (formula !== cellobj.formula) {
            removechildnodestoparent(cellobj.formula); // use old formula
        }
        cellobj.formula = formula; // update the formula
        // console.log("1")
        // update cycle detection graph
        addchildtographcomponet(adressbar.value, formula);

        // // check for cycle now
        let respobj = isgraphcyclic(graphcompentmatrix)
        if (respobj) {
            alert("your formula has cyclic dependdency");
            // console.log(graphcompentmatrix)
            while (confirm("Do u want to trace path")) {
                await tracepath(graphcompentmatrix, respobj);
            }
            removechilfromgraphcomponent(adressbar.value, formula);
            formulabar.value = "";
            cellobj.formula = "";
            return;
        }


        cellobj.value = evaluateformula(formula) // update backend
        cell.innerHTML = evaluateformula(formula) // update frontend
        // call for childnodes
        addchildnodestoparent(formula)
        //update parent cells
        updatechildnodes(adressbar.value);
    }
})
function removechilfromgraphcomponent(childid, formula) {
    //decode child
    let childcell = document.getElementById(childid);
    let crow = childcell.getAttribute("rid");
    let ccol = childcell.getAttribute("cid");
    // decode parents
    let arrayofformula = formula.trim().split(" ");
    for (let i = 0; i < arrayofformula.length; i++) {
        if (arrayofformula[i].charCodeAt(0) >= 65 && arrayofformula[i].charCodeAt(0) <= 90) {
            //    if i get A1 i need its cell and cell obj
            console.log(arrayofformula[i])
            let pcell = document.getElementById(arrayofformula[i]); // get the current node
            let prow = pcell.getAttribute("rid");
            let pcol = pcell.getAttribute("cid");

            graphcompentmatrix[prow][pcol].pop();
            // console.log(graphcompentmatrix)

        }

    }

}
function addchildtographcomponet(childid, formula) // frormula contaions parents // adreessbar contaions child
{
    //decode child
    let childcell = document.getElementById(childid);
    let crow = childcell.getAttribute("rid");
    let ccol = childcell.getAttribute("cid");



    // decode parents
    let arrayofformula = formula.trim().split(" ");
    for (let i = 0; i < arrayofformula.length; i++) {
        if (arrayofformula[i].charCodeAt(0) >= 65 && arrayofformula[i].charCodeAt(0) <= 90) {
            //    if i get A1 i need its cell and cell obj
            // console.log(arrayofformula[i])
            let pcell = document.getElementById(arrayofformula[i]); // get the current node
            let prow = pcell.getAttribute("rid");
            let pcol = pcell.getAttribute("cid");

            graphcompentmatrix[prow][pcol].push({ childrid: crow, childcid: ccol })
            console.log(graphcompentmatrix)

        }

    }

}
function evaluateformula(formula) {
    let arrayofformula = formula.trim().split(" ");
    // console.log(formula)

    for (let i = 0; i < arrayofformula.length; i++) {
        if (arrayofformula[i].charCodeAt(0) >= 65 && arrayofformula[i].charCodeAt(0) <= 90) {
            arrayofformula[i] = document.getElementById(arrayofformula[i]).innerText
        }

    }
    // console.log(arrayofformula.join(" "))
    return eval(arrayofformula.join(" "))

}
function addchildnodestoparent(formula) {
    let arrayofformula = formula.trim().split(" ");
    let adressbar = document.querySelector(".address-bar");
    for (let i = 0; i < arrayofformula.length; i++) {
        if (arrayofformula[i].charCodeAt(0) >= 65 && arrayofformula[i].charCodeAt(0) <= 90) {
            //    if i get A1 i need its cell and cell obj
            let adressbar = document.querySelector(".address-bar"); //cureeent adress
            let cell = document.getElementById(arrayofformula[i]); // get the current node
            let row = cell.getAttribute("rid");
            let col = cell.getAttribute("cid");
            let cellobj = sheetDB[row][col]; // fet its loaction in db
            cellobj.children.add(adressbar.value); // aadd the cell in which formula is applied to current node children
            // console.log(cellobj)


        }

    }
}
function removechildnodestoparent(formula) {
    if (formula === "") {
        return;
    }
    let arrayofformula = formula.trim().split(" ");
    let adressbar = document.querySelector(".address-bar");
    for (let i = 0; i < arrayofformula.length; i++) {
        if (arrayofformula[i].charCodeAt(0) >= 65 && arrayofformula[i].charCodeAt(0) <= 90) {
            //    if i get A1 i need its cell and cell obj
            let adressbar = document.querySelector(".address-bar"); //cureeent adress
            let cell = document.getElementById(arrayofformula[i]); // get the current node
            let row = cell.getAttribute("rid");
            let col = cell.getAttribute("cid");
            let cellobj = sheetDB[row][col]; // fet its loaction in db
            (cellobj.children.delete(adressbar.value)); // aadd the cell in which formula is applied to current node children
            // console.log(cellobj)


        }

    }
}
function updatechildnodes(parentaddress) {
    if (parentaddress === null) {
        return;
    }
    let pcell = document.getElementById(parentaddress)
    let prow = pcell.getAttribute("rid");
    let pcol = pcell.getAttribute("cid");
    let pcellobj = sheetDB[prow][pcol];

    pcellobj.children.forEach((child) => {

        let childcell = document.getElementById(child)
        let childrow = childcell.getAttribute("rid");
        let childcol = childcell.getAttribute("cid");
        let childcellobj = sheetDB[childrow][childcol];
        childcell.innerHTML = childcellobj.value = evaluateformula(childcellobj.formula);
        updatechildnodes(child)
    });

} 