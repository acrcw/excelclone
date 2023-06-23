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
            BGcolor: "#000000" //deafault black

        }
        sheetrow.push(cellobj)
    }
    sheetDB.push(sheetrow);
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
                if (e.target.innerHTML === "content_copy") {


                }
                else if (e.target.innerHTML === "content_paste") {

                }
                else if (e.target.innerHTML === "content_cut") {

                }
                else if (e.target.innerHTML === "format_bold") {
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
                console.log(e.target.value)
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
    else
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
                console.log(cellobj)
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
