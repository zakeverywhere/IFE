window.onload = function(){
   var curRoot = new Node($("#display"));
   var curTree = new Tree(curRoot);
   var level = -1;

   initBtn();

   function initBtn(){
      $("#traverse").onclick = function(){
         level = getInput();
         if(!level || level>5) {alert("please enter a number < 5");return;}
         $("#display").innerHTML = "";
         appendDiv(0,curRoot);
         curTree.dfs();
      }
   }

   function appendDiv(index,curNode){
      if(index<level){
         curNode.addLeft(new Node(document.createElement("div")));
         curNode.addRight(new Node(document.createElement("div")));
         appendDiv(index+1,curNode.left);
         appendDiv(index+1,curNode.right);
      }
   }


   function getInput(field){
      var value = $("#input").value;
      return /^[0-9]/.test(value)? value:null;
   }
}

var delay = 500;
var Tree = function(root){
   this.root = root;
}


var Node = function(data){
   this.data = data;
   this.left = null;
   this.right = null;
}

Node.prototype.addLeft = function(node){
   var me = this;
   me.left = node;
   me.data.appendChild(node.data);
}

Node.prototype.addRight = function(node){
   var me = this;
   me.right = node;
   me.data.appendChild(node.data);
}

Tree.prototype.dfs = function(){
   var queue = [];
   var me = this;
   var count = 0;

   traverse(me.root,function(data){
     queue.push(data);
   })

   queue[count].style.backgroundColor = "tomato";
   var timer = setInterval(function(){
      count++;
      queue[count-1].style.backgroundColor = "white";
      if(queue[count]){
         queue[count].style.backgroundColor = "tomato";
      }else{
         clearTimeout(timer);
      }
   },delay)
}

function traverse(cur,f){
   if(cur!==null){
      f(cur.data);
      traverse(cur.left,f);
      traverse(cur.right,f)
   }
}


function $(input){
      return document.querySelector(input);
}

