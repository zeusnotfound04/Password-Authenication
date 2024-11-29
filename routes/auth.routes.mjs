import { verifySignUp } from "../middlewares/verifySignup.mjs";
import controller from "../controllers/auth.controller.mjs";

export default function (app) {
  // CORS Middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Signup Route with validation middleware
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    (req, res) => {
      // Call the signup controller, but render the response with a message
      controller.signup(req, res);
    }
  );

  // Signin Route
  app.post("/api/auth/signin", (req, res) => {
    // Call the signin controller and render a success or error message based on result
    controller.signin(req, res);
  });

  // Route for rendering the signup page
  app.get("/signup", (req, res) => {
    res.render("register", { message: "" });  // Render the register page
  });

  // Route for rendering the signin page
  app.get("/signin", (req, res) => {
    res.render("login", { message: "" });  // Render the login page
  });

  // Route for handling successful sign up (redirect to login)
  app.get("/signup-success", (req, res) => {
    res.render("signup-success", { message: "Registration successful! Please login." });
  });

  // Route for handling login
  app.get("/login", (req, res) => {
    res.render("login", { message: "" });  // Render login page
  });
}
