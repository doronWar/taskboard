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
<span class="tagText" contenteditable="true"><strong>${title}</strong></span>

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
  basicTemplete.querySelector('.openerTag').addEventListener('click', upsdateListName);

  basicTemplete.querySelector('.openerTag').addEventListener('blur', upsdateListName);
}
//this is the  function i've build to listen
function upsdateListName(e) {
  const nameHolder = e.target;

  //need to add here a code that changes the span into an inpute
  //change the span inside the span back into just text - and then just do innerHTML too create there a inpute-  and then finnally turn it back to the span!
  if(e.type === 'click') {
    // nameHolder.querySelector('.tagText').textContent= '';
    nameHolder.style.backgroundColor = 'green';
    // nameHolder.querySelector('.tagText').style.backgroundColor = 'green'
  }
  if(e.type === 'blur') {
    nameHolder.style.backgroundColor = 'white';
    nameHolder.querySelector('.tagText').style.backgroundColor = 'white'
  }
// add what enter does and so on
  console.log('hello');
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


