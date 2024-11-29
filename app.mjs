import express from "express";
import cors from "cors";
import path from "path";
import db from "./models/index.mjs";
// Routes for authentication and user actions
import authRoutes from "./routes/auth.routes.mjs";
import userRoutes from "./routes/users.routes.mjs";
import dbConfig from "./config/db.config.mjs";

const app = express();

// Enable CORS
const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for views (ejs pages)
app.set("views", path.join(path.resolve(), "app", "views"));

// Serve static files (CSS, JS, images) from the public folder
app.use(express.static(path.join(path.resolve(), "app", "public")));

const { role: Role } = db;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Routes for rendering EJS views
app.get("/", (req, res) => {
  res.render("welcome", { message: "Welcome to Zeus Tech" }); // render welcome page
});

app.get("/login", (req, res) => {
  res.render("login", { message: "Please login to continue" }); // render login page
});

app.get("/register", (req, res) => {
  res.render("register", { message: "Create a new account" }); // render register page
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { message: "Welcome to your Dashboard" }); // render dashboard page
});



authRoutes(app);
userRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initial roles setup
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
