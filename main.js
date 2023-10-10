const todoList = [];
let todoButton = document.getElementById("addTodoButton");
todoButton.addEventListener("click", addToList);

const menu = document.querySelector("#menuBox");
const dropDownMenu = document.getElementById("dropDownMenuButton");
dropDownMenu.addEventListener("click", dropMenu);



  function dropMenu() {
  if(menu.classList.contains("dropDownMenuStart")){
    menu.classList.remove("dropDownMenuStart");
    menu.classList.add("dropDownMenuFinnish");
    dropDownMenu.classList.add("glow");
  } else{
    
    menu.classList.remove("dropDownMenuFinnish");
    menu.classList.add("dropDownMenuStart");
    dropDownMenu.classList.remove("glow");
  }

};


function addToList() {
  const inputName = document.getElementById("input").value;
  if (inputName.length != 0) {
    let todoObject = {
      todoId: todoList.length,
      todoName: inputName,
      todoComp: false,
    };
    // console.log(todoObject);
    document.getElementById("input").value = ""; //Clears the <input> field
    todoList.push(todoObject);
    todoOutput();
  } else document.getElementById("input").value = "Du måste skriva något";
}

function todoOutput() {
  //Clears the list
  document.getElementById("myTodoList").innerHTML = "";

  todoList.forEach((index) => {

    let dynamicLi = document.createElement("li"); //Creates a list item
    let myLable = document.createElement("label"); //Creates a lable in the list item abowe
    let myPara = document.createElement("p"); //Creates a <p> to the label

    //Checks what CSS class to use.
    myLable.classList.add("settings");
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
    let mySpan = document.createElement("span");
    mySpan.classList.add("box");
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
    myPara.appendChild(mySpan);
    myLable.appendChild(myPara); //appends the <p> to the Lable
    dynamicLi.appendChild(myLable); //appends the lable with <p> to the Line
    document.getElementById("myTodoList").appendChild(dynamicLi);
  });
  countCompleation(todoList);
  sunset();
}

function countCompleation(list) {
  let count = 0;
  list.forEach((comp) => {
    if (comp.todoComp) count++;
  });
  counter.textContent = "Compleated tasks: " + count;
}

function sunset() {
  let whatTime = todoList.length * 10;
  // getComputedStyle(document.documentElement).getPropertyValue('--sunset') = whatTime;
  document.documentElement.style.setProperty('--sunset', whatTime + '%')
}