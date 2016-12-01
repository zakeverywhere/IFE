window.onload = function(){
   var stack = [10,20,30,50,30,20,10,80,20];
   var timer;
   var delay = 50;

   //helper function to get element from id
   function $(id){
      return document.getElementById(id);
   }

   //helper function to find is stack sorted
   function isSorted(){
      for (var i = 0; i < stack.length-1; i++) {
      if(stack[i+1]<stack[i]){return false;}
      }
      return true;
   }

   //get input from user
   function getInput(){
      var input = $("input").value.trim();
      //check input value.
      if(input === "") {return false;}
      if(!(input>=10 && input<=100)) {alert("input has to be between 10 to 100");return false;}
      if(stack.length>=60){alert("there are 60 elements already!");return false}
      return input;
   }

   //color comparing pair in sorting
   function colorSelected(i,j){
      var bars = document.getElementsByClassName("bar");
      bars[i].style.backgroundColor = "pink";
      bars[j].style.backgroundColor = "pink";
   }

   //helper to compare 2 numbers in stack by their index
   function compare(i,j){
      if(stack[i]>stack[j]){
         var temp = stack[i];
         stack[i] = stack[j];
         stack[j] = temp;
      }
   } 

   //turn on and off buttons
   function disableBtns(disabled){
      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
         btns[i].disabled = disabled;
      }
   }
   //function for sort
   function bubbleSort(){
      //disable buttons
      disableBtns(true);

      if(stack.length < 2 ){return}

      //commit sorting
      var i=0,j = stack.length-1;
      timer = window.setInterval(function(){
         renderStack();
         if(!isSorted()){
            //compare 2 numbers
            colorSelected(i,i+1);
            compare(i,i+1);

            if(i===j-1){
               i=0;j--;return;
            }
            i++;
         }else{
            clearTimeout(timer);
            disableBtns(false);
         }
      },delay);
   }

   //render stack using div
   function renderStack(){
      $("display").innerHTML = "";
      for (var i = 0; i < stack.length; i++) {
         var bar = document.createElement('div');
         bar.className = "bar";
         bar.innerHTML = stack[i];
         bar.style.height = stack[i];
         bar.style.left = i*32;//32 = 30px(width)+2px(padding);
         $("display").appendChild(bar);
      }
   }

   

   //functions for button handler
   function leftIn(){
      if(getInput()){
         stack.splice(0,0,getInput());
         renderStack();
      }
   }

   function leftOut(){
      if(stack.length === 0 ){return}
      stack.splice(0,1);
      renderStack();
   }

   function rightIn(){
      if(getInput()){
         stack.push(getInput());
         renderStack();
      }
   }

   function rightOut(){
      if(stack.length === 0 ){return}
      stack.pop();
      renderStack();
   }

   function initHandler(){
      $("left-in").addEventListener("click",leftIn);
      $("left-out").addEventListener("click",leftOut);
      $("right-in").addEventListener("click",rightIn);
      $("right-out").addEventListener("click",rightOut);
      $("sort").addEventListener("click",bubbleSort);
   }

   initHandler();
   renderStack();

}