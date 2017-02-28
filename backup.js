/**
 * Created by Doron Warzager on 26/02/2017.
 */
// <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">

// <div class="input-group">
//   <div class="input-group-btn">
//   <!-- Button and dropdown menu -->
// </div>
// <input type="text" class="form-control" aria-label="...">
//   </div>


// creating ta list
function createNewList(listsholder,title) {

  const nodereferece = document.querySelector('.btn')
  const numberOfTasks = 0;
  const listStringHtml =`

<span class="openerTag " tabindex="0">
${title}
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

  basicTemplete.querySelector('.openerTag').addEventListener('click', upsdateListName);
}

function upsdateListName(e) {
  const nameHolder = e.target;
  nameHolder.style.backgroundColor = 'white';

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

function updateBagde(badge, parentNode) {
  const numberOfCards = badge.target.parentNode.querySelector('.badge');
  numberOfCards.textContent =parentNode.querySelectorAll('.card').length;
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


