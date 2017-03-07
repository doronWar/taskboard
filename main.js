/**
 * Created by Doron Warzager on 26/02/2017.
 */


function loadHtmlForMembers(){
  const templat =`
<div class="member-page">
  <h2>TaskBoard Members</h2>
  <div class="modal-content">
  <!--<form class="form-horizontal">-->
  <ul class="list-group ">

  </ul>

    <input type="text"  maxlength="25" placeholder="Add New Member" class="new-member-input" id="add-member-input"></input>
    <button type="button" class="btn btn-primary btn-xs btn-add-member">Add Member</button>

</div>
</div>
`
  document.querySelector('.main-screen').innerHTML = templat;
  document.querySelector('.btn-add-member').addEventListener('click', addMember)

}

//creating HTML for members page
function createMemberList(memberName){
  const oneMember = document.createElement('li');
  const listOfMembers = document.querySelector('.list-group');
  // oneMember.textContent = ;
  oneMember.innerHTML +=`
  <span class="memebr-name  ">${memberName}</span>
  <input class ="new-member-name displayState " type="text"  maxlength="25"></input>
  <div>
  <button type="button" class="btn btn-danger edit-member-btn seen delete">Delet</button>
  <button type="button" class="btn btn-primary edit-member-btn edit-btn seen" id="check">Edit</button>
  <button type="button" class="btn btn-default member-save-changes-btn cancel-btn" id="cancel">Cancel</button>
  <button type="button" class="btn btn-success member-save-changes-btn save-btn" id="save">Save</button>
</div>`
  oneMember.className ="list-group-item member-in-list";
  listOfMembers.appendChild(oneMember);

  oneMember.querySelector('.edit-btn').addEventListener('click', changMemberButtonsClasses)
  oneMember.querySelector('.cancel-btn').addEventListener('click', changMemberButtonsClasses)
  oneMember.querySelector('.edit-btn').addEventListener('click', editMemberName)
  oneMember.querySelector('.save-btn').addEventListener('click', editMemberName)
  oneMember.querySelector('.cancel-btn').addEventListener('click', editMemberName)
  // oneMember.querySelector('.delete').addEventListener('click', editMemberName)

}








function createBordHolder() {
  const templat =`
<div id="mainCardHolders">

 <button class="btn btn-default navbar-btn btn-catcher add-button">Add new task</button>

  </div>
`

  document.querySelector('.main-screen').innerHTML = templat;

}






function creatingCarEditModalHtml(){
  const modalTemplate=`
<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Edit Card</h4>
        </div>
        <div class="modal-body editMenuInputes">


          <form class="form-horizontal">
            <div class="form-group">
              <label for="card-text"class="col-sm-2 control-label">Card Text</label>
              <div class="col-sm-10">
                <textarea type="text" id="card-text" class="form-control"></textarea>
              </div>

            </div>
            <div class="form-group">

              <label for="exampleSelect1" class="col-sm-2 control-label">Move To</label>
              <div class="col-sm-10">
                <select class="form-control lists-holder" id="exampleSelect1">

                </select>
              </div>
            </div>
            <label for="exampleSelect1" class="col-sm-2 control-label ">Members</label>
            <div class="col-sm-offset-2 members-input  ">
              <div class="checkbox form-control member-list">

                <label for="Member-name1"><input type="checkbox" name="memeber1" value="memeber1" id="Member-name1">
                Member Name</label>
                <label for="Member-name2"><input type="checkbox" name="memeber2" value="memeber2" id="Member-name2">
                Member Name</label>

              </div>
            </div>
            <button type="button" class="btn btn-danger btn-delete-size">Delete Card</button>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default close-btn" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
`
  const editCardModale = document.createElement('div')
  editCardModale.innerHTML = modalTemplate;
  editCardModale.setAttribute("class", "modal PopUpMenuHide")
  editCardModale.setAttribute("tabindex","-1")
  editCardModale.setAttribute("role","dialog")
  document.querySelector('.main-screen').appendChild(editCardModale)
}







function addMember(e) {
  const newMember = document.querySelector('#add-member-input')
  createMemberList(newMember.value)
  newMember.value ='';

}
function changMemberButtonsClasses(e) {
  const originalButtons = e.target.closest('.member-in-list').querySelectorAll('.edit-member-btn');
  const newButtons = e.target.closest('.member-in-list').querySelectorAll('.member-save-changes-btn');

  toggleMemberMenuButtons(originalButtons);
  toggleMemberMenuButtons(newButtons);
}

