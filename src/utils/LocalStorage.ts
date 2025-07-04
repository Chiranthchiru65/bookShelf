import type { Book } from "../assets/dummyData/DummyData";

const STORAGE_KEY = "bookshelf-data";

export const addBook = (book: Book): boolean => {
  let isSuccess;
  try {
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    books = [...books, book];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    window.dispatchEvent(new CustomEvent("booksChanged"));
    isSuccess = true;
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }
  return isSuccess;
};

export const getBooks = (): Book[] => {
  let books = [];
  try {
    let storedBooks = localStorage.getItem(STORAGE_KEY);
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    }
  } catch (err) {
    console.log(err);
  }
  return books;
};

export const getBook = (id: string): Book | null => {
  try {
    const books = getBooks();
    return books.find((book) => book.id === id) || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteBook = (id: string): boolean => {
  let isSuccess = false;
  try {
    const books = getBooks();
    const filteredArray = books.filter((book) => book.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArray));
    window.dispatchEvent(new CustomEvent("booksChanged"));
    isSuccess = true;
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }
  return isSuccess;
};

export const updateBook = (id: string, updatedBook: Book): boolean => {
  let isSuccess = false;
  try {
    const books = getBooks();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
      books[bookIndex] = { ...updatedBook, id };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      window.dispatchEvent(new CustomEvent("booksChanged"));
      isSuccess = true;
    }
  } catch (err) {
    console.log(err);
    isSuccess = false;
  }
  return isSuccess;
};
