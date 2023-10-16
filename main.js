const todoList = [];
let todoButton = document.getElementById("addTodoButton");
todoButton.addEventListener("click", addToList);

function addToList() {
  if (document.getElementById("error").innerText.length != 0) {
    document.getElementById("error").innerText = "";
  }

  const inputName = document.getElementById("input").value;
  if (inputName.length != 0) {
    let todoObject = {
      todoId: todoList.length,
      todoName: inputName,
      todoComp: false,
      todoAni: false,
    };
    // console.log(todoObject);
    document.getElementById("input").value = ""; //Clears the <input> field
    todoList.push(todoObject);
    todoOutput();
  } else
    document.getElementById("error").innerText = "Input must not be empty";
    document.getElementById("error").classList.add("error");
  }
  
  function todoOutput() {
    //Clears the list
    document.getElementById("error").classList.remove("error");
  document.getElementById("myTodoList").innerHTML = "";

  todoList.forEach((index) => {

    let dynamicLi = document.createElement("li"); //Creates a list item
    let myLable = document.createElement("label"); //Creates a lable in the list item abowe
    let myPara = document.createElement("p"); //Creates a <p> to the label

    //Checks what CSS class to use.
    myPara.classList.add("todoListItem");
    if (!index.todoAni) {
      myPara.classList.add("todoInsertAni");
      index.todoAni = true;
    }

    if (index.todoComp) {
      myPara.classList.add("taskDone");
    }
    myPara.setAttribute("id", index.todoId);

    //Block for: "Click to compleate task"
    myPara.addEventListener("click", function () {
      if (index.todoComp != true) {
        index.todoComp = true;
        todoOutput();
      } else index.todoComp = false;
      todoOutput();
    });

    // Block for: to add delete icon's with eventListeners
    let mySpan = document.createElement("div");
    mySpan.classList.add("trashcan");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.addEventListener("click", function () {
      if (todoList.length == 1) {
        todoList.pop();
      } else todoList.splice(todoList.indexOf(index), 1);
    });
    mySpan.appendChild(deleteIcon);

    myPara.textContent = index.todoName; //Sets the todoTask to the P-tag
    myLable.appendChild(myPara); //appends the <p> to the Lable
    myPara.appendChild(mySpan);
    // myPara.appendChild(mySpan);
    dynamicLi.appendChild(myLable); //appends the lable with <p> to the Line
    document.getElementById("myTodoList").appendChild(dynamicLi);
  });
  countCompleation(todoList);
}

function countCompleation(list) {
  let count = 0;
  list.forEach((comp) => {
    if (comp.todoComp) count++;
  });
  counter.textContent = count + " Completed";
}
