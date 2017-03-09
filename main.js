/**
 * Created by Doron Warzager on 26/02/2017.
 */

// data manegment

function uppdatMemberInAppData(e){

  const originalName =e.target.closest('.member-in-list').querySelector('.memebr-name').textContent;

  const newList = {
    name:e.target.closest('.member-in-list').querySelector('.new-member-name').value
  };

  appData.members.forEach((member)=>{
    if(member.name===originalName){
      member.name=newList.name;
    }
  })

}


function addMemberToAppData(e){
  const newList = {
    name: e.target.closest('.modal-content ').querySelector('.new-member-input').value
  };
  appData.members.push(newList);
}



function addListToAppData(e){
  const newList = {
    tasks: [],
    title: 'New List'
  };
  appData.lists.board.push(newList)

}



function deleteListToAppData(e){
  const title = e.target.closest('.oneLists').querySelector('.tagText').textContent
  const listInAppData = appData.lists.board.find((DataTitle) => title === DataTitle.title)
  let indexOfList = 0;

  appData.lists.board.forEach((list, index) => {

    if (list.title === listInAppData.title) {
      indexOfList = index;
      appData.lists.board.splice(indexOfList, 1)

    }
  });
}

function addCardAppData(e) {
    const title = e.target.closest('.oneLists').querySelector('.tagText').textContent
    const listInAppData = appData.lists.board.find((DataTitle) => title === DataTitle.title)

    const cardOfAppData = {
      members: [],
      text: 'Add new task'
    }
    listInAppData.tasks.push(cardOfAppData)



}


/**
 *              UI
 */



//loading HTML wrap of member page
function loadHtmlForMembers() {
  const templat = `
<div class="member-page">
  <h2>TaskBoard Members</h2>
  <div class="modal-content">
  
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


//creating the HTML for members page
function createMemberList(memberName) {
  const oneMember = document.createElement('li');
  const listOfMembers = document.querySelector('.list-group');
  // oneMember.textContent = ;
  oneMember.innerHTML += `
  <span class="memebr-name  ">${memberName}</span>
  <input class ="new-member-name displayState " type="text"  maxlength="25"></input>
  <div>
  <button type="button" class="btn btn-danger edit-member-btn seen delete">Delet</button>
  <button type="button" class="btn btn-primary edit-member-btn edit-btn seen" id="check">Edit</button>
  <button type="button" class="btn btn-default member-save-changes-btn cancel-btn" id="cancel">Cancel</button>
  <button type="button" class="btn btn-success member-save-changes-btn save-btn" id="save">Save</button>
</div>`
  oneMember.className = "list-group-item member-in-list";
  listOfMembers.appendChild(oneMember);

  oneMember.querySelector('.edit-btn').addEventListener('click', changMemberButtonsClasses)
  oneMember.querySelector('.cancel-btn').addEventListener('click', changMemberButtonsClasses)
  oneMember.querySelector('.edit-btn').addEventListener('click', editMemberName)
  oneMember.querySelector('.cancel-btn').addEventListener('click', editMemberName)
  oneMember.querySelector('.save-btn').addEventListener('click', editMemberName)
  oneMember.querySelector('.new-member-name').addEventListener('keypress', editMemberNameKeyBoard)

  oneMember.querySelector('.save-btn').addEventListener('click', changMemberButtonsClasses)
  // oneMember.querySelector('.delete').addEventListener('click', editMemberName)

}


//first board element - the Add list button
function activeButton() {
  const button = document.querySelector('.btn-catcher');

  button.addEventListener('click', (e) => {
    addListToAppData(e)

    createNewList('New List');

  })
}


//creating HTML wrap of board
function createBordHolder() {
  const templat = `
<div id="mainCardHolders">

 <button class="btn btn-default navbar-btn btn-catcher add-button">Add new task</button>

  </div>
`

  document.querySelector('.main-screen').innerHTML = templat;

}


//creating edit midal for cards
function creatingCarEditModalHtml() {
  const modalTemplate = `
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
  editCardModale.setAttribute("tabindex", "-1")
  editCardModale.setAttribute("role", "dialog")
  document.querySelector('.main-screen').appendChild(editCardModale)
}


//                      members page function          //

//memebrs - ADD memeber function
function addMember(e) {
  const newMember = document.querySelector('#add-member-input')
  addMemberToAppData(e);
  createMemberList(newMember.value)
  
  newMember.value = '';

}


// toggle function for edit\delete\save\cancel state in members page
function changMemberButtonsClasses(e) {
  const originalButtons = e.target.closest('.member-in-list').querySelectorAll('.edit-member-btn');
  const newButtons = e.target.closest('.member-in-list').querySelectorAll('.member-save-changes-btn');

  toggleMemberMenuButtons(originalButtons);
  toggleMemberMenuButtons(newButtons);
}


//the toggle code for changMemberButtonsClasses()
function toggleMemberMenuButtons(buttons) {
  for (button of buttons) {
    button.classList.toggle('seen')
  }
}


