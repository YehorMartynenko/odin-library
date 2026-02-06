const myLibrary = [];
const displayedBooksIds = [];
function Book(id, title, author, pages, status) {
  this.id = id,
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status
}


Book.prototype.changeStatus = function() {
  if(this.status){
    this.status = false;
  } else {
    this.status = true;
  }
}
function addBookToLibrary(title, author, pages, status) {
  let newBook = new Book(crypto.randomUUID(), title, author, pages, status);
  myLibrary.push(newBook);
}
console.table(myLibrary);

const container = document.querySelector(".container");

function displayBooks(){
    myLibrary.forEach((el) => {
      if(!displayedBooksIds.includes(el.id)){
        let book = document.createElement("div");
        book.setAttribute("class","book");
        let title = document.createElement("p");
        title.setAttribute("class","title");
        let author = document.createElement("p");
        author.setAttribute("class","author");
        let pages = document.createElement("p");
        pages.setAttribute("class","pages");
        let status = document.createElement("p");
        if(el.status){
          status.setAttribute("class", "read");
          status.textContent = `Status: read`;
        } else {
          status.setAttribute("class", "unread");
          status.textContent = `Status: unread`;
        }
        
        title.textContent = `Title: ${el.title}`;
        author.textContent = `Author: ${el.author}`;
        pages.textContent = `Pages: ${el.pages}`;

        let deleteBtn = document.createElement("button");
        let deleteIcon = document.createElement("img");

        deleteBtn.setAttribute("class", "delete-btn");
        deleteIcon.setAttribute("src", "images/close-btn.svg");
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", () => {
        let bookId = deleteBtn.parentElement.getAttribute("data-id");
        let bookIndex = myLibrary.findIndex((book) => book.id === bookId);
        if(bookIndex != -1){
          myLibrary.splice(bookIndex, 1);
        }
        if(displayedBooksIds.indexOf(bookId) != -1){
          displayedBooksIds.splice(displayedBooksIds.indexOf(bookId), 1);
        }
        container.removeChild(container.querySelector(`.book[data-id='${bookId}']`));
      })

        status.addEventListener("click", () => {
          if(status.getAttribute("class") === "read"){
            status.setAttribute("class", "unread");
            status.textContent = `Status: unread`;
            el.changeStatus();
          } else {
            status.setAttribute("class", "read");
            status.textContent = `Status: read`;
            el.changeStatus();
          }
        })

        book.appendChild(deleteBtn);
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(status);
        book.setAttribute("data-id", el.id);
        container.appendChild(book);
        displayedBooksIds.push(el.id);
      }
    });
}

displayBooks();

const addBookBtn = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector("button[type='submit']");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  form.reset();
  dialog.close();
})

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusCheckbox = document.querySelector("#status");
const form = document.querySelector("form");
submitBtn.addEventListener("click", (e) => {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, statusCheckbox.checked);
  e.preventDefault();
  displayBooks();
  form.reset();
  dialog.close();
});




