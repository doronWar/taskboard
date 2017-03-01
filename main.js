/**
 * Created by Doron Warzager on 26/02/2017.
 */
// <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">


// creating ta list
function createNewList(listsholder, title) {

  const nodereferece = document.querySelector('.btn-catcher')
  const numberOfTasks = 0;

  const listStringHtml = `


<span class="openerTag " tabindex="0">
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
<span class="tagText">${title}</span>


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

}

//lists of adding event listeners
function addEventListeners(basicTemplete) {
  //listener to create card
  basicTemplete.querySelector('.closerTag').addEventListener('click', createCard);
  //listeners for changing list titles
  basicTemplete.querySelector('.tagText').addEventListener('click', upsdateListName);
  basicTemplete.querySelector('.inputTag').addEventListener('blur', inputLitener);
  basicTemplete.querySelector('.inputTag').addEventListener('keydown', inputLitener);

  basicTemplete.querySelector('.dropdown-toggle').addEventListener('click', listDropDownMenuActions);
  document.addEventListener('click', dropDownMenuFocusClose);
  basicTemplete.querySelector('.listOption').addEventListener('click', deleteList);

}

function deleteList(event) {
  //
  const listIAmIn = event.target.closest('.oneLists');
  // const listHolder =  event.target.closest('.mainCardHolders')
  const nameOfList = event.target.closest('.oneLists').querySelector('.tagText').textContent
  const deleteCheck = confirm(`to delete ${nameOfList}? are you sure`);

  if (!deleteCheck) {
    event.target.parentNode.parentNode.style.display = 'none'
  }
  else {
    listIAmIn.remove();
    // listHolder.removeChild(listIAmIn);
  }
}


//toggle for drop down menu
function listDropDownMenuActions(event) {
  const theMenu = event.currentTarget.parentNode.parentNode.querySelector('.dropdown-menu');


  if (theMenu.style.display === 'none' || !theMenu.style.display) {
    theMenu.style.display = 'block'
  }
  else {
    theMenu.style.display = 'none'

  }
}


//listen to click on all document.
//ask if element's parent are the button.
//if yes do nothing. else close menu
//fix this into catching a not array also//
function dropDownMenuFocusClose(event) {
  
  const theMenu = event.currentTarget.querySelectorAll('.dropdown-menu')

  if (event.target.closest('.btn-group')) {

//does nothing if button pressed
  }
  else {

    for (const oneMenu of theMenu) {
      oneMenu.style.display = 'none';

    }
  }
}


//chang from span to input in list title
function upsdateListName(e) {
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


//listening to the inpute when it appears

function inputLitener(event) {
  let newTitle = event.target.value;

  if (event.type === 'keydown') {
    if (event.keyCode === 13) {
      autoReplaceEmptyInputValue(event, newTitle)
    }

  }
  if (event.type === 'blur') {
    autoReplaceEmptyInputValue(event, newTitle)
  }


//if key stronks are nore then X use prevent default

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
//shifting from input to span title
function displayChanger(event, newTitle) {
  const finalTitle = event.target.parentNode.querySelector('.tagText')

  finalTitle.textContent = newTitle;
  event.target.style.display = 'none';
  finalTitle.style.display = 'inline-block'

}


//function to create a card
function createCard(e) {
  const newCard = document.createElement('li');
  const parentNode = e.target.parentNode.childNodes[3]
  const referenceNode = parentNode.querySelector('ul > li:last-child')

  newCard.setAttribute("class", "card");
  newCard.textContent = 'card';

  parentNode.insertBefore(newCard, referenceNode);
  updateBagde(e, parentNode);

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
  // createNewList(liholder, 'New List')
  button.addEventListener('click', () => {
    createNewList(liholder, 'New List');
  })
}

//        // creating page   //     //      //        / /

const liholder = document.querySelector('#mainCardHolders');

//action that happen when page is loaded
createNewList(liholder, 'tasks');
createNewList(liholder, 'todo');
createNewList(liholder, 'QNA');

// creatSpanListeners();
activeButton();

