/**
 * Created by Doron Warzager on 26/02/2017.
 */


// creating ta list
function createNewList(listsholder,title) {

  const nodereferece = document.querySelector('.btn')
const numberOfTasks = 0;
const listStringHtml =`

<span class="openerTag ">
${title}
<span class="badge"> ${numberOfTasks} </span> </span>
<ul class="ulForCards ">
</ul>
<span class="closerTag">Add Card</span>`;


//creating the new list:
const basicTemplete = document.createElement('div');
basicTemplete.setAttribute("class", "oneLists" );
basicTemplete.innerHTML +=listStringHtml;
  listsholder.insertBefore(basicTemplete, nodereferece);

  basicTemplete.querySelector('.closerTag').addEventListener('click', createCard);
}


//function to create a card
function createCard(e){
  const newCard = document.createElement('li');
  const parentNode = e.target.parentNode.childNodes[3]
  const referenceNode = parentNode.querySelector('ul > li:last-child')

  newCard.setAttribute("class", "card" );
  newCard.textContent = 'card';

  parentNode.insertBefore(newCard, referenceNode)

}



function activeButton() {
  const button = document.querySelector('.btn')
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


