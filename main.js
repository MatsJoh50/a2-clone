var todoList = [];
var todoButton = document.getElementById("addTodoButton");
todoButton.addEventListener("click", addToList);

function addToList() {
  var inputName = document.getElementById("input").value;
  if (inputName.length > 0) {
    var todoObject = {
      todoId: todoList.length,
      todoName: inputName,
      todoComp: false,
    };
    // console.log(todoObject);
    document.getElementById("input").value = ""; //Clears the <input> field
    todoList.push(todoObject);
    todoOutput();
  } else alert("Du måste skriva något");
}

function todoOutput() {
  //adress for compleation counter
  const counter = document.getElementById("counter");

  //Clears the list
  document.getElementById("myTodoList").innerHTML = "";
  
  var compCounter = 0;

  todoList.forEach((index) => {
    var idMyPara = index.todoId;

    var dynamicLi = document.createElement("li"); //Creates a line
    var myLable = document.createElement("label"); //Creates a lable in the Line abowe
    var myPara = document.createElement("p"); //Creates a <p> to the label

    //Checks what CSS class to use.
    myPara.classList.add("settings");
    if (index.todoComp) {
      myPara.classList.add("taskDone");
      compCounter++
    }
    myPara.setAttribute("id", idMyPara);

    myPara.addEventListener("click", function () {
      if (index.todoComp != true) {
        index.todoComp = true;
        todoOutput();
      } else index.todoComp = false;
      todoOutput();
    });

  // *** Try to add edit and delete icon's with eventListeners ***
  var mySpan = document.createElement("span");
  // mySpan.classList.add("box");

  var editIcon = document.createElement("i");
  editIcon.classList.add("fa");
  editIcon.classList.add("fa-pencil-square");

  var deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa");
  deleteIcon.classList.add("fa-trash");


  mySpan.appendChild(editIcon);
  mySpan.appendChild(deleteIcon);

  
  myPara.textContent = index.todoName; //Sets the todoTask to the P-tag
  myLable.appendChild(myPara); //appends the <p> to the Lable
  dynamicLi.appendChild(myLable); //appends the lable with <p> to the Line
  dynamicLi.appendChild(mySpan);
  document.getElementById("myTodoList").appendChild(dynamicLi);
    
    
    
    //Counter
    counter.textContent = "Compleated tasks: " + compCounter;
  });


}
