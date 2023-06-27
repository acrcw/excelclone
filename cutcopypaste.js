//select range ctrl + click
let ctrlkey;
document.addEventListener("keydown", (e) => {
    ctrlkey = true // truew
    // console.log(e)
})
document.addEventListener("keyup", (e) => {
    ctrlkey = false// false
    // console.log(e)
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.row-cell[rid="${i}"][cid="${j}"]`);
        // console.log(cell)
        handleSelectedcells(cell)
    }
}
let rangestorage = [];
function handleSelectedcells(cell) {
    // console.log(cell)
    cell.addEventListener("click", (e) => {

        //select range work
        if (!ctrlkey) return;
        // console.log("hello")
        if (rangestorage.length >= 2) {
            removecellborders()
            rangestorage.length = 0;

        }
        //show in UI
        cell.style.border = "3px solid #4cd137"
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangestorage.push([rid, cid]);
        // console.log(rangestorage)
    })

}
function removecellborders() {
    for (let i = 0; i < rangestorage.length; i++) {
        let cell = document.querySelector(`.row-cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
        cell.style.border = "0.1px solid #CED6E0"
    }
}
let copybtn = document.querySelector(".copy")
let cutbtn = document.querySelector(".cut")
let pastebtn = document.querySelector(".paste")
let copydata = [];
copybtn.addEventListener("click", (e) => {
    if (rangestorage.length < 2) return
    copydata.splice(0, copydata.length);
    let strow = rangestorage[0][0]
    let stcol = rangestorage[0][1]
    let endrow = rangestorage[1][0]
    let endcol = rangestorage[1][1]
    for (let i = strow; i <= endrow; i++) {
        let copyrow = [];
        for (let j = stcol; j <= endcol; j++) {
            copyrow.push(JSON.parse(JSON.stringify(sheetDB[i][j])));
        }
        copydata.push(copyrow);
    }
    removecellborders()
    // rangestorage.splice(0,rangestorage.length);
    console.log(copydata)


})
pastebtn.addEventListener("click", (e) => {
    //paste cells data
    if (rangestorage.length < 2) return
    let boxid = document.getElementById("address-bar").value;
    let startcell = document.getElementById(boxid);
    // console.log(startcell)
    let startcellrow = startcell.getAttribute("rid");
    let startcellcol = startcell.getAttribute("cid");
    let rowdiff = eval(rangestorage[1][0] - rangestorage[0][0])
    let coldiff = eval(rangestorage[1][1] - rangestorage[0][1])
    // let x=0;
    // console.log(rowdiff)
    // console.log(coldiff)
    let r = 0;
    let m = startcellrow
    while (m <= eval(startcellrow + rowdiff)) {
        // let y=0;
        let n = startcellcol;
        let c = 0;
        while (n <= (startcellcol + coldiff)) {

            let cell = document.querySelector(`.row-cell[rid="${m}"][cid="${n}"]`);
            if (cell == null || copydata[r] == undefined || copydata[r][c] == undefined || sheetDB[m] == undefined || sheetDB[m][n] == undefined) {
                n++;
                c++;
                continue;
            }
            else {
                sheetDB[m][n].value = copydata[r][c].value;
                sheetDB[m][n].bold = copydata[r][c].bold;
                sheetDB[m][n].italic = copydata[r][c].italic;
                sheetDB[m][n].underline = copydata[r][c].underline;
                sheetDB[m][n].fontfamily = copydata[r][c].fontfamily;
                sheetDB[m][n].fontcolor = copydata[r][c].fontcolor;
                sheetDB[m][n].BGcolor = copydata[r][c].BGcolor;
                sheetDB[m][n].alignment = copydata[r][c].alignment;
                sheetDB[m][n].fontsize = copydata[r][c].fontsize;
                cell.innerHTML = sheetDB[r][c].value
                cell.click();
            }

            // console.log(" m ",m , " n ",n )
            n++;
            c++;
        }
        m++;
        r++;

    }
    // copydata.length=0;


})

cutbtn.addEventListener("click", (e) => {

    if (rangestorage.length < 2) return
    copybtn.click();
    console.log(rangestorage)
    let strow = rangestorage[0][0]
    let stcol = rangestorage[0][1]
    let endrow = rangestorage[1][0]
    let endcol = rangestorage[1][1]
    for (let i = strow; i <= endrow; i++) {

        for (let j = stcol; j <= endcol; j++) {
            let cell = document.querySelector(`.row-cell[rid="${i}"][cid="${j}"]`);
            // console.log(sheetDB[i][j])
            sheetDB[i][j].value=""
            sheetDB[i][j].bold = false
            sheetDB[i][j].italic = false
            sheetDB[i][j].underline = false
            sheetDB[i][j].fontfamily = "sansseriff";
            sheetDB[i][j].fontcolor = "#000000"
            sheetDB[i][j].BGcolor = "#FFFFFF"
            sheetDB[i][j].alignment = "left"
            sheetDB[i][j].fontsize = "1rem"
            cell.click();
            cell.innerHTML ="";

        }

    }
    removecellborders();
})