function toggleMemberMenuButtons(buttons) {
  for(button of buttons){
    button.classList.toggle('seen')
  }
}


function createEditListPopUp() {

  document.querySelector('.close').addEventListener('click',toggleEditPanle);
  document.querySelector('.close-btn').addEventListener('click',toggleEditPanle);

}

function editMemberName(e) {
  const inputFiled = e.target.closest('.member-in-list').querySelector('.new-member-name');
  const memberName =e.target.closest('.member-in-list').querySelector('.memebr-name');
  memberName.classList.toggle('displayState')

  inputFiled.classList.toggle('displayState')


  if(e.currentTarget.id === 'check') {
    inputFiled.value = memberName.textContent
  }
  if(e.currentTarget.id === 'save') {
    memberName.textContent = inputFiled.value;
  }
  if(e.currentTarget.id === 'cancel') {
    //do nothing
  }
  // if(e.currentTarget.id === 'delete') {
  //   //do nothing
  //   // e.target.closest('.list-group').remove()
  //   console.info('hello');
  // }

}




//the input of the list options move to
function addMoveToOptions(title) {
  const moveToOption = document.querySelector('.lists-holder');
  const newOption = document.createElement('option')
  newOption.innerHTML = title;
  moveToOption.appendChild(newOption);

}

// creating a list
function createNewList(title) {

  const nodereferece = document.querySelector('.btn-catcher')
  const numberOfTasks = 0;

  const listStringHtml = `


<span class="openerTag " >
<!-- bootstrap dropdown menu burtton -->
<div class="btn-group">
  <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" >
    <li class="listOption"><a href="#">Delete List</a></li>
  </ul>
</div>
<input class ="inputTag" type="text" style="display: none" maxlength="25"></input>
<span class="tagText" tabindex="0">${title}</span>
<span class="badge"> ${numberOfTasks} </span> </span>
  
<ul class="ulForCards ">
</ul>
<span class="closerTag" tabindex="0">Add Card</span>`;


//creating the new list:
  const basicTemplete = document.createElement('div');
  const listsholder = document.querySelector('#mainCardHolders');
  basicTemplete.setAttribute("class", "oneLists");
  basicTemplete.innerHTML += listStringHtml;
  listsholder.insertBefore(basicTemplete, nodereferece);

//adding event listeners
  addEventListeners(basicTemplete);

  return basicTemplete;
}

//lists of adding event listeners
function addEventListeners(basicTemplete) {
  //listener to create card
  basicTemplete.querySelector('.closerTag').addEventListener('click', createCardByclick);
  basicTemplete.querySelector('.closerTag').addEventListener('keydown', createCardByclick);
  //listeners for changing list titles
  basicTemplete.querySelector('.tagText').addEventListener('click', upsdateListName);
  setTimeout(basicTemplete.querySelector('.tagText').addEventListener('keydown', upsdateListName), 10);
  basicTemplete.querySelector('.inputTag').addEventListener('blur', inputLitener);
  basicTemplete.querySelector('.inputTag').addEventListener('keydown', inputLitener);


  basicTemplete.querySelector('.dropdown-toggle').addEventListener('click', listDropDownMenuActions);

  basicTemplete.querySelector('.listOption').addEventListener('click', deleteList);

}


function deleteList(event) {
  const listIAmIn = event.target.closest('.oneLists');
  // const listHolder =  event.target.closest('.mainCardHolders')
  const nameOfList = event.target.closest('.oneLists').querySelector('.tagText').textContent
  const deleteCheck = confirm(`Deleting ${nameOfList} list. Are you sure?`);

  //todo why doesn't this work right
  if (!deleteCheck) {
    // event.target.parentNode.parentNode.style.display = 'none'

  }
  else {
    listIAmIn.remove();
  }
}


//                //          dealing with list menu        //        ///       //

//toggle for drop down menu
function listDropDownMenuActions(event) {
  const theMenu = event.currentTarget.parentNode.parentNode.querySelector('.dropdown-menu');


  if (theMenu.style.display === 'none' || !theMenu.style.display) {
    closingListMenu();
    theMenu.style.display = 'block'
  }
  else {

    theMenu.style.display = 'none'

  }
}

