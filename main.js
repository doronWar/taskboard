/**
 * Created by Doron Warzager on 26/02/2017.
 */
// <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">


// creating ta list
function createNewList(listsholder,title) {

  const nodereferece = document.querySelector('.btn')
  const numberOfTasks = 0;

  const listStringHtml =`


<span class="openerTag " tabindex="0">
<input class ="inputTag" type="text" style="display: none"></input>
<span class="tagText">${title}</span>

<span class="badge"> ${numberOfTasks} </span> </span>
<ul class="ulForCards ">
</ul>
<span class="closerTag" tabindex="0">Add Card</span>`;


//creating the new list:
  const basicTemplete = document.createElement('div');
  basicTemplete.setAttribute("class", "oneLists" );
  basicTemplete.innerHTML +=listStringHtml;
  listsholder.insertBefore(basicTemplete, nodereferece);



  basicTemplete.querySelector('.closerTag').addEventListener('click', createCard);


  //this are the listeners i've added
  basicTemplete.querySelector('.tagText').addEventListener('click', upsdateListName);
  basicTemplete.querySelector('.inputTag').addEventListener('blur', inputLitener);
  basicTemplete.querySelector('.inputTag').addEventListener('keydown', inputLitener);
}



//chang from span to input in list title
function upsdateListName(e) {
  const nameHolder = e.target;
  const listName = nameHolder.textContent;
  const nameHolderParent=nameHolder.parentNode;
  const inputeFiled =nameHolderParent.querySelector('input');
  // const inputeFiled = document.createElement('input');
  // inputeFiled.type = 'text'

  inputeFiled.value = listName;
  inputeFiled.style.display = "inline-block"
  nameHolder.style.display = 'none';
  nameHolder.parentNode.appendChild(inputeFiled)
  inputeFiled.focus();

}


//listening to the inpute when it appears

function  inputLitener(event){
  let newTitle = event.target.value;

  if(event.type === 'keydown'){
  if(event.keyCode === 13) {
    autoReplaceEmptyInputValue(event,newTitle )
  }
  }
  if(event.type === 'blur'){
    autoReplaceEmptyInputValue(event,newTitle )
  }


}

function autoReplaceEmptyInputValue(event,newTitle ) {
  if(newTitle=== '' || newTitle=== ' ') {
    newTitle = event.target.parentNode.querySelector('.tagText').textContent;
    displayChanger(event, newTitle);
  }
  else{
    displayChanger(event, newTitle);
  }
}

function displayChanger(event, newTitle) {
  const finalTitle = event.target.parentNode.querySelector('.tagText')

  finalTitle.textContent = newTitle;
  event.target.style.display = 'none';
  finalTitle.style.display = 'inline-block'

}


//function to create a card
function createCard(e){
  const newCard = document.createElement('li');
  const parentNode = e.target.parentNode.childNodes[3]
  const referenceNode = parentNode.querySelector('ul > li:last-child')

  newCard.setAttribute("class", "card" );
  newCard.textContent = 'card';

  parentNode.insertBefore(newCard, referenceNode);
  updateBagde(e, parentNode);

}

//updating badge number
function updateBagde(badge, parentNode) {

  const badgenumberOfCards = badge.target.parentNode.querySelector('.badge');
  const numbeOfCards =parentNode.querySelectorAll('.card').length;
  badgenumberOfCards.textContent =numbeOfCards;

  //keeping the number in the center of the badge
  if(numbeOfCards >= 10){
    badgenumberOfCards.style.paddingLeft = '3px';
  }
}


function activeButton() {
  const button = document.querySelector('.btn');
  // createNewList(liholder, 'New List')
  button.addEventListener('click',()=>{
    createNewList(liholder, 'New List');
  })
}

// creating page
const liholder = document.querySelector('#mainCardHolders');

//action that happen when page is loaded
createNewList(liholder, 'tasks');
createNewList(liholder, 'todo');
createNewList(liholder, 'QNA');

// creatSpanListeners();
activeButton();

