/**
 * Created by Doron Warzager on 26/02/2017.
 */

/**
 *                             UI             //
 */


(function () {
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
      const elementToScroll = document.querySelector('#mainCardHolders');
      elementToScroll.scrollLeft = elementToScroll.scrollWidth
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

    const editCardModale = document.createElement('div')
    editCardModale.innerHTML = modalTemplate;
    editCardModale.setAttribute("class", "modal PopUpMenuHide")
    editCardModale.setAttribute("tabindex", "-1")
    editCardModale.setAttribute("role", "dialog")
    document.querySelector('.main-screen').appendChild(editCardModale)
    addingMembers();

    editCardModale.querySelector('.modal-save').addEventListener('click', saveButtonModal)
    editCardModale.querySelector('.modal-delete-btn').addEventListener('click', deleteButtonModal)


  }

//adding members to the edit modal
  function addingMembers() {

    const members = MODEL.returnAllMemebers()
    let index = 0;

    for (let member of members) {

      const addMember = document.createElement('label');
      addMember.setAttribute("for", `member-name${index}`)
      addMember.innerHTML = `<input type="checkbox" name= "${member.name}" value="${member.name}" id=member-name${index++} data-id="${member.id}">${member.name}`

      document.querySelector('.member-list').appendChild(addMember);
    }
  }




//adding list and calling function in appdata
  function addListToAppData(e, list){
    const newList = {
      id: list.getAttribute('data-id'),
      title: 'New List',
      tasks: []
    };

    const allListsAppData = MODEL.returnsAllListsReference();

    allListsAppData.push(newList)

    addMoveToOptions(newList, newList.id);
    MODEL.saveAppDataToLocalStorage()

  }

//                      members page function          //

//memebrs - ADD memeber function
  function addMember(e) {
    const newMember = document.querySelector('#add-member-input')

    if (newMember.value === '') {
      newMember.value = 'New member'
    }
    const newList = {
      name: e.target.closest('.modal-content ').querySelector('.new-member-input').value,
      id:uuid(),
      labelColor:  addColor(),
    };



    MODEL.addMemberToAppData(newList);
    const memberUi =createMemberList(newMember.value)
    memberUi.setAttribute('data-id',newList.id);
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
    const memberId = e.target.closest('.member-in-list').getAttribute('data-id')

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
    }
    if (e.currentTarget.id === 'cancel') {
      //do nothing
    }
    if (e.currentTarget.id === 'delete-btn') {
      const deleteCheck = confirm(`Are you sure?`);
      if (deleteCheck) {
        MODEL.deleteMemberFromAppData(memberId);
        e.target.closest('.member-in-list').remove();
      }
      else {
        memberName.classList.toggle('displayState')
        inputFiled.classList.toggle('displayState')
      }
    }
  }


//saving members with keypress enter
  function editMemberNameKeyBoard(e) {
    const inputFiled = e.target.closest('.member-in-list').querySelector('.new-member-name');
    const memberName = e.target.closest('.member-in-list').querySelector('.memebr-name');
    const memberId = e.target.closest('.member-in-list').getAttribute('data-id');
console.info(memberId);
    if (e.keyCode === 13) {
      if (e.target.value) {
        uppdatMemberInAppData(e, memberId);
        memberName.textContent = inputFiled.value;
        //to toggle sapn\inpute
        // uppdatMemberInAppData(e, memberName);
        // memberName.textContent = inputFiled.value;
      }
      memberName.classList.toggle('displayState')
      inputFiled.classList.toggle('displayState')
      changMemberButtonsClasses(e);
    }
  }

  function uppdatMemberInAppData(e, memberId){
    //
    // const originalName =e.target.closest('.member-in-list').querySelector('.memebr-name').textContent;

    const newList = {
      name:e.target.closest('.member-in-list').querySelector('.new-member-name').value
    };
    const members = MODEL.returnAllMemebers();
    members.forEach((member)=>{
      if(member.id===memberId){
        member.name=newList.name;
        // console.info(member.name);
      }
    })
    MODEL.saveAppDataToLocalStorage()
  }

