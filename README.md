# Book Catalogue Application

This application displays a list of books fetched from a backend server. Each book contains information such as the book's name, author, image URL, ISBN, and release date. You can also add/delete books to/from the catalogue.

## Live Demo

[Click here to see the live demo!](https://resonant-begonia-262c93.netlify.app/)

### Installation

1. Clone the repository

2. Install dependencies

3. Create an .env file in the root directory of server. Inside this file, you'll include your PostgreSQL connection settings. Here is an example:

```
DB_HOST=your_server
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=5432
```

4. **Create a table in your PostgreSQL database** using the following SQL command:

```sql
CREATE TABLE posts (
id SERIAL PRIMARY KEY,
name VARCHAR(255),
band VARCHAR(255),
record VARCHAR(17),
rating NUMBER,
);
```

5. Start the backend & frontend server: npm run dev
