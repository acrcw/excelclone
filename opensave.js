let downloadbtn=document.querySelector(".download")
let openbtn=document.querySelector(".open")
downloadbtn.addEventListener("click",(e)=>{
    let jsonData=JSON.stringify([sheetDB,graphcomponentmatrix])
     let file=new Blob([jsonData],{type:"application/json"})
     let anchor=document.createElement("a");
     anchor.href=URL.createObjectURL(file);
     anchor.download="sheetdata.json";
     anchor.click();
})

openbtn.addEventListener("click",(e)=>{
    //open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let filereader= new FileReader();
        let files=input.files;
        let fileobj=files[0]
    
    filereader.readAsText(fileobj);
    filereader.addEventListener("load",(e)=>{
        let sheetdata=JSON.parse(filereader.result);
        // basic sheet will be created by deefault data
        addsheetbtn.click();

        //sheetdb graphdomponenet
        sheetDB=sheetdata[0];
        graphcomponentmatrix=sheetdata[1];
        collectedSheets.push(sheetDB);
        collectedgraphcomponent.push(graphcomponentmatrix);
        handlesheetproperties();
          
        })
    })
     
})