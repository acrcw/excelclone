(function () {
   
   
    let rowcontainer = document.querySelector(".row-name-container");
    for (let i = 0; i < 100; i++) {
        let numberdiv = document.createElement("div");
        numberdiv.setAttribute("class", "col-boxes");
        numberdiv.innerHTML = i + 1;
        rowcontainer.appendChild(numberdiv)
        // allolboxes[i].innerHTML=i+1;
    }
     let colnamecontainer = document.querySelector(".col-name-container");
    for (let x = 0; x < 52; x++) {
        let rowadressbox = document.createElement("div");
        rowadressbox.setAttribute("class", "row-boxes");
        rowadressbox.innerHTML = String.fromCharCode(65+x);
        console.log(rowadressbox.innerHTML);
        colnamecontainer.appendChild(rowadressbox)
    }
})();