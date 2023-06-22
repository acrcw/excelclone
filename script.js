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
    for (let x = 0; x < 26; x++) {
        let rowadressbox = document.createElement("div");
        rowadressbox.setAttribute("class", "row-boxes");
        rowadressbox.innerHTML = String.fromCharCode(65+x);
        // console.log(rowadressbox.innerHTML);
        colnamecontainer.appendChild(rowadressbox)
    }
    let cellscontainer = document.querySelector(".cells-container");
    let addressbar=document.getElementById("address-bar");
    for (let x = 0; x < 100; x++) {
        let rowcontainer = document.createElement("div");
        rowcontainer.setAttribute("class", "data-row");
        rowcontainer.setAttribute("id", `row-${x}`);
       
       for(let y=0;y<26;y++)
        {
            let rowcell=document.createElement("div");
            rowcell.setAttribute("class","row-cell");
            rowcell.setAttribute("id",`${String.fromCharCode(65+y)}${x+1}`);
            rowcell.addEventListener("click",(e)=>{
                addressbar.value=e.target.getAttribute("id");
            })
            rowcontainer.appendChild(rowcell);

        }
        cellscontainer.appendChild(rowcontainer)
    }


    let dataWrapper = document.querySelector('.grid-cont');
    dataWrapper.addEventListener('scroll', function() {
        // var scrollLeft = this.scrollLeft;
        // var scrollTop = this.scrollTop;
        
        let rowNames = document.querySelector('.row-name-container');
        let columnNames = document.querySelector('.col-name-container');
       
        if(this.scrollTop) // im scrolling down
        {
            console.log(" this.scrollTop=>"+ this.scrollTop)
           
            columnNames.style.position="sticky";
            rowNames.scrollTop = this.scrollTop;
            rowNames.style.position="relative";
           
        }
        else if(this.scrollLeft)
        {
            console.log(" this.scrollLeft=>"+ this.scrollLeft)
            columnNames.style.position="relative";
            columnNames.scrollLeft = this.scrollLeft;
            rowNames.style.position="sticky";
           
        }
      
        
       
     
       
      });
})();