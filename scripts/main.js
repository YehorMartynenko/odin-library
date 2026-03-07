class Book {
  constructor(id, title, author, pages, status){
    this.id = id;
    this.title = title;
    this.author = author
    this.pages = pages;
    this.status = status;
  }

  changeStatus() {
    if(this.status){
      this.status = false;
    } else {
      this.status = true;
    }
  }
}

const Library = (function() {
  const myLibrary = [];
  const displayedBooksIds = [];

  const addBookToLibrary = (book) => {
    myLibrary.push(book);
  }

  const addToDisplayedBooksIds = (id) => {
    displayedBooksIds.push(id);
  }
  const getLibrary = () => myLibrary;
  const getDisplayedBooksIds = () => displayedBooksIds;

  return { getLibrary, getDisplayedBooksIds, addBookToLibrary, addToDisplayedBooksIds }
})();


const container = document.querySelector(".container"); 

function displayBooks(){
    Library.getLibrary().forEach((el) => {
      if(!Library.getDisplayedBooksIds().includes(el.id)){
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
        let bookIndex = Library.getLibrary().findIndex((book) => book.id === bookId);
        if(bookIndex != -1){
          myLibrary.splice(bookIndex, 1);
        }
        if(Library.getDisplayedBooksIds().indexOf(bookId) != -1){
          Library.getDisplayedBooksIds().splice(Library.getDisplayedBooksIds().indexOf(bookId), 1);
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
        Library.addToDisplayedBooksIds(el.id);
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
  const newBook = new Book(crypto.randomUUID(), titleInput.value, authorInput.value, pagesInput.value, statusCheckbox.checked);
  Library.addBookToLibrary(newBook);
  e.preventDefault();
  displayBooks();
  form.reset();
  dialog.close();
});




