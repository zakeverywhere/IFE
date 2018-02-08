window.onload = function(){

   var InputRenderer = function(inputId,displayId){
      this.data = [];
      this.inputId = inputId;
      this.displayId = displayId;
   }

   InputRenderer.prototype.getInput = function(){
      var renderer = this;
      var input = $("#"+renderer.inputId).value.trim();
      //check input value.
      if(input === "") {return false;}
      var parse = input.split(/[^A-Za-z0-9\u4e00-\u9fa5]/).filter(function(v){
         return v!=="";
      });
      return parse;
   }

   InputRenderer.prototype.render = function(){
      var renderer = this;
      var display = $("#"+renderer.displayId);
      display.innerHTML = "";
      
      renderer.data.map(function(value){
         display.innerHTML += "<tag>"+value+"</tag>";
      });
   }
      

   InputRenderer.prototype.add = function(){
      var renderer = this;
      var input = renderer.getInput();
      if(input){
         input.map(function(i){
         if(renderer.data.indexOf(i)===-1){
            renderer.data.push(i);
            if(renderer.data.length>10){
               renderer.data.splice(0,1);
            }
         }
      })
      renderer.render();
      }
   }

   InputRenderer.prototype.trigger = function(id,type){
      var renderer = this;
      switch(type){
         case "button" :

            $("#"+renderer.triggerId).addEventListener("click",function(){
               renderer.add();
            })
            break;
         case "autoLine" :
            var trigger = $("#"+renderer.triggerId);
            trigger.addEventListener("keyup",function(e){
               //13 is enter ,32 is space , 188 is semicolom
               if(e.keyCode==13|| e.keyCode==32 ||e.keyCode==188){
                  renderer.add();
                  trigger.value = "";
               }
            })
            break;
         case "hover":
            
         default:
            break;
      }
   }

   var tagRenderer = new InputRenderer("tag-input","tag-display","tag-input");
   tagRenderer.initHandler("autoLine");
   var instRenderer = new InputRenderer("interest-input","interest-display","interest-confirm");
   instRenderer.initHandler("button");
   

   function $(input){
      return document.querySelector(input);
   }
   // var tag = [100,200,300,400];
   // var interest = [200,300,300,400];
   // //helper function to get element from id
   // function $(info){
   //    return document.querySelector(info);
   // }

   // //get tag input from user
   // function getTag(){
   //    var input = $("#tag-input").value.trim();
   //    //check input value.
   //    if(input === "") {return false;}
   //    if(tag.length>=60){alert("there are 60 elements already!");return false}
   //    var parse = input.split(/[^A-Za-z0-9\u4e00-\u9fa5]/).filter(function(v){
   //       return v!=="";
   //    });
   //    return parse;
   // }

   // //get interest input
   // function getInst(){
   //    var input = $("#interest-input").value.trim();
   //    //check input value.
   //    if(input === "") {return false;}
   //    var parse = input.split(/[^A-Za-z0-9\u4e00-\u9fa5]/).filter(function(v){
   //       return v!=="";
   //    });
   //    return parse;
   // }

   // //render stack using div
   // function renderInst(){
   //    $("#interest-display").innerHTML = "";
   //    interest.map(function(value){
   //       $("#interest-display").innerHTML+="<tag>"+value+"</tag>";
   //    })
   // }

   // function renderTag(){
   //    $("#tag-display").innerHTML = "";
   //    tag.map(function(value,index){
   //       var t = document.createElement("tag");
   //       t.innerHTML = value;
   //       t.addEventListener("mouseover",function(){
   //          t.innerHTML = "delete";
   //       })
   //       t.addEventListener("mouseout",function(){
   //          t.innerHTML = value;
   //       })
   //       t.addEventListener("click",function(){
   //          tag.splice(index,1);

   //          renderTag();
   //       })
   //       $("#tag-display").appendChild(t);
   //    })
   // }
   // function addTag(){
   //    var input = getTag();
   //    if(input){
   //      input.map(function(i){
   //       if(tag.indexOf(i)===-1){
   //          tag.push(i);
   //          if(tag.length>10){
   //             tag.splice(0,1);
   //          }
   //       }
   //    })
   //    renderTag();
   //    }
   // }
   // function addInst(){
   //    var input = getInst();
   //    if(input){
   //       input.map(function(i){
   //       if(interest.indexOf(i)===-1){
   //          interest.push(i);
   //          if(interest.length>10){
   //             interest.splice(0,1);
   //          }
   //       }
   //    })
   //    renderInst();
   //    }
      
   // }

   // function clear(){
   //    renderStack();
   // }
   // function initHandler(){
   //   $("#tag-input").addEventListener("keyup",function(e){
   //       //13 is enter
   //       if(e.keyCode==13|| e.keyCode==32 ||e.keyCode==188){
   //          addTag();
   //          $("#tag-input").value = "";
   //       }
   //   })
   //   $("#interest-confirm").addEventListener("click",addInst);
   // }

   // initHandler();
   // renderTag();
   // renderInst();

}