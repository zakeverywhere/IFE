window.onload = function(){
  var stack = [];
  
  $("left-in").addEventListener("click",function(event){
    if(getInput()){
      stack.splice(0,0,getInput());
      updateDisplay();
    }
  })

  $("right-in").addEventListener("click",function(event){
    if(getInput()){
      stack.push(getInput());
      updateDisplay();
    }
  })

  $("left-out").addEventListener("click",function(event){
    if(stack.length === 0 ){return}
    var value = stack.splice(0,1)[0];
    console.log(value);
    updateDisplay();
  })

  $("right-out").addEventListener("click",function(event){
    if(stack.length === 0 ){return}
    var value = stack.pop();
    console.log(value);
    updateDisplay();
  })

  function updateDisplay(){
    
    $("stack").innerHTML = stack;

  }

  function getInput(){
    var input = $("input").value;
    if(input.match(/[^0-9]/)) {console.log("false input");return false;}
    return input;
  }

  function $(id){
    return document.getElementById(id);
  }
}