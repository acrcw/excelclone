// to store value of div in object
for (let i = 0; i < allrowcells.length; i++) // 100rows
{
    allrowcells[i].addEventListener("blur", (e) => {
        let row = e.target.getAttribute("rid");
        // console.log(row)
        let col = e.target.getAttribute("cid");
        let cellobj = sheetDB[row][col];
        if(e.target.innerHTML==cellobj.value) return;
        // console.log("hello")
        cellobj.value = e.target.innerHTML;
        if(cellobj.formula)
        {

            removechildnodestoparent(cellobj.formula);
            cellobj.formula="";
        }
        // console.log(e.target.getAttribute("id"))
        updatechildnodes(e.target.getAttribute("id"))

        
    })
}

// formula bar evaluation
let formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown", (e) => {
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
        cellobj.value = evaluateformula(formula) // update backend
        cell.innerHTML = evaluateformula(formula) // updatefrontend
        // call for childnodes
        addchildnodestoparent(formula)
        //update parent cells
        updatechildnodes(adressbar.value);
    }
})
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
function updatechildnodes(parentaddress)  {
    if(parentaddress===null)
    {
        return;
    }
    let pcell = document.getElementById(parentaddress)
    let prow = pcell.getAttribute("rid");
    let pcol = pcell.getAttribute("cid");
    let pcellobj = sheetDB[prow][pcol];
    // console.log(pcellobj)
    // for(let i=0;i<pcellobj.children.size;i++)
    pcellobj.children.forEach((child) => {
        // console.log("daady"+ parentaddress + "child" + child);
        let childcell = document.getElementById(child)
        let childrow = childcell.getAttribute("rid");
        let childcol = childcell.getAttribute("cid");
        let childcellobj = sheetDB[childrow][childcol];
        childcell.innerHTML=childcellobj.value=evaluateformula(childcellobj.formula);
        updatechildnodes(child)
    });

}