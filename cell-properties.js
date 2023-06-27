//storage
let collectedSheets=[];
let sheetDB = [];
{
    let addsheetbtn = document.querySelector(".sheet-add-icon")
    addsheetbtn.click();     

 
}

function setuialignment(cellobj) {

    let allalignmentboxes = document.querySelectorAll(".alignment");
    switch (cellobj.alignment) {
        case "left":
            allalignmentboxes[0].style.backgroundColor = activecolor;
            allalignmentboxes[1].style.backgroundColor = inactivecolor;
            allalignmentboxes[2].style.backgroundColor = inactivecolor;
            break;
        case "right":
            allalignmentboxes[0].style.backgroundColor = inactivecolor;
            allalignmentboxes[1].style.backgroundColor = inactivecolor;
            allalignmentboxes[2].style.backgroundColor = activecolor;
            break;
        case "center":
            allalignmentboxes[0].style.backgroundColor = inactivecolor;
            allalignmentboxes[1].style.backgroundColor = activecolor;
            allalignmentboxes[2].style.backgroundColor = inactivecolor;
            break;
    }
}
// selectors for cell properties
let cellpropcontainer = document.querySelector(".cellprop-actions-cont");
let activecolor = "#636e72";
let inactivecolor = "#353b48";
for (i = 0; i < cellpropcontainer.children.length; i++) {
    // console.log( cellpropcontainer.children.length)

    if (i >= 0 && i <= 2 || (i >= 5 && i <= 10))
        cellpropcontainer.children[i].addEventListener("click", (e) => {
            // get the address from adress bar
            // got the cell obj
            // if(e.target.classList[0].value==="material icons")

            if (e.target.classList[0] === "material-icons") {
                // if (e.target.innerHTML === "content_copy") {


                // }
                // else if (e.target.innerHTML === "content_paste") {

                // }
                // else if (e.target.innerHTML === "content_cut") {

                // }
                if (e.target.innerHTML === "format_bold") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];
                    cellobj.bold = !cellobj.bold
                    cell.style.fontWeight = cellobj.bold ? "bold" : "normal";
                    e.target.style.backgroundColor = cellobj.bold ? activecolor : inactivecolor;
                }
                else if (e.target.innerHTML === "format_italic") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];
                    cellobj.italic = !cellobj.italic
                    cell.style.fontStyle = cellobj.italic ? "italic" : "normal";
                    e.target.style.backgroundColor = cellobj.italic ? activecolor : inactivecolor;
                }
                else if (e.target.innerHTML === "format_underlined") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];
                    cellobj.underline = !cellobj.underline
                    cell.style.textDecoration = cellobj.underline ? "underline" : "none";
                    e.target.style.backgroundColor = cellobj.underline ? activecolor : inactivecolor;
                }
                else if (e.target.innerHTML === "format_align_left") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];

                    cellobj.alignment = "left"
                    cell.style.textAlign = "left";
                    setuialignment(cellobj);

                }
                else if (e.target.innerHTML === "format_align_center") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];
                    cellobj.alignment = "center"
                    cell.style.textAlign = "center";
                    setuialignment(cellobj);
                }
                else if (e.target.innerHTML === "format_align_right") {
                    let boxid = document.getElementById("address-bar").value;
                    let cell = document.getElementById(boxid); // got the cell
                    let row = cell.getAttribute("rid");
                    let col = cell.getAttribute("cid");
                    let cellobj = sheetDB[row][col];
                    cellobj.alignment = "right"
                    cell.style.textAlign = "right";
                    setuialignment(cellobj);
                }

            }


        })
    else if (i == 3 || i == 4) {

        cellpropcontainer.children[i].addEventListener("change", (e) => {
            if (e.target.classList[0] === "font-family-prop") { // to set font family
                let boxid = document.getElementById("address-bar").value;
                let cell = document.getElementById(boxid); // got the cell
                let row = cell.getAttribute("rid");
                let col = cell.getAttribute("cid");
                let cellobj = sheetDB[row][col];
                // console.log(e.target.value)
                cellobj.fontfamily = e.target.value // set the font in obj
                cell.style.fontFamily = e.target.value;
            }
            else if (e.target.classList[0] === "font-size-prop") {
                let boxid = document.getElementById("address-bar").value;
                let cell = document.getElementById(boxid); // got the cell
                let row = cell.getAttribute("rid");
                let col = cell.getAttribute("cid");
                let cellobj = sheetDB[row][col];
                // console.log(e.target.value)
                cellobj.fontsize = e.target.value // set the size in obj
                cell.style.fontSize = `${e.target.value}px`;
            }
        })
    }
    else if(i==11 || i==12)
        cellpropcontainer.children[i].childNodes[3].addEventListener("change", (e) => {

            if (e.target.classList[0] === "font-color-prop") // set font color
            {
                let boxid = document.getElementById("address-bar").value;
                let cell = document.getElementById(boxid); // got the cell
                let row = cell.getAttribute("rid");
                let col = cell.getAttribute("cid");
                let cellobj = sheetDB[row][col];
                cellobj.fontcolor = e.target.value // set the font in obj
                // console.log(e.target.value) // color code
                cell.style.color = e.target.value;
                // console.log(cellobj)
            }
            else if (e.target.classList[0] === "BGcolor-prop") // back ground color
            {
                let boxid = document.getElementById("address-bar").value;
                let cell = document.getElementById(boxid); // got the cell
                let row = cell.getAttribute("rid");
                let col = cell.getAttribute("cid");
                let cellobj = sheetDB[row][col];
                cellobj.BGcolor = e.target.value // set the font in obj
                cell.style.backgroundColor = e.target.value;
                // cell.style.=e.target.value;
            }


        })

}

