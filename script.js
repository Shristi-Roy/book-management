document.addEventListener('DOMContentLoaded', () => {
            const bookForm = document.getElementById('book-form');
            const bookList = document.getElementById('book-list');
            const searchInput = document.getElementById('search');
            let books = JSON.parse(localStorage.getItem('books')) || [];

            const renderBooks = () => {
                bookList.innerHTML = '';
                books.forEach((book, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span><strong>${book.title}</strong> by ${book.author} (${book.year})</span>
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>
                    `;
                    bookList.appendChild(li);
                });
            };

            const addBook = (e) => {
                e.preventDefault();
                const title = bookForm.title.value.trim();
                const author = bookForm.author.value.trim();
                const year = bookForm.year.value.trim();

                if (title && author && year) {
                    books.push({ title, author, year });
                    localStorage.setItem('books', JSON.stringify(books));
                    bookForm.reset();
                    renderBooks();
                }
            };

            const editBook = (index) => {
                const book = books[index];
                bookForm.title.value = book.title;
                bookForm.author.value = book.author;
                bookForm.year.value = book.year;

                // Remove the book temporarily from the list
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            };

            const deleteBook = (index) => {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            };

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredBooks = books.filter(
                    (book) =>
                        book.title.toLowerCase().includes(searchTerm) ||
                        book.author.toLowerCase().includes(searchTerm)
                );
                bookList.innerHTML = '';
                filteredBooks.forEach((book, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span><strong>${book.title}</strong> by ${book.author} (${book.year})</span>
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>
                    `;
                    bookList.appendChild(li);
                });
            });

            bookForm.addEventListener('submit', addBook);
            renderBooks();
        });

        window.deleteBook = function (index) {
            const books = JSON.parse(localStorage.getItem('books')) || [];
            books.splice(index, 1);
            localStorage.setItem('books', JSON.stringify(books));
            location.reload();
        };

        window.editBook = function (index) {
            const books = JSON.parse(localStorage.getItem('books')) || [];
            const book = books[index];
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('year').value = book.year;

            books.splice(index, 1);
            localStorage.setItem('books', JSON.stringify(books));
            document.querySelector('form').addEventListener('submit', () => {
                location.reload();
            });
        };