//closing list menu by clicking anyhere
function dropDownMenuFocusClose(event) {

  if (event.target.closest('.btn-group')) {
//does nothing if button pressed
  }
  else {
    closingListMenu()
  }

}
//usable modlar function to close all menus when needed
function closingListMenu() {
  // const listsholder = document.querySelector('#mainCardHolders');

  const theMenu = document.querySelector('#mainCardHolders').querySelectorAll('.dropdown-menu')
  console.info(theMenu);
  for (const oneMenu of theMenu) {
    oneMenu.style.display = 'none';
  }
}

//                //          dealing with title        //        ///       //
//chang from span to input in list title
function upsdateListName(e) {

  if (e.type === 'click' || e.keyCode !== 27) {
    const nameHolder = e.target;
    const listName = nameHolder.textContent;
    const nameHolderParent = nameHolder.parentNode;
    const inputeFiled = nameHolderParent.querySelector('input');


    inputeFiled.value = listName;
    inputeFiled.style.display = "inline-block"
    nameHolder.style.display = 'none';
    nameHolder.parentNode.appendChild(inputeFiled)
    inputeFiled.focus();

  }


}


//listening to the inpute when it appears

function inputLitener(event) {
  let newTitle = event.target.value;


  if (event.type === 'keydown') {
    if (event.keyCode === 13) {
      autoReplaceEmptyInputValue(event, newTitle)
    }
    if (event.keyCode === 27) {
      autoReplaceEmptyInputValue(event, '')

    }
  }
  if (event.type === 'blur' && event.target.style.display !== 'none') {

    autoReplaceEmptyInputValue(event, newTitle)
  }


}

//making sure the title will have a value
function autoReplaceEmptyInputValue(event, newTitle) {
  if (newTitle === '' || newTitle === ' ') {
    newTitle = event.target.parentNode.querySelector('.tagText').textContent;
    displayChanger(event, newTitle);
  }
  else {
    displayChanger(event, newTitle);
  }
}

//shifting back from input to span title
function displayChanger(event, newTitle) {
  const finalTitle = event.target.parentNode.querySelector('.tagText')

  finalTitle.textContent = newTitle;

  event.target.style.display = 'none';
  finalTitle.style.display = 'inline-block'

}









//                //          dealing cards        //        ///       //


function cardCreation(text) {
  const cardContent = text || 'Add new task'
  const newCard = document.createElement('li');
  newCard.setAttribute("class", "card");
  const cardsText = document.createElement('p');
  cardsText.setAttribute("class", "cardInnerText");
  newCard.appendChild(cardsText);
  cardsText.textContent = cardContent;
  newCard.innerHTML += `<button class="btn btn-default edit-Card-Button" type="submit">Edit</button>
<div class="label-holder">
</div>`;

  newCard.querySelector('.edit-Card-Button').addEventListener('click', toggleEditPanle);
  // addNewMember('DW', 'doron warzagr', newCard);

  return newCard
}

//function to create a card
function createCardByclick(e) {

  if (e.keyCode === 13 || e.type === 'click') {

    const newCard = cardCreation();
    const parentNode = e.target.closest('.oneLists').querySelector('.ulForCards')
    parentNode.appendChild(newCard);

    // const referenceNode = parentNode.querySelector('ul > li:last-child')
    // parentNode.insertBefore(newCard, referenceNode);
    updateBagde(e, parentNode);
  }

}


function toggleEditPanle() {
  const menuState = document.querySelector('.PopUpMenuHide').style;
  if(menuState.display ==='none' || !menuState.display){
    menuState.display = 'block'
  }
  else{
    menuState.display = 'none'
  }

}

//add memebers to cards
function addNewMember(memberName, fullName, newCard) {
  const newLabel = document.createElement('span');


  newLabel.innerHTML = `<span class="label ${memberLableColors[lColorIndex]} member-label " title=" ${fullName} ">${memberName}</span>`
  newCard.querySelector('.label-holder').appendChild(newLabel);
  if (lColorIndex >= 5)
    lColorIndex = 0;

  lColorIndex++;

}

//this has to be a function that recives a name and returns thee two first lettes