//update action container ui
let allrowcells = document.querySelectorAll(".row-cell");
// console.log(allrowcells.length)
for (let i = 0; i < allrowcells.length; i++) // 100rows
{
   
    allrowcells[i].addEventListener("click", (e) => {
    //    console.log("hello")
        let row = e.target.getAttribute("rid");
        // console.log(row)
        let col = e.target.getAttribute("cid");
        // console.log(col)
        let cellobj = sheetDB[row][col];
        //    console.log(cellobj)
        // apply cell properties first
        e.target.style.fontWeight = cellobj.bold ? "bold" : "normal";
        e.target.style.fontStyle = cellobj.italic ? "italic" : "normal";
        e.target.style.textDecoration = cellobj.underline ? "underline" : "none";
        // e.target.style.textAlign = cellobj.alignment;
        e.target.style.fontFamily = cellobj.fontfamily;
        e.target.style.fontSize = cellobj.fontsize;
        e.target.style.color = cellobj.fontcolor
        e.target.style.backgroundColor = cellobj.BGcolor

        // show cell properties in ui
        for (i = 0; i < cellpropcontainer.children.length; i++) {
            if (i == 3)
                cellpropcontainer.children[i].value = cellobj.fontfamily;
            if (i == 4)
                cellpropcontainer.children[i].value = parseInt(cellobj.fontsize);
            if (i == 5)
                cellpropcontainer.children[i].style.backgroundColor = cellobj.bold ? activecolor : inactivecolor;
            if (i == 6)
                cellpropcontainer.children[i].style.backgroundColor = cellobj.italic ? activecolor : inactivecolor;
            if (i == 7)
                cellpropcontainer.children[i].style.backgroundColor = cellobj.underline ? activecolor : inactivecolor;
            if (i == 8 || i == 9 || i == 10) // hable alignment ui
                setuialignment(cellobj)
            if (i == 11)
                cellpropcontainer.children[i].childNodes[3].value = cellobj.fontcolor;
            if (i == 12)
                cellpropcontainer.children[i].childNodes[3].value = cellobj.BGcolor
        }
        let formulabar = document.querySelector(".formula-bar");
        formulabar.value=cellobj.formula;
        e.target.innerText=cellobj.value;
    })
}