//                           edit card modal            ///


//  close for  "edit card" modal
  function createEditListPopUp() {

    document.querySelector('.close').addEventListener('click', toggleEditPanle);
    document.querySelector('.close-btn').addEventListener('click', toggleEditPanle);

  }


//adding edited info for card if SAVED
  function editModalCardInput(e) {
    const inputInModalContent = document.querySelector('#card-text').value;
    const cardId = e.target.getAttribute('temp-data-id')
    const listId = e.target.getAttribute('temp-list-data-id')
    const cardReference = MODEL.returnCardReference(cardId, listId);
    cardReference.text = inputInModalContent;

  }

//createing MOVETO bar info in edit card modal
  function addMoveToOptions(listElm, listId) {

    const moveToOption = document.querySelector('.lists-holder');
    const newOption = document.createElement('option')
    newOption.innerHTML = listElm.title;
    newOption.setAttribute('value', listId)
    moveToOption.appendChild(newOption);

  }

//getting info from card content into nodal
  function gettingCardInfoForModal(e) {
    const cardId = e.target.closest('.card').getAttribute('data-id');
    const listId = e.target.closest('.oneLists').getAttribute('data-id');
    const cardContent = MODEL.returnCardReference(cardId, listId)

    const inputInModalContent = document.querySelector('#card-text');
    inputInModalContent.textContent = cardContent.text;

  }

//not showing mroe then 200 char on card UI
  function setUITextInCard(cardContent) {
    // let newCardContent;
    if (cardContent.length > 200) {
      let newCardContent = cardContent.slice(0, 197);
      newCardContent += '...'
      return newCardContent
    }
    else {
      return cardContent
    }
  }

//mark checked on input of edit modal
  function showMembersInModal(e) {

    const membersOnCard = e.target.closest('.card').querySelectorAll('.member-label')
    membersOnModal = document.querySelectorAll('.member-list input')

    //unmarking all members
    membersOnModal.forEach((memberInput) => {
      memberInput.checked = false;
    })
    //markinh the right members
    membersOnModal.forEach((memberInput) => {
      for (let oneMember of membersOnCard) {
        if (memberInput.value === oneMember.title) {
          memberInput.checked = true;
        }
      }
    })
  }



  function deleteButtonModal(e) {

    const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
    const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id');
    const currentLocation =MODEL.returnListReference(listId);
    const deleteCheck = confirm(`Are you sure you want to delete this task?`);

    if(deleteCheck){
     MODEL.deleteCardFromAppData(currentLocation, cardId);
      closeEditModal();
      MODEL.saveAppDataToLocalStorage()
    }
  }




