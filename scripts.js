const itemsHTML = document.querySelector('.items');
const addItemForm = document.querySelector('.add-items');
const items = JSON.parse(localStorage.getItem('items')) || [];
const openSidebarButton = document.querySelector('.openSide');
const closeSidebarButton = document.querySelector('.closeSide');
const sidebar = document.querySelector('.sidebar');

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
    if (items.length === 0) return;
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

addItemForm.addEventListener('submit', addItem);
openSidebarButton.addEventListener('click', openSidebar);
closeSidebarButton.addEventListener('click', closeSidebar)

itemsHTML.addEventListener('click', flipDone);
publishList(items, itemsHTML);
