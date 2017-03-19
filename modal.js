/**
 * Created by Doron Warzager on 19/03/2017.
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


//          search data functions         //


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

//reciving list of lists
function  returnsAllListsReference(){
  return appData.lists.board
}



