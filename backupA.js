/**
 * Created by Doron Warzager on 26/02/2017.
 */

//                            data manegment            //


//updating member name in appdata
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

//adding member in appdata
function addMemberToAppData(e){
  // console.info(e.target.closest('.modal-content ').querySelector('.new-member-input').getAttribute('data-id'));
  // const color = addLabelColors();
  const newList = {
    name: e.target.closest('.modal-content ').querySelector('.new-member-input').value,
    id:uuid(),
    labelColor: addColor()
  };
  appData.members.push(newList);
}

//deleting member from appData
function deleteMemberFromAppData(e, memberName) {

  let indexinAppData =0;
  appData.members.forEach((member, index)=> {
    if(member.name === memberName){
      indexinAppData = index;
    }
  })
  appData.members.splice(indexinAppData,1);
}


//adding list in appdata
function addListToAppData(e, list){
  const newList = {
    id: list.getAttribute('data-id'),
    title: 'New List',
    tasks: []
  };
  appData.lists.board.push(newList)

}

//updating the name of the list in appdata
function changeListNameInAppData(event, newTitle) {
  // const newTitle = event.target.closest('.oneLists').querySelector('.inputTag').value;
  const oldTitle = event.target.closest('.oneLists').querySelector('.tagText').textContent;
  const listInAppData = appData.lists.board.find((DataTitle) => oldTitle === DataTitle.title);

  listInAppData.title = newTitle

}

//deleteing a list in appdata
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

// adding a card to board in appdata
function addCardAppData(e) {

// const listId =e.target.closest('.oneLists').getAttribute('data-id');

  // const listInAppData2 = appData.lists.board.find((list)=> listId === list.id);

  //
  // const cardOfAppData = {
  //   members: [],
  //   text: 'Add new task',
  //   id: newCard.getAttribute("data-id"),
  // }
  // listInAppData2.tasks.push(cardOfAppData);

  const title = e.target.closest('.oneLists').querySelector('.tagText').textContent
  const id =e.target.closest('.oneLists').getAttribute('data-id');

  const listInAppData =returnListReference(id)
  // appData.lists.board.find((bord) => id === bord.id)
  const cardId= e.target.closest('.oneLists').querySelector('.ulForCards li:last-child');

  const cardOfAppData = {
    members: [],
    text: 'Add new task',
    id: cardId.getAttribute('data-id'),
  }
  listInAppData.tasks.push(cardOfAppData)
  //pushnigNewCard(listInAppData, cardId);

}
//
// function pushnigNewCard(listInAppData,cardId) {
//   const cardOfAppData = {
//     members: [],
//     text: 'Add new task',
//     id: cardId.getAttribute('data-id'),
//   }
//   listInAppData.tasks.push(cardOfAppData)
// }

//   -- Deleteing the card through edit Modal
function deleteButtonModal(e) {
  const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
  const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id');
  const currentLocation =returnListReference(listId);

  const deleteCheck = confirm(`Are you sure you want to delete this task?`);
  if(deleteCheck){
    deleteCardFromAppData(currentLocation, cardId);
    closeEditModal();
  }
}





//searching appdata and returning a reference to the card i want
function returnCardReference(cardId, listId) {
  let cardReference = '';
  const lists = appData.lists.board;

  lists.forEach((list)=> {
    if (list.id === listId) {
      //finding the right card
      for (let task of list.tasks) {
        if (task.id === cardId) {
          cardReference= task
        }
      }
    }
  })

  return cardReference;
}

//searching appdata and returning a reference to the list i want
function returnListReference(listId) {
  let listReference = '';
  const lists = appData.lists.board;

  lists.forEach((list)=> {
    if (list.id === listId) {
      listReference= list;

    }
  });

  return listReference;
}

//adding edited info for card if SAVED
function editModalCardInput(e){
  const inputInModalContent =document.querySelector('#card-text').value;
  const lists = appData.lists.board;
  const cardId = e.target.getAttribute('temp-data-id')
  const listId = e.target.getAttribute('temp-list-data-id')
  const cardReference =  returnCardReference(cardId, listId);
  cardReference.text =inputInModalContent;


}

