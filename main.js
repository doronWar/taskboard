/**
 * Created by Doron Warzager on 26/02/2017.
 */


// creating the basic first three lists
function createNewList(listsholder,title) {
const numberOfTasks = 0;
const listStringHtml =`

<span class="openerTag ">
${title}
<span class="badge"> ${numberOfTasks} </span> </span>
<ul class="ulForCards ">
<li class="card">creat new cards </li>
`;

const addButton = function addCardButtonAdder();
const basicTemplete = document.createElement('div');
basicTemplete.setAttribute("class", "oneLists" );

basicTemplete.innerHTML +=listStringHtml + addButton;
  // basicTemplete.innerHTML += '</ul>
listsholder.appendChild(basicTemplete);
}
//stopt while creating listener to the span
// i might also be able to catch the span after creating it and then just adding to it the listener!
function addCardButtonAdder(){
  const closerTag = document.createElement('span');
  closerTag.textContent= '<span class="closerTag">add card</span>'
  closerTag.addEventListener('click',createCard(e));

  return closerTag;
}



// creating button
function addButton(){
  liholder.innerHTML+= ` <button onclick= "createList" class="btn btn-default navbar-btn">Add new task</button>`
  console.log(liholder);
}

//function to create a card
function createCard(listToAddTo){
  const newCard = document.createElement('li');
  newCard.setAttribute("class", "card" );
  newCard.textContent = 'card';
  listToAddTo.appendChild(newCard);

  //              //    need to add a listener    //      //
}


// creating page
const liholder = document.querySelector('#mainCardHolders');

createNewList(liholder, 'tasks');
createNewList(liholder, 'todo');
createNewList(liholder, 'QNA');
addButton();

createCard(document.querySelector('.ulForCards'));


//1.now i need to create a new card - a function.
//2.need to add to the button to add a card a litener - this is before




//
//   `
// <span class="openerTag ">
//       tasks
//       <span class="badge"> ${numberOfTasks}</span>
//
//     </span>
//
//     <ul class="ulForCards ">
//       <li class="card">cards </li>
//      </ul>
//
//     <span class="closerTag">add card</span>`
