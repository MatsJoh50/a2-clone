let todoList = [];
let todoButton = document.getElementById("addTodoButton");
todoButton.addEventListener("click", addToList);

function addToList() {
  let inputName = document.getElementById("input").value;
  if (inputName.length > 0) {
    let todoObject = {
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

  let compCounter = 0;

  todoList.forEach((index) => {
    // let idMyPara = index.todoId;

    let dynamicLi = document.createElement("li"); //Creates a line
    let myLable = document.createElement("label"); //Creates a lable in the Line abowe
    let myPara = document.createElement("p"); //Creates a <p> to the label

    //Checks what CSS class to use.
    myLable.classList.add("settings");
    if (index.todoComp) {
      myPara.classList.add("taskDone");
      compCounter++;
    }
    myPara.setAttribute("id", index.todoId);

    myPara.addEventListener("click", function () {
      if (index.todoComp != true) {
        index.todoComp = true;
        todoOutput();
      } else index.todoComp = false;
      todoOutput();
    });

    // *** Try to add delete icon's with eventListeners ***
    let mySpan = document.createElement("span");
    mySpan.classList.add("box");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.addEventListener("click", function () {
      if(todoList.length == 1){
        todoList.pop();
        compCounter = 0;
        counter.textContent = "Compleated tasks: " + compCounter;
      } else
        todoList.splice(index.todoId, 1);
        compCounter--;
    });
    mySpan.appendChild(deleteIcon);

    myPara.textContent = index.todoName; //Sets the todoTask to the P-tag
    myPara.appendChild(mySpan);
    myLable.appendChild(myPara); //appends the <p> to the Lable
    dynamicLi.appendChild(myLable); //appends the lable with <p> to the Line
    // dynamicLi.appendChild(myPara); //appends the lable with <p> to the Line
    document.getElementById("myTodoList").appendChild(dynamicLi);

    //Counter
    counter.textContent = "Compleated tasks: " + compCounter;
  });
}
