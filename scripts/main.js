class Book {
  constructor(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  changeStatus() {
    if (this.status) {
      this.status = false;
    } else {
      this.status = true;
    }
  }
}

const Library = (function () {
  const myLibrary = [];

  const addBookToLibrary = (book) => {
    myLibrary.push(book);
  };
  const getLibrary = () => myLibrary;

  const deleteBookFromLibrary = (bookId) => {
    myLibrary.splice(bookId, 1);
  };

  const toggleBookStatus = (bookId) => {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
    console.log(bookIndex);
    console.log(myLibrary[bookIndex]["status"]);
    myLibrary[bookIndex]["status"] === true
      ? (myLibrary[bookIndex]["status"] = false)
      : (myLibrary[bookIndex]["status"] = true);
  };

  return {
    getLibrary,
    addBookToLibrary,
    deleteBookFromLibrary,
    toggleBookStatus,
  };
})();

const DisplayController = (function () {
  const container = document.querySelector(".container");

  const addBookBtn = document.querySelector(".add-book");
  const dialog = document.querySelector("dialog");
  const closeBtn = document.querySelector(".close-btn");
  const submitBtn = document.querySelector("button[type='submit']");
  const form = document.querySelector("form");

  console.log(submitBtn);
  const displayBooks = () => {
    container.textContent = "";
    Library.getLibrary().forEach((el) => {
      let book = document.createElement("div");
      book.setAttribute("class", "book");
      let title = document.createElement("p");
      title.setAttribute("class", "title");
      let author = document.createElement("p");
      author.setAttribute("class", "author");

      let pages = document.createElement("p");
      pages.setAttribute("class", "pages");
      let status = document.createElement("p");
      status.setAttribute("id", "status");

      const statusValue = el.status ? "read" : "unread";
      status.setAttribute("class", statusValue);
      status.textContent = `Status: ${statusValue}`;

      title.textContent = `Title: ${el.title}`;
      author.textContent = `Author: ${el.author}`;
      pages.textContent = `Pages: ${el.pages}`;

      let deleteBtn = document.createElement("button");
      let deleteIcon = document.createElement("img");

      deleteBtn.setAttribute("class", "delete-btn");
      deleteIcon.setAttribute("src", "images/close-btn.svg");
      deleteBtn.appendChild(deleteIcon);

      book.appendChild(deleteBtn);
      book.appendChild(title);
      book.appendChild(author);
      book.appendChild(pages);
      book.appendChild(status);
      book.dataset.id = el.id;

      container.appendChild(book);
    });
  };

  function clickHandlerContainer(e) {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      const bookCard = deleteBtn.closest(".book");
      const bookId = bookCard.dataset.id;
      Library.deleteBookFromLibrary(bookId);
      displayBooks();
    }

    const statusBtn = e.target.closest("#status");
    if (statusBtn) {
      const bookCard = statusBtn.closest(".book");
      const bookId = bookCard.dataset.id;
      Library.toggleBookStatus(bookId);
      displayBooks();
    }
  }

  function clickHandlerAddBtn() {
    dialog.showModal();
  }

  function clickHandlerCloseBtn() {
    form.reset();
    dialog.close();
  }

  function clickHandlerSubmitBtn(e) {
    e.preventDefault();
    const form = e.target;
    const newBook = new Book(
      crypto.randomUUID(),
      form.elements.title.value,
      form.elements.author.value,
      form.elements.pages.value,
      form.elements.status.value,
    );
    console.log(newBook);
    Library.addBookToLibrary(newBook);
    DisplayController.displayBooks();
    form.reset();
    dialog.close();
  }

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");

  function setCustomError(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(`${e.target.name} field must be filled!`);
    } else {
      e.target.setCustomValidity("");
    }
  }

  addBookBtn.addEventListener("click", clickHandlerAddBtn);
  container.addEventListener("click", clickHandlerContainer);
  closeBtn.addEventListener("click", clickHandlerCloseBtn);
  form.addEventListener("submit", clickHandlerSubmitBtn);
  titleInput.addEventListener("invalid", setCustomError);
  authorInput.addEventListener("invalid", setCustomError);
  pagesInput.addEventListener("invalid", setCustomError);

  return { displayBooks };
})();
