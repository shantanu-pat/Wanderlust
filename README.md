
# 🌍 Wanderlust

**Wanderlust** is a full-stack travel listing web application built using **Node.js**, **Express**, **MongoDB**, and **EJS** templating. It allows users to explore, create, edit, and delete travel listings, along with submitting reviews for different locations.

---

## 🚀 Features

- 🏕️ Add, edit, and delete travel destination listings
- 📝 Leave reviews with rating and comments
- 🖼️ Image support for each listing
- 🌐 Server-side validation using Joi
- ⚙️ RESTful routing with method override
- 📦 Clean code with error handling middleware and async utilities

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Templating Engine:** EJS & EJS-Mate (Layouts)
- **Validation:** Joi
- **CSS Framework:** Bootstrap 5
- **Utilities:** method-override, express.static, dotenv

---

## 📁 Folder Structure

```

wanderlust/
├── models/
│   └── listing.js, review\.js
├── routes/
├── views/
│   ├── listings/
│   ├── partials/
│   └── layouts/
├── public/
│   └── CSS & JS
├── utils/
│   └── ExpressError.js, wrapAsync.js
├── schema.js
├── app.js
└── package.json

## ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/shantanu-pat/wanderlust.git

# Move into project directory
cd wanderlust

# Install dependencies
npm install

# Start MongoDB (if not already running)
mongod

# Run the app
node app.js
````

Then visit 👉 `http://localhost:8080` in your browser.

 🙋‍♂️ Author
~ Shantanu Patne

MERN Developer | Building real-world apps

📃 License

This project is open-sourced under the [MIT License](LICENSE).


