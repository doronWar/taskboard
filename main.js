/**
 * Created by Doron Warzager on 26/02/2017.
 */



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

  if (!deleteCheck) {
    event.target.parentNode.parentNode.style.display = 'none'
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
  const theMenu = listsholder.querySelectorAll('.dropdown-menu')
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
  // addNewMember('DW', 'doron warzagr', newCard);

  return newCard
}

//function to create a card
function createCardByclick(e) {

  if (e.keyCode === 13 || e.type === 'click') {

    const newCard = cardCreation();
    const parentNode = e.target.closest('.oneLists').querySelector('.ulForCards')
    const referenceNode = parentNode.querySelector('ul > li:last-child')
    parentNode.insertBefore(newCard, referenceNode);
    updateBagde(e, parentNode);
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


function activeButton() {
  const button = document.querySelector('.btn-catcher');

  button.addEventListener('click', () => {
    createNewList('New List');
  })
}

function gettingJasonObject(event) {
  const savedLists = JSON.parse(event.target.responseText);

  //creating the lists
  for (let list of savedLists.board) {
    const loadList = createNewList(list.title)
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
//this has to be a function that recives a name and returns thee two first lettes

function anitialsCreator(fullname) {
  const nameToArray =fullname.split(' ').map((n)=> n[0]);
  return nameToArray.join('');

}


//        // creating page   //     //      //        / /

const listsholder = document.querySelector('#mainCardHolders');
const memberLableColors = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
let lColorIndex = 0;
//to toggle menu by pressing anywhere in document
document.addEventListener('click', dropDownMenuFocusClose);

//getting a Jason
const xhr = new XMLHttpRequest();
xhr.addEventListener("load", gettingJasonObject);
xhr.open("GET", "assets/board.json");
xhr.send();


//action that happen when page is loaded
// createNewList('tasks');
// createNewList('todo');
// createNewList('QNA');

// creatSpanListeners();
activeButton();

