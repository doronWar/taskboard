/**
 * Created by Doron Warzager on 26/02/2017.
 */


// creating the basic first three lists
function createNewList(listsholder,title) {

  const nodereferece = document.querySelector('.btn')
  const numberOfTasks = 0;
  const listStringHtml =`

<span class="openerTag ">
${title}
<span class="badge"> ${numberOfTasks} </span> </span>
<ul class="ulForCards ">
<li class="card">creat new cards </li>
</ul>
<span class="closerTag">Add Card</span>
`;


//creating the new list:
  const basicTemplete = document.createElement('div');

  basicTemplete.setAttribute("class", "oneLists" );
  basicTemplete.innerHTML +=listStringHtml;

  listsholder.insertBefore(basicTemplete, nodereferece);
  creatSpanListeners();


  //
  // const test = document.createElement('span');
  // test.setAttribute("class", "closerTag");
  //   test.textContent= 'add card';
  //
  //
  //   basicTemplete.appendChild(test);


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


function creatSpanListeners() {
  const spans = document.querySelectorAll('.closerTag');

  for (const oneSpan of spans) {
    oneSpan.addEventListener('click', createCard);
  }
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


creatSpanListeners();
activeButton();


