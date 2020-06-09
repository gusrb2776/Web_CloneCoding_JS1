const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];



function deleteToDo(event){
  const li = event.target.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}


function  saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}


function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}


function loadtoDos(){
  const loadtoDos = localStorage.getItem(TODOS_LS);
  if(loadtoDos !== null){
      const parsedToDos = JSON.parse(loadtoDos);
      parsedToDos.forEach(function(e){
          paintToDo(e.text);
      });
  }
}


function init(){
  loadtoDos();
  toDoForm.addEventListener("submit",handleSubmit);
}

init();
