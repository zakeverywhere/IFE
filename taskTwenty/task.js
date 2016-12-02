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
      var input = $("input").value;
      //check input value.
      if(input === "") {return false;}
      if(stack.length>=60){alert("there are 60 elements already!");return false}
      var parse = input.split(/[^A-Za-z0-9\u4e00-\u9fa5]/);
      
      return parse;
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
      if(stack.length < 2 ){return}

      //disable buttons
      disableBtns(true);

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
         bar.style.height = 80;
         
         $("display").appendChild(bar);
      }
   }

   

   //functions for button handler
   function leftIn(){
      if(getInput()){
         var input = getInput().reverse();
         for (var i = 0; i < input.length; i++) {
            
            if(input[i]===""){continue;}
            stack.splice(0,0,input[i]);
         }
         
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
         var input = getInput();
         for (var i = 0; i < input.length; i++) {
            if(input[i]===""){continue;}
            stack.push(input[i]);
         }
         renderStack();
      }
   }

   function rightOut(){
      if(stack.length === 0 ){return}
      stack.pop();
      renderStack();
   }

   function search(){
      var input = getInput();
      for (var i = 0; i < input.length; i++) {
         //do a string matching
         var pattern = input[i];
         var regExp = new RegExp(pattern);
         for (var j = 0; j < stack.length; j++) {

            if(regExp.test(stack[j])){
               var bar = document.getElementsByClassName("bar");
               bar[j].style.color = "black";
            }
         }
      }
   }

   function clear(){
      renderStack();
   }
   function initHandler(){
      $("left-in").addEventListener("click",leftIn);
      $("left-out").addEventListener("click",leftOut);
      $("right-in").addEventListener("click",rightIn);
      $("right-out").addEventListener("click",rightOut);
      $("search").addEventListener("click",search);
      $("clear").addEventListener("click",clear);
     
   }

   initHandler();
   renderStack();

}