const myLibrary = [];
const displayedBooks = [];
function Book(id, title, author, pages) {
  this.id = id,
  this.title = title,
  this.author = author,
  this.pages = pages
}

function addBookToLibrary(title, author, pages) {
  let newBook = new Book(crypto.randomUUID(), title, author, pages);
  myLibrary.push(newBook);
}
console.table(myLibrary);

const container = document.querySelector(".container");

function displayBooks(){
    myLibrary.forEach((el) => {
      if(!displayedBooks.includes(el)){
        let book = document.createElement("div");
        book.setAttribute("class","book");
        let title = document.createElement("p");
        title.setAttribute("class","title");
        let author = document.createElement("p");
        author.setAttribute("class","author");
        let pages = document.createElement("p");
        pages.setAttribute("class","pages");

        title.textContent = `Title: ${el.title}`;
        author.textContent = `Author: ${el.author}`;
        pages.textContent = `Pages: ${el.pages}`;

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        container.appendChild(book);
        displayedBooks.push(el);
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

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  dialog.close();
})

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const form = document.querySelector("form");
submitBtn.addEventListener("click", (e) => {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value);
  e.preventDefault();
  displayBooks();
  form.reset();
  dialog.close();
});