//adding and removing members from card
  function editModalMemberChanges(e) {
    const membersOnModal = e.target.closest('.modal-content').querySelectorAll('.members-input input')
    const memberToCheck = Array.prototype.slice.call(membersOnModal);
    const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
    const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id')

    const cardReference =  MODEL.returnCardReference(cardId, listId);

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


  function closeEditModal() {
    const menuState = document.querySelector('.PopUpMenuHide').style;
    menuState.display = 'none'
    firstLoad();
  }


//moving a card from list to list
  function editModalCardMoveToOptions(e) {

    const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id')
    const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');


    const directory = e.target.closest('#modal').querySelector('.lists-holder');
    const directoryId = directory.options[directory.selectedIndex].value;
    if( directoryId!== listId){
//original code that was here: if( directoryId== listId){}
      //else{


      const newLocation = MODEL.returnListReference(directoryId)
      const currentLocation =MODEL.returnListReference(listId)
      const cardReference= MODEL.returnCardReference(cardId,listId);
      //moving to new location
      newLocation.tasks.push(cardReference);

      //earasing the card from the list
      MODEL.deleteCardFromAppData(currentLocation, cardId);

    }

  }


  function saveButtonModal(e) {

    //text area saving
    editModalCardInput(e);
    //member saving
    editModalMemberChanges(e);

    //move to functionality
    editModalCardMoveToOptions(e);

    //closing the modal and reloading the page
    closeEditModal();
    MODEL.saveAppDataToLocalStorage()

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

    //dealing with drag & droop
    basicTemplete.querySelector('.ulForCards').addEventListener('dragover', dragOverDropZone);
    basicTemplete.querySelector('.ulForCards').addEventListener('drop', dropHandlerDropZone);

    //dealling with UI for drag and drop
    basicTemplete.querySelector('.ulForCards').addEventListener('dragover', dragEnterToDropZone);
    basicTemplete.querySelector('.ulForCards').addEventListener('dragleave', dragOutOfDropZone);


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

    changeListName(event, newTitle);
    finalTitle.textContent = newTitle;

    event.target.style.display = 'none';
    finalTitle.style.display = 'inline-block'
  }

  function changeListName(event, newTitle) {

    const oldTitle = event.target.closest('.oneLists').querySelector('.tagText').textContent;
    const allListsAppData = MODEL.returnsAllListsReference();
    const listInAppData = allListsAppData.find((DataTitle) => oldTitle === DataTitle.title);

    MODEL.changeListNameInAppData(listInAppData, newTitle)

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
      const listId = event.target.closest('.oneLists').getAttribute('data-id');
      MODEL.deleteListToAppData(listId)
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
    newCard.setAttribute("draggable", "true");
    newCard.setAttribute("id", `card${CardIdCounter++}`);


    newCard.appendChild(cardsText);
    newCard.addEventListener('dragstart', dragHandler)
    newCard.addEventListener('dragend', dragOutOfDropZone)
    // newCard.addEventListener('drop', dropHandlerDropZone);

    cardsText.textContent = setUITextInCard(cardContent);
    ;
    newCard.innerHTML += `<button class="btn btn-default edit-Card-Button" type="submit">Edit</button>
<div class="label-holder">
</div>`;

    newCard.querySelector('.edit-Card-Button').addEventListener('click', (e) => {
      const cardId = newCard.getAttribute("data-id");
      const listId = newCard.closest('.oneLists').getAttribute("data-id")

      toggleEditPanle(e, cardId, listId);
    });


    // newCard.addEventListener('dragend', dragOutOfDropZone);
    // newCard.addEventListener('dragleave', dragOutOfDropZone);


    return newCard
  }

// function dropUi(e) {
//   e.target.closest('.card').style.borderTop = '1px solid #7cdaf9';
// }

//function to create a card on board
  function createCardByclick(e) {

    if (e.keyCode === 13 || e.type === 'click') {

      const newCard = cardCreation();
      newCard.setAttribute("data-id", uuid())
      const parentNode = e.target.closest('.oneLists').querySelector('.ulForCards')

      parentNode.appendChild(newCard);
      //scroll down in lists
      parentNode.scrollTop = parentNode.scrollHeight;

      //inserting card into AppData
      // MODEL.addCardAppData(e);
      addCardAcation(e)

      updateBagde(e, parentNode);
    }

  }

  function addCardAcation(e) {
    const id =e.target.closest('.oneLists').getAttribute('data-id');
    const listInAppData =MODEL.returnListReference(id)
    const cardId= e.target.closest('.oneLists').querySelector('.ulForCards li:last-child');


    MODEL.addCardAppData(listInAppData,cardId.getAttribute('data-id'));
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
      //getting members
      showMembersInModal(e);


// creating the moveto Menu
      const nameOfLists = document.querySelectorAll('select option')
      nameOfLists.forEach((list) => {
        if (list.value === listId) {
          list.selected = true;
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
  }

//add memebers to cards controls
  function addNewMember(memberInitial, dataId, newCard) {
    const newLabel = document.createElement('span');

    const memberName = MODEL.returnMemberById(dataId).name;
    const memberColor = MODEL.returnMemberById(dataId).labelColor;

    newLabel.innerHTML = `<span class="label ${memberColor} member-label " title="${memberName}" data-id="${dataId}">${memberInitial}</span>`
    newCard.querySelector('.label-holder').appendChild(newLabel);

  }

//creates anitials for cards    -- need to check it works with 3 word name
  function anitialsCreator(id) {
    const fullNameString = MODEL.returnMemberById(id).name;
    const nameToArray = fullNameString.split(' ').map((n) => n[0]);
    return nameToArray.join('');
  }


//updating badge number by click
  function updateBagde(badge, parentNode) {

    const badgenumberOfCards = badge.target.closest('.oneLists').querySelector('.badge');

    addtoBudge(badgenumberOfCards, parentNode);
  }

//updating badge number at creation
  function addtoBudge(badgenumberOfCards, parentNode) {

    const numbeOfCards = parentNode.querySelectorAll('.card').length;
    badgenumberOfCards.textContent = numbeOfCards;

    //keeping the number in the center of the badge
    if (numbeOfCards >= 10) {
      badgenumberOfCards.style.paddingLeft = '3px';
    }
  }


//                                      drage event controlls              //

//passing card Id to drop zone
  function dragHandler(e) {
    const cardId = e.currentTarget.getAttribute('id');
    // console.info(e);
    e.dataTransfer.setData('text', cardId);
  }

//move logo change
  function dragOverDropZone(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // e.target.closest('.card').style.marginTop = '150px'

  }

//
//dropying card in new list
  function dropHandlerDropZone(e) {
    e.preventDefault();

    //dealling with UI
    const cardId = e.dataTransfer.getData('text')
    const cardUi = document.querySelector(`#${cardId}`)
    const cardDataId = cardUi.getAttribute('data-id')

    const originalList = cardUi.closest('.oneLists').getAttribute('data-id');
    const curentList = e.currentTarget.closest('.oneLists').getAttribute('data-id');
    const listInAppData = MODEL.returnListReference(originalList);
    const movedToList = MODEL.returnListReference(curentList);

    const cardReference = MODEL.returnCardReference(cardDataId, originalList);

    //making sure i'm moving to a new list
    if (originalList !== curentList) {

      const curentListUI = e.currentTarget.closest('.oneLists');
      const originalListBadge = cardUi.closest('.oneLists').querySelector('.badge')
      // console.info(e.target.closest('.card'));

      // e.currentTarget.closest('.ulForCards ').appendChild(cardUi);
      // cardUi.insertBefore()

      // e.currentTarget.closest('.ulForCards ').insertBefore(cardUi, e.target.querySelector('.card'))
      e.currentTarget.closest('.ulForCards ').insertBefore(cardUi, e.target.querySelector('.spacing-ul'))

      //if i want to do something with last child situation
      const lastLichild = e.target.querySelector('li:last-child');




      //updating bage
      updateBagde(e, curentListUI);
      originalListBadge.textContent = parseInt(originalListBadge.textContent) - 1;


      MODEL.DropHandlerMoveCardInAppData(e.currentTarget.closest('.oneLists'), movedToList, cardReference);
      // movedToList.tasks.push(cardReference);
      MODEL.deleteCardFromAppData(listInAppData, cardDataId);
      // MODEL.saveAppDataToLocalStorage()
    }

    //erasing all empty Div's in the list
    dragActionsRemovetempDivForSpaces()
  }


//all functions dealling with UI controlls for space between tasks while drag & drop

//erasing empty spaces only when leaving task holder
  function dragOutOfDropZone(e) {
    // e.preventDefault();
    if (e.target === e.currentTarget) {
      dragActionsRemovetempDivForSpaces()
    }

  }

//code for erasing empty DIvs
  function dragActionsRemovetempDivForSpaces() {
    const tempDivs = document.querySelectorAll('.spacing-ul');
    Array.prototype.forEach.call(tempDivs, (div) => {
      div.remove();
      // console.info(div);
    })
  }

//creating empty Div when entering dropZone
  function dragEnterToDropZone(e) {
    // e.preventDefault();
    // e.dataTransfer.dropEffect = "move";

    if (e.target.closest('.card')) {
      const tempDiv = document.createElement('li')
      tempDiv.classList.add('spacing-ul');
      // tempDiv.style.height = '150px';
      // tempDiv.style.width = '50px'


      e.currentTarget.closest('.ulForCards ').insertBefore(tempDiv, e.target.closest('.card'))
      const lastLichild = e.target.closest('.ulForCards li:last-child');




      //here i have to add an if - if the Li is only child then insert after by push
      // console.info(e.target.closest('.ulForCards').querySelectorAll('li').length);

      //
      // if(e.target.closest('.ulForCards').querySelectorAll('li').length <=1){
      //   // e.currentTarget.closest('.ulForCards ').appendChild(tempDiv);
      //   console.info(e.currentTarget.closest('.ulForCards '));
      // }
      // else{
      //   e.currentTarget.closest('.ulForCards ').insertBefore(tempDiv, e.target.closest('.card'))
      // }
      // else{
      //
      // }

    }
  }


//                                       JSON uploading         //
//                                       JSON uploading         //


  function checkIfCanLoadPage() {
    //checking only two since i have only 2 AJAX calls
    //can work also with checking length.
    if (jsonsState[0] && jsonsState[1]) {
      MODEL.saveAppDataToLocalStorage()
      firstLoad();
    }
  }

  function gettingJasonObject(event) {
    const savedLists = JSON.parse(event.target.responseText);
    MODEL.addListsFromJason(savedLists);
    // appData.lists = savedLists;

    jsonsState.push('true');
    checkIfCanLoadPage();
  }


//getting members Jason // and then loading page
  function gettingJasonMembersObj(event) {
    const savedMembers = JSON.parse(event.target.responseText);
    MODEL.addMembersFromJason(savedMembers.members)

    jsonsState.push('true');
    addLabelColors();
    //checking only two since i have only 2 AJAX calls
    checkIfCanLoadPage();
  }

  function addLabelColors() {
    const members = MODEL.returnAllMemebers();
    for (let member of members) {
      member.labelColor = addColor()
    }
  }

  function addColor() {
    const color = memberLableColors[lColorIndex];
    if (lColorIndex >= 5)
      lColorIndex = 0;

    lColorIndex++;
    return color
  }

  function addingMemberListFromObj() {
    const members = MODEL.returnAllMemebers()
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


//                    fisr load of webpage

//building list from appData obj
// & adding list names to edit Modal
  function buildingListFromObj() {

    const savedLists = MODEL.returnsAllListsReference();

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
        const badge = loadList.querySelector('.badge')
        addtoBudge(badge, parentNode);

        //adding members
        for (let member of obj.members) {
          if(MODEL.returnMemberById(member)) {
            const anitinals = anitialsCreator(member)
            addNewMember(anitinals, member, newCard);
          }
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

    }
    if (window.location.hash === '#Members') {
      document.querySelector('#members-link').classList.add('active')
      loadHtmlForMembers(); //creating member page
      addingMemberListFromObj()
      document.querySelector('.main-screen').removeEventListener('click', dropDownMenuFocusClose);

    }
    if (!window.location.hash) {
      window.location.hash = '#Board'

      creatingBlamckBoard();
      // creatingBoard();
      buildingListFromObj();
    }
  }


//hash listener to load page when app is open
  function loadpage() {

    if (window.location.hash === '#Members') {
      document.querySelector('#members-link').classList.add('active')
      document.querySelector('#bord-link').classList.remove('active')
      document.querySelector('.main-screen').removeEventListener('click', dropDownMenuFocusClose);
      loadHtmlForMembers(); //creating member page
      addingMemberListFromObj()


    }
    else {
      // document.removeEventListener('click', dropDownMenuFocusClose);
      document.querySelector('#bord-link').classList.add('active')
      document.querySelector('#members-link').classList.remove('active')
      document.querySelector('.main-screen').addEventListener('click', dropDownMenuFocusClose);
      creatingBlamckBoard();
      buildingListFromObj();
    }

  }


  const memberLableColors = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
  let lColorIndex = 0;
  let CardIdCounter = 0;
  let jsonsState = [];
  window.addEventListener('hashchange', loadpage);

  creatingBlamckBoard();

  if (localStorage.getItem("appData")) {
    MODEL.getAppDataFromLocalStroage()

    loadpage()
  }
  else {
    creatingBoard();
    creatingMembersPage();

  }

})()
