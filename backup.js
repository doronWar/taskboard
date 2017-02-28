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
<span class="tagText"><strong>${title}</strong></span>

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
}



//this is the  function i've build to listen
function upsdateListName(e) {
  const nameHolder = e.target;
  const listName = nameHolder.textContent;
  const inputeFiled = document.createElement('input');

  inputeFiled.type = 'text'
  inputeFiled.value = listName;

  nameHolder.style.display = 'none';
  nameHolder.parentNode.appendChild(inputeFiled)
  inputeFiled.focus();

  inputeFiled.addEventListener('keypress', (event)=>{
    inputListener(event, nameHolder, inputeFiled, listName)
  });
  inputeFiled.addEventListener('blur', (event)=>{
    inputListener(event, nameHolder, inputeFiled, listName)
  });



}


function inputListener(event , nameHolder, inputeFiled, listName) {

  const ENTER = 13;

  if (event.keyCode === ENTER) {

    //making sure that the name isn't empty
    if(inputeFiled.value=== ''){
      inputeFiled.value = listName;
    }


    nameHolder.innerHTML = `<strong> ${inputeFiled.value} </strong>`;
    inputeFiled.style.display = 'none';
    nameHolder.style.display = 'block';
  }

  if(event.type === 'blur'){
    nameHolder.innerHTML = `<strong> ${inputeFiled.value} </strong>`;
    inputeFiled.style.display = 'none';
    nameHolder.style.display = 'block';
  }

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

  // badge.target.parentNode.querySelector('.badge').textContent =  parentNode.querySelectorAll('.card').length;
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

createNewList(liholder, 'tasks');
createNewList(liholder, 'todo');
createNewList(liholder, 'QNA');


// creatSpanListeners();
activeButton();


