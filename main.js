/**
 * Created by Doron Warzager on 26/02/2017.
 */

/**
 *                             UI             //
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
  <input type="text" class ="new-member-name displayState"   maxlength="25"></input>
  <div>
  <button type="button" class="btn btn-danger edit-member-btn seen delete" id="delete-btn">Delet</button>
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
  oneMember.querySelector('.delete').addEventListener('click', editMemberName)
  oneMember.querySelector('.new-member-name').addEventListener('keypress', editMemberNameKeyBoard)

  oneMember.querySelector('.save-btn').addEventListener('click', changMemberButtonsClasses)
  // oneMember.querySelector('.delete').addEventListener('click', editMemberName)

  return oneMember;
}


//first board element - the Add list button
function activeButton() {
  const button = document.querySelector('.btn-catcher');

  button.addEventListener('click', (e) => {


    const newList = createNewList('New List');
    addListToAppData(e, newList)
    e.currentTarget.blur();
    //scrolling to new list
    const elementToScroll =document.querySelector('#mainCardHolders');
    elementToScroll.scrollLeft =elementToScroll.scrollWidth






  })
}


//creating HTML wrap of board
function createBordHolder() {
  const templat = `
<div id="mainCardHolders">
  <button class="btn  navbar-btn btn-catcher add-button">Add new List</button>
  </div>
  
`

  document.querySelector('.main-screen').innerHTML = templat;

}






//creating edit modal for cards
function creatingCarEditModalHtml() {
  const modalTemplate = `
<div class="modal-dialog" id="modal"role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Edit Card</h4>
        </div>
        <div class="modal-body editMenuInputes">


          <form class="form-horizontal">
            <div class="form-group">
              <label for="card-text"class="col-sm-2 control-label editable-inpte">Card Text</label>
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

                <!--<label for="member-name1"><input type="checkbox" name="memeber1" value="memeber1" id="member-name1">-->
                <!--Member Name</label>-->
                <!--<label for="member-name2"><input type="checkbox" name="memeber2" value="memeber2" id="member-name2">-->
                <!--Member Name</label>-->

              </div>
            </div>
            <button type="button" class="btn btn-danger btn-delete-size modal-delete-btn">Delete Card</button>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default close-btn" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-save">Save changes</button>
        </div>
      </div>
    </div>
`
  // const cardContent =
  const editCardModale = document.createElement('div')
  editCardModale.innerHTML = modalTemplate;
  editCardModale.setAttribute("class", "modal PopUpMenuHide")
  editCardModale.setAttribute("tabindex", "-1")
  editCardModale.setAttribute("role", "dialog")
  document.querySelector('.main-screen').appendChild(editCardModale)
  addingMembers();

  editCardModale.querySelector('.modal-save').addEventListener('click', saveButtonModal)
  editCardModale.querySelector('.modal-delete-btn').addEventListener('click', deleteButtonModal)


  // editCardModale.querySelector('.editable-inpte').textContent =

}

//adding members to the edit modal
function addingMembers(){

  const members=returnAllMemebers()
  let index= 0;

  for (let member of members) {


    const addMember = document.createElement('label');
    addMember.setAttribute("for", `member-name${index}`)
    // const name= member.name
    addMember.innerHTML = `<input type="checkbox" name= "${member.name}" value="${member.name}" id=member-name${index++} data-id="${member.id}">${member.name}`



    document.querySelector('.member-list').appendChild(addMember);

  }




}


//                      members page function          //

//memebrs - ADD memeber function
function addMember(e) {
  const newMember = document.querySelector('#add-member-input')

  if(newMember.value=== ''){
    newMember.value= 'New member'
  }

  addMemberToAppData(e);
  createMemberList(newMember.value)
//emptying inpute feild
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
  const memberId =e.target.closest('.member-in-list').getAttribute('data-id')

  memberName.classList.toggle('displayState')
  inputFiled.classList.toggle('displayState')


  if (e.currentTarget.id === 'check') {
    inputFiled.value = memberName.textContent
    inputFiled.focus()


  }
  if (e.currentTarget.id === 'save') {


    if (inputFiled.value) {

    uppdatMemberInAppData(e, memberId);

      memberName.textContent = inputFiled.value;
    }




    // memberName.textContent = inputFiled.value;

  }
  if (e.currentTarget.id === 'cancel') {
    //do nothing
  }
  if(e.currentTarget.id === 'delete-btn') {
    const deleteCheck = confirm(`Are you sure?`);
    if(deleteCheck){

      deleteMemberFromAppData(e, memberId);

      e.target.closest('.member-in-list').remove();

    }
    else{
      memberName.classList.toggle('displayState')
      inputFiled.classList.toggle('displayState')
    }

    // deleteMemberFromAppData(e, memberName);
    //
    // e.target.closest('.member-in-list').remove();
  }


}


//saving members with keypress enter
function editMemberNameKeyBoard(e) {
  const inputFiled = e.target.closest('.member-in-list').querySelector('.new-member-name');
  const memberName = e.target.closest('.member-in-list').querySelector('.memebr-name');



  if (e.keyCode === 13) {
    if (e.target.value) {

      //to toggle sapn\inpute
      uppdatMemberInAppData(e, memberName);
      memberName.textContent = inputFiled.value;
    }
    memberName.classList.toggle('displayState')
    inputFiled.classList.toggle('displayState')
    changMemberButtonsClasses(e);

    // uppdatMemberInAppData(e)

  }

}



//                           edit card modal            ///

//  close for  "edit card" modal
function createEditListPopUp() {

  document.querySelector('.close').addEventListener('click', toggleEditPanle);
  document.querySelector('.close-btn').addEventListener('click', toggleEditPanle);

}



//adding edited info for card if SAVED
function editModalCardInput(e){
  const inputInModalContent =document.querySelector('#card-text').value;
  // const lists = appData.lists.board;
  const cardId = e.target.getAttribute('temp-data-id')
  const listId = e.target.getAttribute('temp-list-data-id')
  const cardReference =  returnCardReference(cardId, listId);
  cardReference.text =inputInModalContent;


}

//createing MOVETO bar info in edit card modal
function addMoveToOptions(listElm, listId) {
  //, listId
  const moveToOption = document.querySelector('.lists-holder');
  const newOption = document.createElement('option')
  newOption.innerHTML = listElm.title;
  newOption.setAttribute('value', listId)
  moveToOption.appendChild(newOption);
  // if(listElm.id === listId){
  //   newOption.selected =true;
  // }

}

//getting info from card content into nodal
function gettingCardInfoForModal(e) {
  // const cardContent = e.target.closest('.card').querySelector('.cardInnerText').textContent;
  const cardId = e.target.closest('.card').getAttribute('data-id');
  const listId = e.target.closest('.oneLists').getAttribute('data-id');
  const cardContent =returnCardReference(cardId, listId)

  const inputInModalContent =document.querySelector('#card-text');
  inputInModalContent.textContent = cardContent.text;

}

//not showing mroe then 200 char on card UI
function setUITextInCard(cardContent){
  // let newCardContent;
  if(cardContent.length >200){
    let newCardContent = cardContent.slice(0, 197);
    newCardContent+= '...'

    return newCardContent
  }
  else{
    return cardContent
  }
}
//mark checked on input of edit modal
function showMembersInModal(e) {

  const membersOnCard=e.target.closest('.card').querySelectorAll('.member-label')
  membersOnModal = document.querySelectorAll('.member-list input')

  //unmarking all members
  membersOnModal.forEach((memberInput)=> {
        memberInput.checked = false ;
  })
  //markinh the right members
  membersOnModal.forEach((memberInput)=> {
    for (let oneMember of membersOnCard) {

         if(memberInput.value === oneMember.title){
        memberInput.checked = true ;
          }

    }
  })

  // document.querySelector('.member-list').innerHTML = '';


  // members.forEach((member, index)=>{
  //   if(member.title===)
  //   const addMember = members.querySelector()
  //   addMember.innerHTML = `<input type="checkbox" name= ${member.title} value=${member.title} id=member-name${index+1}>${member.title}`
  //
  //   addMember.setAttribute("for", `member-name${index+1}`)
  //
  //   document.querySelector('.member-list').appendChild(addMember);

    // const addMember = document.createElement('label');
    // addMember.innerHTML = `<input type="checkbox" name= ${member.title} value=${member.title} id=member-name${index+1}>${member.title}`
    //
    // addMember.setAttribute("for", `member-name${index+1}`)
    //
    // document.querySelector('.member-list').appendChild(addMember);


  // })

}


function closeEditModal() {
  const menuState = document.querySelector('.PopUpMenuHide').style;
  menuState.display = 'none'
  firstLoad();
}

//                           board page functions            ///

// creating a list
function createNewList(title, id) {

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
  const dataId = id || uuid();

  basicTemplete.setAttribute("class", "oneLists");
  basicTemplete.setAttribute("data-id", dataId);
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

  basicTemplete.querySelector('.ulForCards').addEventListener('dragover', dragOverDropZone);


  basicTemplete.querySelector('.ulForCards').addEventListener('drop', dropHandlerDropZone);

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

  changeListNameInAppData(event, newTitle);
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
  // newCard.setAttribute("data-id", uuid());
  const cardsText = document.createElement('p');
  cardsText.setAttribute("class", "cardInnerText");
  newCard.setAttribute("draggable", "true");
  newCard.setAttribute("id", `card${CardIdCounter++}`);

  newCard.appendChild(cardsText);
  newCard.addEventListener('dragstart', dragHandler)
  // setUITextInCard(cardContent);
  // cardsText.textContent = cardContent;
  cardsText.textContent = setUITextInCard(cardContent);;
  newCard.innerHTML += `<button class="btn btn-default edit-Card-Button" type="submit">Edit</button>
<div class="label-holder">
</div>`;


  //i hve to count the length of carContent
  //if it's longer then something - i have to slice it where i want to
  //then slice 3 more char and change them to ...
  //and then place it back into card


  newCard.querySelector('.edit-Card-Button').addEventListener('click', (e)=>{

    const cardId= newCard.getAttribute("data-id");
    const listId = newCard.closest('.oneLists').getAttribute("data-id")

    toggleEditPanle(e,cardId, listId );
  });
  // addNewMember('DW', 'doron warzagr', newCard);



  return newCard
}

//function to create a card on board
function createCardByclick(e) {

  if (e.keyCode === 13 || e.type === 'click') {

    const newCard = cardCreation();
    newCard.setAttribute("data-id", uuid())
    const parentNode = e.target.closest('.oneLists').querySelector('.ulForCards')

    parentNode.appendChild(newCard);
    //scroll down in lists
    parentNode.scrollTop = parentNode.scrollHeight;
    // parentNode.scrollTop += 4000; // need a function to know how much to scroll
    // console.info(parentNode.scrollHeight)

    //inserting card into AppData
    addCardAppData(e);


    //
    // const title =e.target.closest('.oneLists').querySelector('.tagText').textContent
    // const listInAppData =appData.lists.board.find((DataTitle)=> title === DataTitle.title)
    // const cardOfAppData = {
    //   members:[],
    //   text: 'Add new task'
    // }
    // listInAppData.tasks.push(cardOfAppData)



    // const referenceNode = parentNode.querySelector('ul > li:last-child')
    // parentNode.insertBefore(newCard, referenceNode);
    updateBagde(e, parentNode);
  }

}

//edit button toggle controls
//&& loading intfo into edit  MOdal
function toggleEditPanle(e, id, listId) {
  const menuState = document.querySelector('.PopUpMenuHide').style;
  if (menuState.display === 'none' || !menuState.display) {
    menuState.display = 'block'

    //geting card info
    gettingCardInfoForModal(e);
    savingCardDataIdToModalSaveBtn(e, id, listId);
    //creating save-btn listener
    // saveButtonModal(e);
    //getting members
    showMembersInModal(e);


// creating the moveto Menu
    const nameOfLists = document.querySelectorAll('select option')
    nameOfLists.forEach((list)=>{
        if(list.value === listId){
        list.selected =true;

      }

  })




  }
  else {
    menuState.display = 'none'
    firstLoad();
  }

}

function savingCardDataIdToModalSaveBtn(e, id, listId) {
  const tempIdCardHolder = document.querySelector('.PopUpMenuHide').querySelector('.modal-save');
  tempIdCardHolder.setAttribute("temp-data-id", id)
  tempIdCardHolder.setAttribute("temp-list-data-id", listId)

  // const cardId = e.target.closest('.')
  // tempIdCardHolder.setAttribute('data-id',)

}
//add memebers to cards controls
function addNewMember(memberInitial, dataId, newCard) {
  const newLabel = document.createElement('span');

  const memberName = returnMemberById(dataId).name;
  const memberColor = returnMemberById(dataId).labelColor;
  //
  // const members =returnAllMemebers()
  // for (let member of members) {
  //
  //   if(member.id === dataId){
  //     memberName= member.name;
  //     memberColor =member.labelColor;
  //   }
  // }

  newLabel.innerHTML = `<span class="label ${memberColor} member-label " title="${memberName}" data-id="${dataId}">${memberInitial}</span>`
  newCard.querySelector('.label-holder').appendChild(newLabel);
  //memberLableColors[lColorIndex]
  // if (lColorIndex >= 5)
  //   lColorIndex = 0;
  //
  // lColorIndex++;

}

//creates anitials for cards    -- need to check it works with 3 word name
function anitialsCreator(id) {
  const fullNameString = returnMemberById(id).name;
  const nameToArray = fullNameString.split(' ').map((n) => n[0]);
  return nameToArray.join('');
  // let fullNameString ='';

  // const members = returnAllMemebers();

  // for (let member of members) {
  //   if(fullname === member.id){
  //     fullNameString = member.name
  //   }
  // }



}


//updating badge number by click
function updateBagde(badge, parentNode) {



  const badgenumberOfCards = badge.target.closest('.oneLists').querySelector('.badge');


  addtoBudge(badgenumberOfCards,parentNode);
}

//updating badge number at creation
function addtoBudge(badgenumberOfCards,parentNode){

  const numbeOfCards = parentNode.querySelectorAll('.card').length;
  badgenumberOfCards.textContent = numbeOfCards;

  //keeping the number in the center of the badge
  if (numbeOfCards >= 10) {
    badgenumberOfCards.style.paddingLeft = '3px';
  }
}


//                                       NAV BAR controls          //
//
// //adding listener to nav-controls
// function navBarControls() {
//   const pageNav = document.querySelector('#page-nav')
//   pageNav.addEventListener('click', moveToPage);
// }
//
// //showing which nav option is choosed
// function moveToPage(e) {
//   const chosen = e.target.parentNode;
//
//   if (!chosen.classList.contains('active')) {
//     navBarToggleAction(e.currentTarget.querySelector('.active'), chosen);
//     // e.currentTarget.querySelector('.active').classList.remove('active');
//     //     chosen.classList.add('active');
//   }
// }
//
// //toggle for moveToPage function
// function navBarToggleAction(nav1, nav2) {
//   nav1.classList.toggle('active');
//   nav2.classList.toggle('active');
// }

//                                      drageevent controlls              //

//passing card Id to drop zone
function dragHandler(e) {
  const cardId = e.currentTarget.getAttribute('id');
  // console.info(e);
  e.dataTransfer.setData('text', cardId);

}

//logo change
function dragOverDropZone(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";


}

//dropying card in new list
function dropHandlerDropZone(e) {
  e.preventDefault();

  //dealling with UI
  const cardId = e.dataTransfer.getData('text')
  const cardUi = document.querySelector(`#${cardId}`)
  const cardDataId = cardUi.getAttribute('data-id')

  const originalList = cardUi.closest('.oneLists').getAttribute('data-id');
  const curentList = e.currentTarget.closest('.oneLists').getAttribute('data-id');
  const listInAppData = returnListReference(originalList);
  const movedToList =returnListReference(curentList);

  const cardReference= returnCardReference(cardDataId,originalList);

  //making sure i'm moving to a new list
  if(originalList!==curentList) {

    const curentListUI = e.currentTarget.closest('.oneLists');

    const originalListBadge = cardUi.closest('.oneLists').querySelector('.badge')
    e.currentTarget.appendChild(cardUi);

    //updating bage
    updateBagde(e, curentListUI);
    originalListBadge.textContent = parseInt(originalListBadge.textContent)-1;

    movedToList.tasks.push(cardReference);
    deleteCardFromAppData(listInAppData, cardDataId);

  }



  //
  // console.info(cardUi);

  // console.info(e.currentTarget);
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
  addListsFromJason(savedLists);
  // appData.lists = savedLists;

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
//
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
  addMembersFromJason(savedMembers.members)
  // appData.members = savedMembers.members
  jsonsState.push('true');
  addLabelColors();
  //checking only two since i have only 2 AJAX calls
  checkIfCanLoadPage();
  // firstLoad();

  //
  // firstLoad();
  // for (const member of appData.members) {

  //   createMemberList(member.name);
  //
  // }
}

function addLabelColors() {
  const members =returnAllMemebers();
  for (let member of members) {
    member.labelColor=addColor()

  }

}

function addColor() {
  const color= memberLableColors[lColorIndex];
  if (lColorIndex >= 5)
    lColorIndex = 0;

  lColorIndex++;
  return color
}
function addingMemberListFromObj() {
  const members = returnAllMemebers()
  for (const member of members) {
    const addedMember = createMemberList(member.name);

    addedMember.setAttribute("data-id", member.id)


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

//building list from appData obj
// & adding list names to edit Modal
function buildingListFromObj() {

  const savedLists =returnsAllListsReference();

  //creating the lists
  for (let list of savedLists) {

    const loadList = createNewList(list.title, list.id)


    addMoveToOptions(list, list.id);

//adding the cards
    for (let obj of list.tasks) {
      // cardCreation(list, obj.text);

      const newCard = cardCreation(obj.text);
      newCard.setAttribute("data-id", obj.id) // adding the uniqe ID of every card
      const parentNode = loadList.querySelector('.ulForCards');


      parentNode.appendChild(newCard);

      //adding badge counter
      const badge= loadList.querySelector('.badge')
      addtoBudge(badge, parentNode);

      //adding members

      for (let member of obj.members) {

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
    document.querySelector('.main-screen').removeEventListener('click', dropDownMenuFocusClose);

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
    document.querySelector('.main-screen').addEventListener('click', dropDownMenuFocusClose);
    creatingBlamckBoard();
    buildingListFromObj();
    // creatingBoard();


  }
  else if (e.currentTarget.location.hash === '#Members') {
    // document.removeEventListener('click', dropDownMenuFocusClose);
    document.querySelector('#members-link').classList.add('active')
    document.querySelector('#bord-link').classList.remove('active')
    document.querySelector('.main-screen').removeEventListener('click', dropDownMenuFocusClose);
    loadHtmlForMembers(); //creating member page
    addingMemberListFromObj()


    // add member in member page
    // creatingMembersPage(); // placing info of members in member page
  }

}


const memberLableColors = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
let lColorIndex = 0;
let CardIdCounter =0;
let jsonsState = [];
window.addEventListener('hashchange', loadpage);


// navBarControls();
creatingBlamckBoard();
creatingBoard();
creatingMembersPage();
// navBarControls()




