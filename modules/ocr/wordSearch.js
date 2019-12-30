var wTn = require("words-to-num");


function wordSearch(ocrText,callback){
    console.log("Its here")
    var data={};
    var Lines = ocrText.ParsedResults[0].TextOverlay.Lines;
    searchRetailer(Lines,(result)=>{
        data['retailer']=result;
        console.log("The retailer is : "+result);
    })
    searchDate(Lines,(result)=>{
        data['date']=result;
        console.log(" The purchase date is : "+result);
    })
    searchAmount(Lines,(result)=>{
        data['amount']=result;
        console.log("The Price is : "+result);
    })
    searchMake(Lines,(result)=>{
        data['make']=result;
        console.log(result);
    })
   
   callback(data); 
   console.log("This is the data : "+data.retailer+data.amount+data.date+data.make); 
  }
  


  function searchRetailer(Lines,callback){
      outerloop:
      for(var i =0;i<Lines.length;i++){
        for(var j =0;j<Lines[i].Words.length;j++){
         if(Lines[i].Words[j].WordText=== "Sold" && (Lines[i].Words[j+1].WordText === "By" || Lines[i].Words[j+1].WordText === "By:")){
             var retailer='';
            for(var k =0;k<Lines[i+1].Words.length;k++){
            retailer += Lines[i+1].Words[k].WordText + " " ;
            }
            break outerloop;
         }   
      }

    }
    console.log(retailer);
    callback(retailer);
  }

 function searchDate(Lines,callback){
     outerloop:
    for(var i =0;i<Lines.length;i++){
        for(var j =0;j<Lines[i].Words.length;j++){
         if(Lines[i].Words[j].WordText=== "Invoice" && (Lines[i].Words[j+1].WordText === "Date" || Lines[i].Words[j+1].WordText === "Date:")){ 
            if(Lines[i].Words[j+2].WordText === ":"){
            var purchaseDate = Lines[i].Words[j+3].WordText;
            }else{
                var purchaseDate = Lines[i].Words[j+2].WordText;
            }
            if(purchaseDate.charAt(2) !== '.'){
            var formattedDate = purchaseDate.slice(0,2)+'.'+purchaseDate.slice(2,9)
            break outerloop;
            }else if(purchaseDate.charAt(5) !== '.'){
            var formattedDate = purchaseDate.slice(0,5)+'.'+purchaseDate.slice(5,9)    
            break outerloop;
        }else{
                var formattedDate = purchaseDate;
                console.log(purchaseDate);
                break outerloop;
            }
         
            }
         }}
         callback(formattedDate);
}

function searchAmount(Lines,callback){
    outerloop:
    for(var i =0;i<Lines.length;i++){
        for(var j =0;j<Lines[i].Words.length;j++){
         if(Lines[i].Words[j].WordText === "only" ){ 
            var totalAmount = '';
            for(let k =0;k<Lines[i].Words.length-1;k++){
            totalAmount += Lines[i].Words[k].WordText + ' ';
                
            }
            break outerloop;
        }}
        
        }
        console.log(totalAmount);
        if(typeof(totalAmount) === 'undefined'){
            return callback(0);
        }else{
        let lCase = totalAmount.toLowerCase();
        let formatted = lCase.replace(/-/g," ");
        let amountInNumbers = wTn.convert(formatted);
        callback(amountInNumbers);
        }
}

function searchMake(Lines,callback){
    outerloop:
    for(var i =0;i<Lines.length;i++){
        var make ='';
        for(var j =0;j<Lines[i].Words.length;j++){   
       if(Lines[i].Words[j].WordText === "Description" ){ 
            var left = Lines[i].Words[j].Left;
            var top = Lines[i].Words[j].Top;
             for(var m =0;m<Lines.length;m++){
                
                for(var n =0;n<Lines[m].Words.length;n++){ 
                  if(Lines[m].Words[n].Left >= (left-1) && Lines[m].Words[n].Top >= (top+14) && Lines[m].Words[n].Top <= (top+27)) {
                        make += Lines[m].Words[n].WordText + " ";
                  } 
                }}
                
         break outerloop;
        }
        }
        
}
        callback(make);

}
         
exports.wordSearch = wordSearch;
exports.searchRetailer = searchRetailer;




 // outer_loop:
    // for(var i=0;i<Lines.length;i++){
    //     for(var j =0;j<Lines[i].Words.length;j++){
    //         if (Lines[i].Words[j].WordText === "Grand" && Lines[i].Words[j+1].WordText === "Total:"){
    //           console.log(Lines[i].Words[j].WordText )
    //             const left = Lines[i].Words[j].Left;
    //             const top = Lines[i].Words[j].Top;
    //             console.log(left+"and"+top)
    //             searchAmount(Lines,left,top);
    //             break outer_loop;
    //         }
    //     }
    // }

    //   function searchPaid(Lines,left,top){
//     console.log("It has come here also")
//     lowerTop = top-3;
//     upperTop = top+3;
//     for(var i=0;i<Lines.length;i++){
//         for(var j =0;j<Lines[i].Words.length;j++){
//             if (Lines[i].Words[j].Top >= lowerTop && Lines[i].Words[j].Top<=upperTop
//                  && Lines[i].Words[j].WordText.charAt(0)=="$"){
//                 const total = Lines[i].Words[j].WordText;
//                 console.log("The amount is: "+total);
//                 break;
//             }
//         }
//     }
    
//  }
 
        