//adding and removing members from card
function editModalMemberChanges(e) {
  const membersOnModal = e.target.closest('.modal-content').querySelectorAll('.members-input input')
  const memberToCheck = Array.prototype.slice.call(membersOnModal);
  const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
  const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id')

  const lists = appData.lists.board;


  const cardReference =  returnCardReference(cardId, listId);

  //adding checked members into the card
  for (let inputMember of memberToCheck) {
    if(inputMember.checked === true && !cardReference.members.includes(inputMember.getAttribute('data-id'))){
      cardReference.members.push(inputMember.getAttribute('data-id'))
    }
    if(inputMember.checked === false && cardReference.members.includes(inputMember.getAttribute('data-id'))){
      const index = cardReference.members.indexOf(inputMember.getAttribute('data-id'));
      cardReference.members.splice(index,1);
    }

  }

}

//moving a card from list to list
function editModalCardMoveToOptions(e) {
  const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id')
  const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');



  // const directory = e.target.closest('#modal').querySelector('option[selected]')

  const directory = e.target.closest('#modal').querySelector('.lists-holder');
  const directoryId = directory.options[directory.selectedIndex].value;
  if( directoryId!== listId){
//original code that was here: if( directoryId== listId){}
    //else{


    const newLocation = returnListReference(directoryId)
    const currentLocation =returnListReference(listId)
    const cardReference= returnCardReference(cardId,listId);
    //moving to new location
    newLocation.tasks.push(cardReference);

    //earasing the card from the list
    deleteCardFromAppData(currentLocation, cardId);
    // [].forEach.call(currentLocation.tasks, (task, index)=>{
    //   if (task.id===cardId){
    //     Array.prototype.splice.call(currentLocation.tasks , index, 1)
    //   }
    // })
  }

}

//deleteing a card from the appdata
function deleteCardFromAppData(currentLocation,cardId) {


  [].forEach.call(currentLocation.tasks, (task, index)=>{
    if (task.id===cardId){
      Array.prototype.splice.call(currentLocation.tasks , index, 1)
    }
  })
}

//so there's the save botton and from there i can know wich card to save to.

function saveButtonModal(e) {

  //text area saving
  editModalCardInput(e);
  //member saving
  editModalMemberChanges(e);

  //move to functionality
  editModalCardMoveToOptions(e);

  //closing the modal and reloading the page
  closeEditModal();


  //need to add delete card listener in modal + confirm function
  //need to add move to function here
}

function closeEditModal() {
  const menuState = document.querySelector('.PopUpMenuHide').style;
  menuState.display = 'none'
  firstLoad();
}

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

  const members=appData.members;
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
  memberName.classList.toggle('displayState')
  inputFiled.classList.toggle('displayState')


  if (e.currentTarget.id === 'check') {
    inputFiled.value = memberName.textContent
    inputFiled.focus()


  }
  if (e.currentTarget.id === 'save') {


    if (inputFiled.value) {

      uppdatMemberInAppData(e, memberName);
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
      deleteMemberFromAppData(e, memberName);
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

  let memberName = '';
  let memberColor;

  for (let member of appData.members) {

    if(member.id === dataId){
      memberName= member.name;
      memberColor =member.labelColor;
    }
  }

  newLabel.innerHTML = `<span class="label ${memberColor} member-label " title="${memberName}" data-id="${dataId}">${memberInitial}</span>`
  newCard.querySelector('.label-holder').appendChild(newLabel);
  //memberLableColors[lColorIndex]
  // if (lColorIndex >= 5)
  //   lColorIndex = 0;
  //
  // lColorIndex++;

}

//creates anitials for cards    -- need to check it works with 3 word name
function anitialsCreator(fullname) {

  let fullNameString ='';
  for (let member of appData.members) {
    if(fullname === member.id){
      fullNameString = member.name
    }
  }

  const nameToArray = fullNameString.split(' ').map((n) => n[0]);
  return nameToArray.join('');

}


//updating badge number by click
function updateBagde(badge, parentNode) {



  const badgenumberOfCards = badge.target.parentNode.querySelector('.badge');


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

function dragOverDropZone(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";


}

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

    e.currentTarget.appendChild(cardUi);

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
  appData.lists = savedLists;

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
  appData.members = savedMembers.members
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
  const members = appData.members
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
  for (const member of appData.members) {
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

  const savedLists = appData.lists;

  //creating the lists
  for (let list of savedLists.board) {

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
const appData = {
  lists: [],
  members: []
}

// navBarControls();
creatingBlamckBoard();
creatingBoard();
creatingMembersPage();
// navBarControls()




