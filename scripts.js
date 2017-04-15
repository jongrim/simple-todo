const itemsHTML = document.querySelector('.items'),
      addItemForm = document.querySelector('.add-items'),
      openSidebarButton = document.querySelector('.openSide'),
      closeSidebarButton = document.querySelector('.closeSide'),
      sidebar = document.querySelector('.sidebar'),
      checkAllButton = document.querySelector('#checkAll'),
      deleteButton = document.querySelector('#delete'),
      resetButton = document.querySelector('#reset');

var items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    //add the item to items
    e.preventDefault();
    const text = (this.querySelector("[name='item']")).value;
    let item = {
        text,
        done: false
    }
    items.push(item);
    
    //create the HTML for the item
    publishList(items, itemsHTML);

    //store list locally
    setLocalStorage(items);
    
    this.reset();
}

function publishList(items = [], itemsList) {
     //Build the HTML for each item
    if (items.length === 0) {
        resetList();
        return;
    }
    itemsList.innerHTML = items.map((item, index) => {
        return `
        <li>
            <input type="checkbox" data-index=${index} name="item${index}"
            ${item.done ? "checked" : ''}/>
            <label for="item${index}">${item.text}</label>
        </li>
        `
    }).join('');
 }

function flipDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    setLocalStorage(items);
}

function setLocalStorage(input) {
    localStorage.setItem('items', JSON.stringify(input));
}

function openSidebar() {
    sidebar.style.width = '125px';
}

function closeSidebar() {
    sidebar.style.width = '0px';
}

function checkAll() {
    for (var item of items) {
        item.done = true;
    }
    publishList(items, itemsHTML);
}

function deleteSelected() {
    let newItems = [];
    for (var item of items) {
        if (item.done == false) {
            newItems.push(item);
        }
    }
    items = Array.from(newItems);
    setLocalStorage(newItems);
    publishList(newItems, itemsHTML);
}

function resetList() {
    itemsHTML.innerHTML = "<li>Starting building your todo list above and watch them appear down here!</li><li>Don't worry about if you close the window. Your items will be here when you get back 😺</li>";
    localStorage.removeItem('items');
    items = [];
}

addItemForm.addEventListener('submit', addItem);
openSidebarButton.addEventListener('click', openSidebar);
closeSidebarButton.addEventListener('click', closeSidebar)
checkAllButton.addEventListener('click', checkAll);
deleteButton.addEventListener('click', deleteSelected);
resetButton.addEventListener('click', resetList);

itemsHTML.addEventListener('click', flipDone);
publishList(items, itemsHTML);
