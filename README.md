# 🌍 Family Travel Tracker

A simple and interactive multi-user travel tracking application built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**.  
Easily track which countries each family member has visited — clean UI, dynamic validation, and real-time updates.

---

## ✨ Features

- 👨‍👩‍👧 **Multiple Family Members** – Add and switch between different users.  
- 🌐 **Visited Country Tracking** – Stores each user’s visited countries in PostgreSQL.  
- 🔎 **Smart Country Search** – Partial name matching (e.g., “turk” → “Turkey”), case-insensitive.  
- 🚫 **Duplicate Prevention** – Prevents adding the same country twice for the same user.  
- 🎨 **Dynamic UI Coloring** – Each family member displayed with their unique color.  
- ⚡ **Real-time Rendering** – Updated travel list appears instantly after adding a country.  
- 🗂 **Clean Modular Backend** – Organized helper functions and database access logic.

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express |
| Template Engine | EJS |
| Database | PostgreSQL |
| Styling | CSS |
| Other | pg, body-parser |

---

## 📁 Project Structure

```
family-travel-tracker/
│
├── views/
│   ├── index.ejs
│   └── new.ejs
│
├── public/
│   └── styles.css
│
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/username/family-travel-tracker.git
cd family-travel-tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create PostgreSQL tables

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  color VARCHAR(50)
);

CREATE TABLE visited_with_family(
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(5),
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE countrylist(
  country_code VARCHAR(5),
  country_name VARCHAR(100)
);
```

### 4️⃣ Configure database connection

Update `index.js`:

```js
const db = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'your_password',
  database: 'family_travel'
});
```

### 5️⃣ Start the app

```bash
npm start
```

Application runs on:

```
http://localhost:3000
```

---

## 🔥 How It Works

### ➤ Adding a country
1. User enters the name of a country  
2. Backend performs a case-insensitive search  
3. Checks if the user has already visited the country  
4. If not, inserts into PostgreSQL  
5. UI updates instantly

### ➤ Switching users
Select a user → their personal travel history loads instantly.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Arzu Guliyev**  
GitHub: https://github.com/arzuguuliyev-tech
