let inputTextArea = document.getElementById("text_Area");
let toDoList = document.getElementById("ToDoList");
let s, keyId = 0;
function saveToLocalStorage(s) {
  localStorage.setItem(`${keyId}`, s);
}
function getListData(num) {
  return JSON.parse(localStorage.getItem(num));
}
document.querySelector(".close_btn").addEventListener("click",function(){
  let x = document.querySelector(".popUpShow");
  x.setAttribute("class","popUpHide");
  inputTextArea.value="";
  inputTextArea.focus();
});
inputTextArea.addEventListener("keyup", function (event) {
  if (event.code == "Enter") {
    s = inputTextArea.value.trim();
    if(s=="") {
      let x = document.querySelector(".popUpHide");
      x.setAttribute("class", "popUpShow");
      inputTextArea.value="";
      inputTextArea.blur();
      x.focus();
      return;
    }
    let a = {
      data: s,
      flag: false,
    };
    inputTextArea.value = "";
    saveToLocalStorage(JSON.stringify(a), false);
    addListElement(keyId);
    keyId++;
    inputTextArea.blur();
  }
});

function addListElement(num) {
  let x = getListData(num);
  let newListElement = createListDivElement(x.data,x.flag, num);
  toDoList.appendChild(newListElement);
}

function createListDivElement(mydata, myflag, myId) {
  let d = document.createElement("div");
  d.setAttribute("id", `my-div${myId}`);
  d.setAttribute("class", "listDesign");
  let a, b, c, e;
  a = document.createElement("div");
  a.setAttribute("class", "listText");
  a.setAttribute("id", `text-Id${myId}`);
  a.innerHTML = mydata;
  if(myflag) a.style.textDecoration="line-through";
  else  a.style.textDecoration="none";
  b = document.createElement("div");
  b.setAttribute("class", "checkBoxDiv");
  let checkBoxElement = document.createElement("input");
  checkBoxElement.setAttribute("type", "checkbox");
  checkBoxElement.setAttribute("id", `my-id${myId}`);
  if(myflag) checkBoxElement.checked = true;
  else checkBoxElement.checked = false;
  checkBoxElement.addEventListener("click", function () {
    changeTextDecoration(`my-id${myId}`, `text-Id${myId}`,myId);
  });
  b.appendChild(checkBoxElement);
  c = document.createElement("div");
  c.setAttribute("class", "crossButtonDiv");
  let crossbtn = document.createElement("img");
  crossbtn.setAttribute("class","deleteImage");
  crossbtn.setAttribute("id", `my-btn${myId}`);
  crossbtn.setAttribute("src","delete.png");
  crossbtn.addEventListener("click", function () {
    deleteDiv(`my-div${myId}`, myId);
  });
  c.appendChild(crossbtn);
  e = document.createElement("div");
  e.setAttribute("class", "editDiv");
  e.setAttribute("id",`my-edit${myId}`);
  let editimg = document.createElement("img");
  editimg.setAttribute("class","editImage");
  editimg.setAttribute("id",`my-edit-image${myId}`);
  editimg.setAttribute("src","editIcon.png");
  editimg.addEventListener("click",function(){
    editTask(`my-div${myId}`,`text-Id${myId}`,`my-id${myId}`,myId);
  });
  e.appendChild(editimg);
  d.appendChild(a);
  d.appendChild(e);
  d.appendChild(b);
  d.appendChild(c);
  return d;
}

function changeTextDecoration(checkBoxId, textId,localId) {
  let x = document.getElementById(checkBoxId);
  let t = document.getElementById(textId);
  let localFlag=false;
  if (x.checked) {
    t.style.textDecoration = "line-through";
    localFlag=true;
}
  else {
    t.style.textDecoration = "none";
    localFlag=false;
  }
  let s={
    data: t.innerHTML,
    flag: localFlag
  };
  localStorage.setItem(localId,JSON.stringify(s));
}

function deleteDiv(divId, localId) {
  let item = document.getElementById(divId);
  localStorage.removeItem(localId);
  item.parentElement.removeChild(item);
}

function editTask(editId,editTextId,checkboxId,localId){
  let text;
  console.log(checkboxId);
  let target_parent = document.getElementById(editId);
  let target_child = document.getElementById(editTextId);
  let checkbox = document.getElementById(checkboxId);
  let new_element = document.createElement("input");
  new_element.setAttribute("class","new_input_box");
  new_element.setAttribute("id","edit_entery");
  new_element.value=target_child.innerHTML;
  new_element.addEventListener("focusout",function(){
    text=new_element.value.trim();
      let a = {
        data: text,
        flag: false,
      }
      localStorage.setItem(localId,JSON.stringify(a));
      let new_div = document.createElement("div");
      new_div.setAttribute("class","listText");
      new_div.setAttribute("id", `text-Id${localId}`);
      new_div.innerHTML = text;
      target_parent.replaceChild(new_div,new_element);
      checkbox.checked=false;
  });
  target_parent.replaceChild(new_element,target_child);
  new_element.focus();
  new_element.addEventListener("keyup",function(event){
    if(event.code=="Enter"){
      text=new_element.value.trim();
      let a = {
        data: text,
        flag: false,
      }
      localStorage.setItem(localId,JSON.stringify(a));
      let new_div = document.createElement("div");
      new_div.setAttribute("class","listText");
      new_div.setAttribute("id", `text-Id${localId}`);
      new_div.innerHTML = text;
      target_parent.replaceChild(new_div,new_element);
      checkbox.checked=false;
    }
  });


};
window.addEventListener("load", function () {
    let keys = Object.keys(localStorage);
    keys.sort();
    if(keys.length>0){
        for(let a of keys){
            addListElement(a);
        }
        keyId=(keys[keys.length-1])-1+2;
    }
});
