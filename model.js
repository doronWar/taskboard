/**
 * Model
 */

//                            data manegment            //


//updating member name in appdata
// function uppdatMemberInAppData(e){
//
//   const originalName =e.target.closest('.member-in-list').querySelector('.memebr-name').textContent;
//
//   const newList = {
//     name:e.target.closest('.member-in-list').querySelector('.new-member-name').value
//   };
//   const members = returnAllMemebers();
//   members.forEach((member)=>{
//     if(member.name===originalName){
//       member.name=newList.name;
//     }
//   })
//
// }

function uppdatMemberInAppData(e, memberId){
  //
  // const originalName =e.target.closest('.member-in-list').querySelector('.memebr-name').textContent;

  const newList = {
    name:e.target.closest('.member-in-list').querySelector('.new-member-name').value
  };
  const members = returnAllMemebers();
  members.forEach((member)=>{
    if(member.id===memberId){
      member.name=newList.name;
    }
  })
  SaveAppDataToLocalStorage()
}


//adding member in appdata
function addMemberToAppData(e){

  const newList = {
    name: e.target.closest('.modal-content ').querySelector('.new-member-input').value,
    id:uuid(),
    labelColor: addColor()
  };
  const members =  returnAllMemebers();
    members.push(newList);
  SaveAppDataToLocalStorage()
}

//deleting member from appData
function deleteMemberFromAppData(e, memberId) {

  let indexinAppData =0;
  const members= returnAllMemebers()
  members.forEach((member, index)=> {
    if(member.id === memberId){
      indexinAppData = index;
    }
  })
  members.splice(indexinAppData,1);
  SaveAppDataToLocalStorage()
}


//adding list in appdata
function addListToAppData(e, list){
  const newList = {
    id: list.getAttribute('data-id'),
    title: 'New List',
    tasks: []
  };

  const allListsAppData = returnsAllListsReference();

  allListsAppData.push(newList)

  addMoveToOptions(newList, newList.id);
  SaveAppDataToLocalStorage()

}

//updating the name of the list in appdata
function changeListNameInAppData(event, newTitle) {

  const oldTitle = event.target.closest('.oneLists').querySelector('.tagText').textContent;
  const allListsAppData = returnsAllListsReference();
  const listInAppData = allListsAppData.find((DataTitle) => oldTitle === DataTitle.title);

  listInAppData.title = newTitle
  SaveAppDataToLocalStorage()

}


//deleteing a list in appdata
function deleteListToAppData(e){

  const listId = e.target.closest('.oneLists').getAttribute('data-id');
  const AlllistsInAppData= returnsAllListsReference()
  const listInAppData = AlllistsInAppData.find((DataTitle) => listId === DataTitle.id)
  let indexOfList = 0;

  AlllistsInAppData.forEach((list, index) => {
    if (list.id === listInAppData.id) {
      indexOfList = index;
      AlllistsInAppData.splice(indexOfList, 1)
      SaveAppDataToLocalStorage()
    }
  });

}


// adding a card to board in appdata
function addCardAppData(e) {

  const id =e.target.closest('.oneLists').getAttribute('data-id');
  const listInAppData =returnListReference(id)
  const cardId= e.target.closest('.oneLists').querySelector('.ulForCards li:last-child');

  const cardOfAppData = {
    members: [],
    text: 'Add new task',
    id: cardId.getAttribute('data-id'),
  }
  listInAppData.tasks.push(cardOfAppData)
  SaveAppDataToLocalStorage()
}



function deleteButtonModal(e) {
  const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
  const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id');
  const currentLocation =returnListReference(listId);
  const deleteCheck = confirm(`Are you sure you want to delete this task?`);

  if(deleteCheck){
    deleteCardFromAppData(currentLocation, cardId);
    closeEditModal();
    SaveAppDataToLocalStorage()
  }
}


//adding and removing members from card
function editModalMemberChanges(e) {
  const membersOnModal = e.target.closest('.modal-content').querySelectorAll('.members-input input')
  const memberToCheck = Array.prototype.slice.call(membersOnModal);
  const cardId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-data-id');
  const listId = e.target.closest('#modal').querySelector('.modal-save').getAttribute('temp-list-data-id')

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

function DropHandlerMoveCardInAppData(currentList, listInAppData) {

  const tasks = currentList.querySelectorAll('.card');
  const newArray = Array.prototype.slice.call(listInAppData.tasks);

  //what i'm thinking of doing:
  //going through each item andseeing with the index f the function that loops with index two
  //where's the index of the new card and then pushing it in the right place.
  newArray.forEach((card)=>{
    // for (let task of tasks) {
    //   if(task.getAttribute('.data-id')!==)
    // }
    // if()
  })

  console.info(newArray);
  // console.info(tasks);
  
//   for (let task of tasks) {
//    const member = {
//      id: task.getAttribute('data-id'),
//      members:
//     text: task.querySelector('p').textContent
//    }
//     console.info(task);
//   }

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


    const newLocation = returnListReference(directoryId)
    const currentLocation =returnListReference(listId)
    const cardReference= returnCardReference(cardId,listId);
    //moving to new location
    newLocation.tasks.push(cardReference);

    //earasing the card from the list
    deleteCardFromAppData(currentLocation, cardId);

  }

}

//deleteing a card from the appdata
function deleteCardFromAppData(currentLocation,cardId) {

  [].forEach.call(currentLocation.tasks, (task, index)=>{
    if (task.id===cardId){
      Array.prototype.splice.call(currentLocation.tasks , index, 1)
      SaveAppDataToLocalStorage()
    }
  })
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
  SaveAppDataToLocalStorage()

}


//          search data functions         //


// returning a reference to the card i want
function returnCardReference(cardId, listId) {
  let cardReference = '';
  const lists = returnsAllListsReference();


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

// returning a reference to the list i want
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

//reciving memers list
function returnAllMemebers() {
  return appData.members
}

//return member by Id
function returnMemberById(id) {
  const members = returnAllMemebers();
  for (let member of members) {
    if(id === member.id){
      return  member
    }
  }
}


//Moving from Json to AppData
function addMembersFromJason(JsoonMembers) {
  appData.members = JsoonMembers;
}

function addListsFromJason(JsonList) {
  appData.lists = JsonList;
}

function SaveAppDataToLocalStorage() {
  localStorage.setItem("appData", JSON.stringify(appData))
}

function GetAppDataFromLocalStroage() {
  appData= JSON.parse(localStorage.getItem('appData'));
}

let appData = {
  lists: [],
  members: []
}
