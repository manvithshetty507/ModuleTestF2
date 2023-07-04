let body = document.body;

let getButton = document.querySelector("#form-btn");
let searchBar = document.querySelector("#search");

//update id
function updateIds(){
    const table = document.querySelector("table");
    let rows = table.getElementsByTagName("tr");

    for(let i=0;i<rows.length;i++) {
        let idCell = rows[i].getElementsByTagName("td")[0];
        if(idCell == undefined) continue;
        idCell.textContent = i;
    }
}

//To add edit and delete icons at end
function createIcons() {
var editIcon = document.createElement('i');
editIcon.classList.add('fas', 'fa-edit' , 'icons1'); // Font Awesome classes for edit icon

var deleteIcon = document.createElement('i');
deleteIcon.classList.add('fas', 'fa-trash', 'icons2'); // Font Awesome classes for delete icon

var iconContainer = document.createElement('td');

editIcon.addEventListener("click",updateStudent);
deleteIcon.addEventListener("click",deleteStudent);

iconContainer.appendChild(editIcon);
iconContainer.appendChild(deleteIcon);

return iconContainer;
}

//add Student
function addStudent(name,email,gpa,age,degree) {

    let table = document.querySelector("tbody");

    let newRow = table.insertRow(table.rows.length);
    //ID
    let idNo = newRow.insertCell(0);
    idNo.textContent = table.rows.length - 1;

    //Name
    let nameCell = newRow.insertCell(1);
    nameCell.textContent = name;

    //email
    let emailCell = newRow.insertCell(2);
    emailCell.textContent = email;

    //gpa
    let gpaCell = newRow.insertCell(3);
    gpaCell.textContent = gpa;

    //age
    let ageCell = newRow.insertCell(4);
    ageCell.textContent = age;

    //degree
    let degreeCell = newRow.insertCell(5);
    degreeCell.textContent = degree;
    degreeCell.classList.add("degree-cell");

    degreeCell.appendChild(createIcons());

    //update IDno's
    updateIds()
}

//delete Student
let deleteStudent = function removeStudent(event) {
    const element = event.target.parentNode.parentNode.parentNode;
    const index = element.ID;
    console.log(element,index);

    let table = document.querySelector("tbody");
    table.deleteRow(index);

    updateIds(); 
}


//update Student
let updateStudent = function update(event) {
    const element = event.target.parentNode.parentNode.parentNode;
    let row = element.getElementsByTagName("td");
    let index = row[0].textContent;

    let addButton = document.querySelector("#form-btn");
    addButton.id = "edit-btn";

    let editBtn = document.querySelector("#edit-btn");
    editBtn.innerHTML = "Edit Student";
    editBtn.removeEventListener("click",student);
    editBtn.addEventListener("click",function() {
        getAndUpdate(index);
    });
}

//get and update
let getAndUpdate = function getUpdate(index) {

    let tbody = document.querySelector("tbody");

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let gpa = document.querySelector("#gpa").value;
    let age = document.querySelector("#age").value;
    let degree = document.querySelector("#degree").value;
    
    let arr = [name,email,gpa,age,degree];

    let rowCollection = tbody.getElementsByTagName("tr");

    let row = rowCollection[index-1].getElementsByTagName("td");
    
    for(let i=0;i<6;i++){
        if(i == 0 ||arr[i] == "") continue;
        
        row[i].textContent = arr[i-1];
    }
    row[5].appendChild(createIcons());
    let addButton = document.querySelector("#edit-btn");

    addButton.removeEventListener("click",function() {
        getAndUpdate(index);
    });
    
    addButton.addEventListener("click",student);

    updateIds();

    addButton.id = "form-btn";
    addButton.innerHTML = "Add Student";

    //reset
    name.value = "";
    email.value = "";
    gpa.value = "";
    age.value = "";
    degree.value = "";
}

//get Student
let student = function getStudent() {

    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let gpa = document.querySelector("#gpa");
    let age = document.querySelector("#age");
    let degree = document.querySelector("#degree");
    
    if(name.value == "" || email.value == "" || gpa.value == "" || age.value == "" || degree.value == ""){
        name.value = "";
        email.value = "";
        gpa.value = "";
        age.value = "";
        degree.value = "";
        return;
    }

    addStudent(name.value,email.value,gpa.value,age.value,degree.value);

    name.value = "";
    email.value = "";
    gpa.value = "";
    age.value = "";
    degree.value = "";
    
}

//search filter

let toSearch = function (event) {
    let search = document.querySelector("#search");

    let table = document.querySelector("tbody");
    let arr = [];

    if(event.key == "Enter") {
        let keyword = search.value;
        keyword = keyword.toLowerCase().trim();
        for(let i=0;i<table.rows.length;i++) {
            let row = table.rows[i];

            let tableName = row.cells[1].textContent.toLocaleLowerCase().trim();
            let tableEmail =row.cells[2].textContent.toLocaleLowerCase().trim();
            let tableDegree = row.cells[5].textContent.toLocaleLowerCase().trim();
            
            if(tableName == keyword || tableDegree == keyword || tableEmail == keyword){
                arr.push(row.innerHTML);
            }
        }
        
        table.innerHTML = ``;

        if(arr.length > 0){
            for(let i=0;i<arr.length;i++) {
                let newTr = document.createElement("tr");
                newTr.innerHTML = `${arr[i]}`;
                newTr.removeChild(newTr.lastChild);
                table.appendChild(newTr);
            }
        }
    }
}

searchBar.addEventListener("keypress",toSearch);

getButton.addEventListener("click",student);