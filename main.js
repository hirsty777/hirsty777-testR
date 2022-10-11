
const table=document.getElementById('submited-info');
const form=document.getElementById("data-form");

//counter
let uI=0;
let idCounter=0;

//array oof form submits
const inputsObject=[];

    
//validate form
function validateForm(){
  
  if(!validateFirstName()||!validateLastName()||!validateAddres()){
    console.log('not valid');
  }
  else{
    showInputValues();
  };
  
};



//validate first name
function validateFirstName(){
  const firstName=document.getElementById('first-name');
  var pattern=/[a-zA-Z]/;

  if(firstName.value.match(pattern)){
    document.getElementById('first-name-validate-text').style.color='white';
    return true;
  }else{
    document.getElementById('first-name-validate-text').style.color='red';
    return false ;
  };
};

//validate last name
function validateLastName(){
  const lastName=document.getElementById('last-name');
  var pattern=/[a-zA-Z]/;

  if(lastName.value.match(pattern)){
    document.getElementById('last-name-validate-text').style.color='white';
    return true;
  }else{
    document.getElementById('last-name-validate-text').style.color='red';
    return false;
  };
};

//validate addres length (must be less then 35)
function validateAddres(){
  const address=document.getElementById('address');
  
  if(address.value.length>35||address.value.length<2){
    document.getElementById('addres-validate-text').style.color='red';
    return false;
  }
  else{
    document.getElementById('addres-validate-text').style.color='white';
    return true;
  };
};



//deploy values to html table
function showInputValues(){
  const firstName=document.getElementById('first-name');
  const lastName=document.getElementById('last-name');
  const address=document.getElementById('address');

  const dateOfBirth=document.getElementById('date-of-birth');
  const gender=document.getElementById('gender');
  const note=document.getElementById('note');

     
    //push new input values
     inputsObject.push({
      uI:uI,
      id:idCounter,
      Fname:firstName.value,
      Lname:lastName.value,
      address:address.value,
      dateOfBirth:dateOfBirth.value,
      gender:gender.value,
      note:note.value
      });

    localStorage.setItem('fName',JSON.stringify(inputsObject));

    //add from values to html and reset form after submit
    table.innerHTML+=`
    <tr id="${uI}" onclick="showNote(this)">
    <td>${idCounter}</td>
    <td>${firstName.value}</td>
    <td>${lastName.value}</td>
    <td>${address.value}</td>
    <td>${dateOfBirth.value}</td>
    <td>${gender.value}</td>
    <td><svg onclick="deleteRow(this)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
    <div class="popup-note">
    <div class="note">Note<br>${note.value}</div>
    </div></td>
    </tr>
    `;
    form.reset();
    
    idCounter++;
    uI++;

};

 
//delete row=============================================
function deleteRow(th){
  th.closest('tr').remove();
  //target clicked rows id
  let currentId=parseInt(th.closest('tr').id);
  
  const enteredObject=localStorage.getItem('fName');
  const parsedenteredObject=JSON.parse(enteredObject);
 
  //
  for(var i=currentId; i < parsedenteredObject.length;i++){
    parsedenteredObject[i].uI=parsedenteredObject[i].uI-1;
    parsedenteredObject[i].id=parsedenteredObject[i].id-1;
  };
  
  //delete array based on clicked row id
  parsedenteredObject.splice(th.closest('tr').id,1);
  localStorage.setItem('fName',JSON.stringify(parsedenteredObject));
  
  document.location.reload();

};

//add remove active class on note(popup message)
function showNote(noteValue){
  noteValue.querySelector('.popup-note').classList.toggle('active');
};





//on page reload==============
window.onload=function (){
  const enteredObject=localStorage.getItem('fName');
  const parsedenteredObject=JSON.parse(enteredObject);

 
  
  for(var i=0; i<parsedenteredObject.length;i++){
    inputsObject.push(parsedenteredObject[i]);
    
    
    table.innerHTML+=`
    <tr id="${uI}" onclick="showNote(this)">
    <td>${idCounter}</td>
    <td>${parsedenteredObject[i].Fname}</td>
    <td>${parsedenteredObject[i].Lname}</td>
    <td>${parsedenteredObject[i].address}</td>
    <td>${parsedenteredObject[i].dateOfBirth}</td>
    <td>${parsedenteredObject[i].gender}</td>
    <td><svg onclick="deleteRow(this)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
    <div class="popup-note">
    <div class="note">Note<br>${parsedenteredObject[i].note}</div>
    </div></td>
    </tr>
    `;

    uI=parsedenteredObject[i].uI+1;
    idCounter=parsedenteredObject[i].id+1;
  };

};