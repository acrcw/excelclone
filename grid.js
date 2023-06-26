let rows=100;
let cols=26;
let  fonts=["'  ',none","'Alegreya Sans', sans-serif","'Amatic SC', cursive","'Architects Daughter', cursive","'Caveat', cursive","'Comforter', cursive","'Dancing Script', cursive","'Gloria Hallelujah', cursive","'Gruppo', sans-serif","'IBM Plex Mono', monospace","'Inconsolata', monospace","'Indie Flower', cursive","'Kaushan Script', cursive","'Lobster', cursive","'Marck Script', cursive","'Montserrat', sans-serif","'Mr Dafoe', cursive","'Nunito', sans-serif","'Orbitron', sans-serif","'Oswald', sans-serif","'Parisienne', cursive","'Poiret One', cursive","'Quicksand', sans-serif","'Sacramento', cursive","'Satisfy', cursive","'Shadows Into Light', cursive","'Space Mono', monospace","'Tangerine', cursive","'Yellowtail', cursive",];
(function () {


    let fontcontainer = document.querySelector(".font-family-prop") // to add fonts 
    fonts.forEach((font) => {
        let option= document.createElement("option");
        option.setAttribute("value", font);
        option.innerHTML=font.split(",")[0].replace(/'/g, '');
        option.value=font;
        fontcontainer.appendChild(option);
    });
    let rowcontainer = document.querySelector(".row-name-container");
    for (let i = 0; i <rows; i++) {
        let numberdiv = document.createElement("div");
        numberdiv.setAttribute("class", "col-boxes");
        
        numberdiv.innerHTML = i+1 ;
        rowcontainer.appendChild(numberdiv)
   
    }
    let colnamecontainer = document.querySelector(".col-name-container");
    for (let x = 0; x < cols; x++) {
        let rowadressbox = document.createElement("div");
        rowadressbox.setAttribute("class", "row-boxes");
        rowadressbox.innerHTML = String.fromCharCode(65 + x);
      
        colnamecontainer.appendChild(rowadressbox)
    }
    let cellscontainer = document.querySelector(".cells-container");
    let addressbar = document.getElementById("address-bar");
    for (let x = 0; x <rows; x++) {
        let rowcontainer = document.createElement("div");
        rowcontainer.setAttribute("class", "data-row");
        rowcontainer.setAttribute("id", `row-${x}`);

        for (let y = 0; y <cols; y++) {
            let rowcell = document.createElement("div");
            rowcell.setAttribute("class", "row-cell");
            rowcell.setAttribute("id", `${String.fromCharCode(65 + y)}${x + 1}`);
            rowcell.setAttribute("contenteditable","true");
            rowcell.setAttribute("spellcheck","false") 
            //for cell storege and cell link
            rowcell.setAttribute("rid",x)
            rowcell.setAttribute("cid",y)
            rowcell.style.backgroundColor="#FFFFFF"
            rowcell.addEventListener("click", (e) => {
                addressbar.value = e.target.getAttribute("id");

            })
            rowcontainer.appendChild(rowcell);

        }
        cellscontainer.appendChild(rowcontainer)
    }



})();