//controls in member's edit mode - edit\delete\save\cancel
function editMemberName(e) {
  const inputFiled = e.target.closest('.member-in-list').querySelector('.new-member-name');
  const memberName = e.target.closest('.member-in-list').querySelector('.memebr-name');
  memberName.classList.toggle('displayState')

  inputFiled.classList.toggle('displayState')


  if (e.currentTarget.id === 'check') {
    inputFiled.value = memberName.textContent
  }
  if (e.currentTarget.id === 'save') {
    uppdatMemberInAppData(e)
    memberName.textContent = inputFiled.value;

  }
  if (e.currentTarget.id === 'cancel') {
    //do nothing
  }
  // if(e.currentTarget.id === 'delete') {
  //   //do nothing
  //   // e.target.closest('.list-group').remove()
  //   console.info('hello');
  // }

}


//saving members with keypress enter
function editMemberNameKeyBoard(e) {
  const inputFiled = e.target.closest('.member-in-list').querySelector('.new-member-name');
  const memberName = e.target.closest('.member-in-list').querySelector('.memebr-name');

  if (e.keyCode === 13) {
    console.info('hello');
    //to toggle sapn\inpute
    memberName.classList.toggle('displayState')
    inputFiled.classList.toggle('displayState')


    if (e.target.value !== '') {
      memberName.textContent = inputFiled.value;
      changMemberButtonsClasses(e);
    }
  }
}


//                           board page functions            ///

