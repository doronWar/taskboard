/**
 * Model
 */

//                            data manegment            //


var MODEL = (function () {

  let appData = {
    lists: [],
    members: []
  }


//adding member in appdata
function addMemberToAppData(newList){
  const members =  returnAllMemebers();

    members.push(newList);

  saveAppDataToLocalStorage()
}

//deleting member from appData
function deleteMemberFromAppData(memberId) {

  let indexinAppData =0;
  const members= returnAllMemebers()
  members.forEach((member, index)=> {
    if(member.id === memberId){
      console.info(member);
      indexinAppData = index;
    }
  })
  members.splice(indexinAppData,1);
  saveAppDataToLocalStorage()
}



//updating the name of the list in appdata
function changeListNameInAppData(listInAppData, newTitle) {

  listInAppData.title = newTitle
  saveAppDataToLocalStorage()

}


//deleteing a list in appdata
function deleteListToAppData(listId){

  const AlllistsInAppData= returnsAllListsReference()
  const listInAppData = AlllistsInAppData.find((DataTitle) => listId === DataTitle.id)
  let indexOfList = 0;

  AlllistsInAppData.forEach((list, index) => {
    if (list.id === listInAppData.id) {
      indexOfList = index;
      AlllistsInAppData.splice(indexOfList, 1)
      saveAppDataToLocalStorage()
    }
  });

}


// adding a card to board in appdata
function addCardAppData(listInAppData, cardId) {

  const cardOfAppData = {
    members: [],
    text: 'Add new task',
    id:cardId,
  }
  listInAppData.tasks.push(cardOfAppData)
  saveAppDataToLocalStorage()
}


//pushing card by drop handler to the right place in appData
function DropHandlerMoveCardInAppData(currentList, listInAppData, cardId) {

  const tasks = currentList.querySelectorAll('.card');
  const newArray = Array.prototype.slice.call(tasks);
  let cardIndex;
  newArray.forEach((task, index)=>{
    if(task.getAttribute('data-id')===cardId.id) {
      cardIndex = index;
    }
  })
  listInAppData.tasks.splice(cardIndex, 0, cardId )


}

//deleteing a card from the appdata
function deleteCardFromAppData(currentLocation,cardId) {

  [].forEach.call(currentLocation.tasks, (task, index)=>{
    if (task.id===cardId){
      Array.prototype.splice.call(currentLocation.tasks , index, 1)
      saveAppDataToLocalStorage()
    }
  })
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


//Moving from Json to AppData
function addMembersFromJason(JsoonMembers) {
  appData.members = JsoonMembers;
}

function addListsFromJason(JsonList) {
  appData.lists = JsonList;
}

function saveAppDataToLocalStorage() {
  localStorage.setItem("appData", JSON.stringify(appData))
}

function getAppDataFromLocalStroage() {
  appData= JSON.parse(localStorage.getItem('appData'));
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

  return {
    returnMemberById,
    addMemberToAppData ,
    deleteMemberFromAppData,
    changeListNameInAppData,
    deleteListToAppData ,
    addCardAppData ,
    DropHandlerMoveCardInAppData,
    deleteCardFromAppData,
    returnCardReference ,
    returnListReference ,
    returnsAllListsReference ,
    returnAllMemebers ,
    addMembersFromJason ,
    addListsFromJason,
    saveAppDataToLocalStorage ,
    getAppDataFromLocalStroage,
  }
})();
