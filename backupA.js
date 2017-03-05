/**
 * Created by Doron Warzager on 26/02/2017.
 */



//creating the edit modal
// function createEditListPopUp() {
  // const wrappingDiv = document.createElement('div')
  // wrappingDiv.setAttribute("class", "modal PopUpMenuHide");
  // wrappingDiv.setAttribute("tabindex", "-1");
  // wrappingDiv.setAttribute("role", "dialog");
// const popUpEditMenu = `
//  <div class="modal" tabindex="-1" role="dialog">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//         <h4 class="modal-title">Edit Card</h4>
//       </div>
//       <div class="modal-body editMenuInputes">
//
//
//       <form class="form-horizontal">
//   <div class="form-group">
//   <label for="card-text"class="col-sm-2 control-label">Card Text</label>
//        <div class="col-sm-10">
//         <textarea type="text" id="card-text" class="form-control"></textarea>
//         </div>
//
//   </div>
//   <div class="form-group">
//
//      <label for="exampleSelect1" class="col-sm-2 control-label">Move To</label>
//      <div class="col-sm-10">
//     <select class="form-control lists-holder" id="exampleSelect1">
//
//     </select>
//     </div>
//   </div>
//   <label for="exampleSelect1" class="col-sm-2 control-label ">Members</label>
//     <div class="col-sm-offset-2 members-input  ">
//       <div class="checkbox form-control member-list">
//
//       <label for=""Member-name1"><input type="checkbox" name="memeber1" value="memeber1" id="Member-name1">
//     Member Name</label>
//       <label for=""Member-name2"><input type="checkbox" name="memeber2" value="memeber2" id="Member-name2">
//     Member Name</label>
//
//       </div>
//     </div>
//     <button type="button" class="btn btn-danger btn-delete-size">Delete Card</button>
//
// </form>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-default close-btn" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
//   </div>
//
// `

// wrappingDiv.innerHTML += popUpEditMenu;
// document.querySelector('main').appendChild(wrappingDiv);

//
// document.querySelector('.close').addEventListener('click',toggleEditPanle);
// document.querySelector('.close-btn').addEventListener('click',toggleEditPanle);
//
// }





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


