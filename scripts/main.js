const myLibrary = [];

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

addBookToLibrary("Title1", "Author1", "pages1");
addBookToLibrary("Title11", "Author11", "pages11");
addBookToLibrary("Title111", "Author111", "pages111");
console.table(myLibrary);

const container = document.querySelector(".container");

function displayBooks(){
    myLibrary.forEach((el) => {
        let book = document.createElement("div");
        book.setAttribute("class","book");
        let title = document.createElement("p");
        title.setAttribute("class","title");
        let author = document.createElement("p");
        author.setAttribute("class","author");
        let pages = document.createElement("p");
        pages.setAttribute("class","pages");

        title.textContent = el.title;
        author.textContent = el.author;
        pages.textContent = el.pages;

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        container.appendChild(book);
    });
}

displayBooks();