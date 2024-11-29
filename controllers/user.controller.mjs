export const allAccess = (req, res) => {
  res.render("all", {
    message: "Public Content",
  });
};

export const userBoard = (req, res) => {
  const user = req.user; // The authenticated user data
  res.render("user", {
    user: user, // Passing the user data to the EJS view
    message: "Welcome to the User Dashboard",
  });
};

export const adminBoard = (req, res) => {
  const user = req.user; // The authenticated user data
  res.render("admin", {
    user: user, // Passing the user data to the EJS view
    message: "Welcome to the Admin Dashboard",
  });
};

export const moderatorBoard = (req, res) => {
  const user = req.user; // The authenticated user data
  res.render("moderator", {
    user: user, // Passing the user data to the EJS view
    message: "Welcome to the Moderator Dashboard",
  });
};

const controller = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
};

export default controller;
