import {
  getBooksQuery,
} from './queries';

const addBookCache = (cache, { data: { addBook } }) => {
  const { books } = cache.readQuery({ query: getBooksQuery });
  cache.writeQuery({
    query: getBooksQuery,
    data: {
      books: books.concat(addBook),
    },
  });
};

const removeBookCache = (cache, { data: { removeBook } }) => {
  const { books } = cache.readQuery({ query: getBooksQuery });
  cache.writeQuery({
    query: getBooksQuery,
    data: {
      books: books.filter(book => book.id !== removeBook.id),
    },
  });
};

export { addBookCache, removeBookCache };
