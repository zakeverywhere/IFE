window.onload = function(){
  var stack = [];
  updateDisplay();
  var timerOutter;
  var sortFlag = false;
  $("left-in").addEventListener("click",function(event){
   if(sortFlag){alert("im sorting!!")}
    if(getInput()){
      stack.splice(0,0,getInput());
      updateDisplay();
    }
  })

  $("right-in").addEventListener("click",function(event){
   if(sortFlag){alert("im sorting!!")}
    if(getInput()){
      stack.push(getInput());
      updateDisplay();
    }
  })

  $("left-out").addEventListener("click",function(event){
   if(sortFlag){alert("im sorting!!")}
    if(stack.length === 0 ){return}
    var value = stack.splice(0,1)[0];
    
    updateDisplay();
  })

  $("right-out").addEventListener("click",function(event){
   if(sortFlag){alert("im sorting!!")}
    if(stack.length === 0 ){return}
    var value = stack.pop();
    updateDisplay();
  })


   $("sort").addEventListener("click",function(event){
      if(sortFlag){alert("im sorting!!")}
      if(sortFlag){return;}
      sortFlag = true;

      if(stack.length < 2 ){return}
      var i = 0;
      var j = stack.length-2;
      var timerOutter = window.setInterval(function(){
         updateDisplay();
         if(!isSorted()){
            
            colorSelected(i);

            if(i<j){
               i++;
            }else{
               j--;
               i=0;
            }
         }else{
            clearTimeout(timerOutter);
            sortFlag = false;
            alert("sort finished!");
         }
      },500);
   })

  function isSorted(){
   for (var i = 0; i < stack.length-1; i++) {
      if(stack[i+1]<stack[i]){return false;}
   }
   return true;
  }

  function colorSelected(i){
      var bars = document.getElementsByClassName("bar");
      bars[i].className += " selected";
      bars[i+1].className += " selected";
      if(stack[i+1]<stack[i]){
         //swap number
         var temp = stack[i];
         stack[i] = stack[i+1];
         stack[i+1] = temp;
      }
   }

  function updateDisplay(){

    $("display").innerHTML = "";
    for (var i = 0; i < stack.length; i++) {
      var bar = document.createElement('div');
      bar.className = "bar";
      bar.innerHTML = stack[i];
      bar.style.height = stack[i];
      bar.style.left = i*32;
      bar.animate({height:'100'});
      $("display").appendChild(bar);
    }
  }

  function getInput(){
    var input = $("input").value;
    //check input value.
    if(!(input>=10 && input<=100)) {alert("false input");return false;}
    if(stack.length>=60){alert("there are 60 elements already!");return false}
    return input;
  }

  function $(id){
    return document.getElementById(id);
  }
}