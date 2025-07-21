async function fetchBooks() {
    // Mock API call
    const books = [
        { name: "JavaScript: The Good Parts", price: 25.99, available: true, category: "Programming" },
        { name: "Clean Code", price: 32.50, available: false, category: "Software Engineering" },
        { name: "The Pragmatic Programmer", price: 28.00, available: true, category: "Programming" },
        { name: "Design Patterns", price: 40.00, available: true, category: "Architecture" }
    ];
    renderBooks(books);
}
async function fetchBooksFromFirebase() {
    const response = await fetch('https://your-firebase-project.firebaseio.com/books.json');
    const data = await response.json();
    const books = Object.values(data);
    renderBooks(books);
}

function renderBooks(books) {
    const container = document.getElementById('books');
    container.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
                    <div class="book-info">
                        <div class="book-title">${book.name}</div>
                        <div class="book-category">${book.category}</div>
                        <div class="book-price">$${book.price.toFixed(2)}</div>
                    </div>
                    <div class="book-availability ${book.available ? 'available' : 'unavailable'}">
                        ${book.available ? 'Available' : 'Unavailable'}
                    </div>
                `;
        container.appendChild(card);
    });
}