function anitialsCreator(fullname) {
  const nameToArray = fullname.split(' ').map((n) => n[0]);
  return nameToArray.join('');

}


//updating badge number
function updateBagde(badge, parentNode) {

  const badgenumberOfCards = badge.target.parentNode.querySelector('.badge');
  const numbeOfCards = parentNode.querySelectorAll('.card').length;
  badgenumberOfCards.textContent = numbeOfCards;

  //keeping the number in the center of the badge
  if (numbeOfCards >= 10) {
    badgenumberOfCards.style.paddingLeft = '3px';
  }
}







//loading from Jason functions


function activeButton() {
  const button = document.querySelector('.btn-catcher');

  button.addEventListener('click', () => {
    createNewList('New List');
  })
}

function navBarControls() {
  const pageNav = document.querySelector('#page-nav')
  pageNav.addEventListener('click', moveToPage);
}

function moveToPage(e) {
  const chosen = e.target.parentNode;
  if(!chosen.classList.contains('active')){
    e.currentTarget.querySelector('.active').classList.remove('active');
        chosen.classList.add('active');
        }
}

function gettingJasonObject(event) {
  const savedLists = JSON.parse(event.target.responseText);

  //creating the lists
  for (let list of savedLists.board) {
    const loadList = createNewList(list.title)
    addMoveToOptions(list.title);
//adding the cards
    for (let obj of list.tasks) {
      cardCreation(list, obj.text);

      const newCard = cardCreation(obj.text);
      const parentNode = loadList.querySelector('.ulForCards')
      parentNode.appendChild(newCard);
      //adding members
      for (let member of obj.members) {
        // console.info(member);
        const anitinals = anitialsCreator(member)
        addNewMember(anitinals, member, newCard);
      }
    }

  }



}

//getting members Jason
function gettingJasonMembersObj(event) {
  const savedMembers = JSON.parse(event.target.responseText);
  for (const member of savedMembers.members) {
    createMemberList(member.name);
  }
}






function loadpage(e) {


  if(e.currentTarget.location.hash === '#Board'){

    creatingBlamckBoard();
    creatingBoard();
  }
  else{
    loadHtmlForMembers(); //creating member page
    // add member in member page
    creatingMembersPage(); // placing info of members in member page
  }
 
}





//        // creating page   //     //      //        / /


function creatingBlamckBoard() {

  createBordHolder();
  activeButton();
  creatingCarEditModalHtml();
  createEditListPopUp();

}


//getting a Jason for lists & cards
function creatingBoard() {

//to toggle menu by pressing anywhere in document


  document.addEventListener('click', dropDownMenuFocusClose);
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", gettingJasonObject);
  xhr.open("GET", "assets/board.json");
  xhr.send();

}

//getting jonson for members
function creatingMembersPage() {

  const xhrMembers = new XMLHttpRequest();
  xhrMembers.addEventListener("load", gettingJasonMembersObj);
  xhrMembers.open("GET", "assets/members.json");
  xhrMembers.send();
  

}


navBarControls();
const memberLableColors = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
let lColorIndex = 0;
window.addEventListener('hashchange', loadpage);


//fisr load
if(window.location.hash === '#Board'){
  creatingBlamckBoard();
  creatingBoard();
}
if(window.location.hash === '#Members'){
  loadHtmlForMembers(); //creating member page
  // add member in member page
  creatingMembersPage(); // placing info of members in member page
}
if(window.location.hash===''){
  console.info('hello');
  creatingBlamckBoard();
  creatingBoard();
}
// else{
  //so if i don't give it any # it checks what's active and loads it -
  //althos i can just run it.

// if(document.querySelector('#bord-link').classList.contains('active')){
//   creatingBlamckBoard();
//   creatingBoard();
// }
// if(document.querySelector('#members-link').classList.contains('active')){
//   loadHtmlForMembers(); //creating member page
//   // add member in member page
//   creatingMembersPage(); // placing info of members in member page
// }

// }








// window.addEventListener('hashchange', ()=>console.info(window.location.hash));


// window.addEventListener('hashchange', (event) => {
//   console.log(window.location.hash);
// });



// creatingBoard();

// const listsholder = document.querySelector('#mainCardHolders');





// loadHtmlForMembers(); //creating member page
// add member in member page
// creatingMembersPage(); // placing info of members in member page