// creating a list
function createNewList(title) {

  const nodereferece = document.querySelector('.btn-catcher')
  const numberOfTasks = 0;

  const listStringHtml = `


<span class="openerTag " >

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


// board page - toggle for  "edit card" modal
function createEditListPopUp() {

  document.querySelector('.close').addEventListener('click', toggleEditPanle);
  document.querySelector('.close-btn').addEventListener('click', toggleEditPanle);

}


//createing MOVETO bar info in edit card modal
function addMoveToOptions(title) {
  const moveToOption = document.querySelector('.lists-holder');
  const newOption = document.createElement('option')
  newOption.innerHTML = title;
  moveToOption.appendChild(newOption);

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

//making sure the inpute title will have a value
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


//                //          dealing with DELETE list menu        //        ///       //


//DELTE list function
function deleteList(event) {

  const listIAmIn = event.target.closest('.oneLists');
  // const listHolder =  event.target.closest('.mainCardHolders')
  const nameOfList = event.target.closest('.oneLists').querySelector('.tagText').textContent
  const deleteCheck = confirm(`Deleting ${nameOfList} list. Are you sure?`);


  if (!deleteCheck) {
    closingListMenu()

  }
  else {
    listIAmIn.remove();
    deleteListToAppData(event)
  }

}


//toggle to see\unsee DELELTE drop down menu
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


//closing DELELTE list menu by clicking anywhere
function dropDownMenuFocusClose(event) {

  if (!event.target.closest('.btn-group')) {
    closingListMenu()
  }

}


//the actual DELELTE lists function code
function closingListMenu() {
  // const listsholder = document.querySelector('#mainCardHolders');
  // console.info(1234, document.querySelector('#mainCardHolders'));

  const theMenu = document.querySelector('#mainCardHolders').querySelectorAll('.dropdown-menu')

  for (const oneMenu of theMenu) {
    oneMenu.style.display = 'none';
  }
}


//                //          dealing cards        //        ///       //

//basic card template creator
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

//function to create a card on board
function createCardByclick(e) {

  if (e.keyCode === 13 || e.type === 'click') {

    const newCard = cardCreation();
    const parentNode = e.target.closest('.oneLists').querySelector('.ulForCards')
    //inserting card into AppData
    addCardAppData(e);
    // console.info(appData);
    //
    // const title =e.target.closest('.oneLists').querySelector('.tagText').textContent
    // const listInAppData =appData.lists.board.find((DataTitle)=> title === DataTitle.title)
    // const cardOfAppData = {
    //   members:[],
    //   text: 'Add new task'
    // }
    // listInAppData.tasks.push(cardOfAppData)

    parentNode.appendChild(newCard);

    // const referenceNode = parentNode.querySelector('ul > li:last-child')
    // parentNode.insertBefore(newCard, referenceNode);
    updateBagde(e, parentNode);
  }

}

//edit button toggle controls
function toggleEditPanle() {
  const menuState = document.querySelector('.PopUpMenuHide').style;
  if (menuState.display === 'none' || !menuState.display) {
    menuState.display = 'block'
  }
  else {
    menuState.display = 'none'
  }

}

//add memebers to cards controls
function addNewMember(memberName, fullName, newCard) {
  const newLabel = document.createElement('span');


  newLabel.innerHTML = `<span class="label ${memberLableColors[lColorIndex]} member-label " title=" ${fullName} ">${memberName}</span>`
  newCard.querySelector('.label-holder').appendChild(newLabel);
  if (lColorIndex >= 5)
    lColorIndex = 0;

  lColorIndex++;

}

//creates anitials for cards    -- need to check it works with 3 word name
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



//                                       NAV BAR controls          //

//adding listener to nav-controls
function navBarControls() {
  const pageNav = document.querySelector('#page-nav')
  pageNav.addEventListener('click', moveToPage);
}

//showing which nav option is choosed
function moveToPage(e) {
  const chosen = e.target.parentNode;

  if (!chosen.classList.contains('active')) {
    navBarToggleAction(e.currentTarget.querySelector('.active'), chosen);
    // e.currentTarget.querySelector('.active').classList.remove('active');
    //     chosen.classList.add('active');
  }
}

//toggle for moveToPage function
function navBarToggleAction(nav1, nav2) {
  nav1.classList.toggle('active');
  nav2.classList.toggle('active');
}


//                                       JSON uploading         //


function checkIfCanLoadPage() {
  //checking only two since i have only 2 AJAX calls
  //can work also with checking length.
  if (jsonsState[0] && jsonsState[1]) {
    firstLoad();
  }
}

function gettingJasonObject(event) {
  const savedLists = JSON.parse(event.target.responseText);
  appData.lists = savedLists;
  // console.info(appData);
  jsonsState.push('true');
  checkIfCanLoadPage();


  // creatingMembersPage();

  // loadpage(e)
  // firstLoad();
//
//
//   //creating the lists
//   for (let list of savedLists.board) {
//     const loadList = createNewList(list.title)
//     // debugger
//
//     addMoveToOptions(list.title);
//
// //adding the cards
//     for (let obj of list.tasks) {
//       cardCreation(list, obj.text);
//
//       const newCard = cardCreation(obj.text);
//       const parentNode = loadList.querySelector('.ulForCards')
//       parentNode.appendChild(newCard);
//       //adding members
//       for (let member of obj.members) {
//         // console.info(member);
//         const anitinals = anitialsCreator(member)
//         addNewMember(anitinals, member, newCard);
//       }
//     }
//
//   }


  // document.addEventListener('click', dropDownMenuFocusClose);

}


//getting members Jason // and then loading page
function gettingJasonMembersObj(event) {
  const savedMembers = JSON.parse(event.target.responseText);
  appData.members = savedMembers.members
  jsonsState.push('true');
  //checking only two since i have only 2 AJAX calls
  checkIfCanLoadPage();
  // firstLoad();
  // console.info(appData.members);
  //
  // firstLoad();
  // for (const member of appData.members) {
  //   // console.info(member.name);
  //   createMemberList(member.name);
  //
  // }
}


function addingMemberListFromObj() {
  for (const member of appData.members) {
    createMemberList(member.name);
  }
}


//getting a Jason for lists & cards
function creatingBoard() {

//to toggle menu by pressing anywhere in document

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


//fisr load of webpage
//-------------- add here active action - to the right nav option - when creating board\member
//and fix anitials to be able to recieve as much words as needed.

//cuilding list from appData obj
function buildingListFromObj() {

  const savedLists = appData.lists;

  //creating the lists
  for (let list of savedLists.board) {
    const loadList = createNewList(list.title)
    // debugger

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


//                // creating page   //     //      //        / /

//creating the board page
function creatingBlamckBoard() {

  createBordHolder();
  activeButton();
  creatingCarEditModalHtml();
  createEditListPopUp();


}

//first time loading page
function firstLoad() {


  if (window.location.hash === '#Board') {
    //|| window.location.hash === '') left over of privious IF

    //for active button:
    document.querySelector('#bord-link').classList.add('active')
    creatingBlamckBoard();
    // creatingBoard();
    buildingListFromObj();
    document.querySelector('.main-screen').addEventListener('click', dropDownMenuFocusClose);

    // document.addEventListener('click', dropDownMenuFocusClose);
  }
  if (window.location.hash === '#Members') {
    document.querySelector('#members-link').classList.add('active')
    // navBarToggleAction(document.querySelector('#bord-link'),document.querySelector('#members-link'))
    loadHtmlForMembers(); //creating member page
    addingMemberListFromObj()

    // loadHtmlForMembers(); //creating member page
    // // add member in member page
    // creatingMembersPage(); // placing info of members in member page
  }
  if (!window.location.hash) {
    window.location.hash = '#Board'

    creatingBlamckBoard();
    // creatingBoard();
    buildingListFromObj();
    // return;


//   //   creatingBlamckBoard();
//   // creatingBoard();
  }
}


//hash listener to load page when app is open
function loadpage(e) {


  if (e.currentTarget.location.hash === '#Board' || e.currentTarget.location.hash === '#') {
    document.querySelector('#bord-link').classList.add('active')
    document.querySelector('#members-link').classList.remove('active')
    creatingBlamckBoard();
    buildingListFromObj();
    // creatingBoard();


  }
  else if (e.currentTarget.location.hash === '#Members') {
    document.removeEventListener('click', dropDownMenuFocusClose)

    loadHtmlForMembers(); //creating member page
    addingMemberListFromObj()


    // add member in member page
    // creatingMembersPage(); // placing info of members in member page
  }

}


const memberLableColors = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
let lColorIndex = 0;
let jsonsState = [];
window.addEventListener('hashchange', loadpage);
const appData = {
  lists: [],
  members: [],
}

navBarControls();
creatingBlamckBoard();
creatingBoard();
creatingMembersPage();



