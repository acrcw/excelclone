let addsheetbtn = document.querySelector(".sheet-add-icon")
let sheetsfoldercontainer = document.querySelector(".sheets-folder-cont")
addsheetbtn.addEventListener("click", (e) => {
    // console.log(e)
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");
    let allsheetsfolder = document.querySelectorAll(".sheet-folder");


    sheet.setAttribute("id", allsheetsfolder.length);
    sheet.innerHTML = `<div class="sheet-content">Sheet ${allsheetsfolder.length + 1}</div>`
    sheetsfoldercontainer.appendChild(sheet);
    createsheetDB();
    creategraphcomponent();
    handleactivesheet(sheet)
    handlesheetremoval(sheet)
    sheet.click();

})
function handlesheetremoval(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        if (e.button !== 2) // not right clcik
        {
            return;
        }
        let allsheetfolders = document.querySelectorAll(".sheet-folder");
        if (allsheetfolders.length === 1) {
            alert("you need to have atleast one sheet");
            return;
        }
        if (confirm("Are u sure?") == false) {
            return;   // collectedSheets.remove()
        }
        let sheetidx = Number(sheet.getAttribute("id"));
        collectedSheets.splice(sheetidx, 1);
        collectedgraphcomponent.splice(sheetidx, 1)

        handlesheetUIRemoval(sheet)
        // bring sheet1 to active
        sheetDB = collectedSheets[0]
        graphcompentmatrix = collectedgraphcomponent[0];
        handlesheetproperties();
    })
}
function handlesheetUIRemoval(sheet) {
    sheet.remove();
    let allsheetfolders = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allsheetfolders.length; i++) {
        allsheetfolders[i].setAttribute("id", i);
        let sheetcontent = allsheetfolders[i].querySelector(".sheet-content")
        sheetcontent.innerText = `Sheet ${i + 1}`;
        allsheetfolders.style.backgroundColor = "#2d3436"
        allsheetfolders.style.Color = "#f5f6fa"




    }
    allsheetfolders[0].style.backgroundColor = "#FFFFFF";
    allsheetfolders[0].style.Color = "#000000";
}
function handleactivesheet(sheet) {
    sheet.addEventListener("click", (event) => {
        let sheetidx = Number(sheet.getAttribute("id"));
        handlesheetswitch(sheetidx);
        handlesheetproperties();
        handlesheetUI(sheet)
    })
}
function handlesheetproperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.querySelector(`.row-cell[rid="${i}"][cid="${j}"]`)
            cell.click();
        }
    }
    document.getElementById("A1").click();
}
function handlesheetUI(sheet) {
    let allsheetfolder = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allsheetfolder.length; i++) {
        allsheetfolder[i].style.backgroundColor = "#2d3436"
        allsheetfolder[i].style.color = "#f5f6fa"
    }
    sheet.style.backgroundColor = "#FFFFFF";
    sheet.style.color = "#000000";

}
function handlesheetswitch(idx) {
    sheetDB = collectedSheets[idx];
    graphcompentmatrix = collectedgraphcomponent[idx];
}
function createsheetDB() {
    //storage
    let sheetDB = [];

    for (let i = 0; i < rows; i++) // 100rows
    {
        let sheetrow = [];
        for (let j = 0; j < cols; j++) // 26 cols
        {
            let cellobj = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontfamily: "sansseriff",
                fontsize: "24px",
                fontcolor: "#000000",
                BGcolor: "#FFFFFF", //deafault black
                value: "",
                children: new Set(),
                formula: ""

            }
            sheetrow.push(cellobj)
        }
        sheetDB.push(sheetrow);
    }
    collectedSheets.push(sheetDB);


}
function creategraphcomponent() {
    let graphcompentmatrix = [];
    for (let i = 0; i < rows; i++) {
        let row = []; // row to represent cell row 
        for (let j = 0; j < cols; j++) {
            // push array of object-> represnent a node with rowid colid
            row.push([]);
        }
        graphcompentmatrix.push(row);
    }
    collectedgraphcomponent.push(graphcompentmatrix);
}