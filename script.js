(function () {


    let rowcontainer = document.querySelector(".row-name-container");
    for (let i = 0; i <= 100; i++) {
        let numberdiv = document.createElement("div");
        numberdiv.setAttribute("class", "col-boxes");
        // if(i!=0)
        numberdiv.innerHTML = i ;
        rowcontainer.appendChild(numberdiv)
        // allolboxes[i].innerHTML=i+1;
    }
    let colnamecontainer = document.querySelector(".col-name-container");
    for (let x = 0; x < 26; x++) {
        let rowadressbox = document.createElement("div");
        rowadressbox.setAttribute("class", "row-boxes");
        rowadressbox.innerHTML = String.fromCharCode(65 + x);
        // console.log(rowadressbox.innerHTML);
        colnamecontainer.appendChild(rowadressbox)
    }
    let cellscontainer = document.querySelector(".cells-container");
    let addressbar = document.getElementById("address-bar");
    for (let x = 0; x < 100; x++) {
        let rowcontainer = document.createElement("div");
        rowcontainer.setAttribute("class", "data-row");
        rowcontainer.setAttribute("id", `row-${x}`);

        for (let y = 0; y < 26; y++) {
            let rowcell = document.createElement("div");
            rowcell.setAttribute("class", "row-cell");
            rowcell.setAttribute("id", `${String.fromCharCode(65 + y)}${x + 1}`);
            rowcell.addEventListener("click", (e) => {
                addressbar.value = e.target.getAttribute("id");
            })
            rowcontainer.appendChild(rowcell);

        }
        cellscontainer.appendChild(rowcontainer)
    }



})();