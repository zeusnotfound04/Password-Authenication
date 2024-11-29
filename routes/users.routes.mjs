import authJwt from "../middlewares/index.mjs";
import controller from "../controllers/user.controller.mjs";

console.log(controller); // Add this line to check the controller object

export default function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", (req, res) => {
    res.render("all", { message: "Public Content" });
  });

  const protectedRoutes = [
    {
      path: "/api/test/user",
      middleware: [authJwt.verifyToken],
      handler: controller.userBoard,
    },
    {
      path: "/api/test/mod",
      middleware: [authJwt.verifyToken, authJwt.isModerator],
      handler: controller.moderatorBoard,
    },
    {
      path: "/api/test/admin",
      middleware: [authJwt.verifyToken, authJwt.isAdmin],
      handler: controller.adminBoard,
    },
  ];

  // Explicitly spread middleware and handler
  protectedRoutes.forEach(route => {
    console.log(`Setting up route: ${route.path}`);
    console.log(`Handler: ${route.handler}`);
    if (typeof route.handler !== 'function') {
      console.error(`Error: Handler for route ${route.path} is not a function`);
    }
    app.get(route.path, ...route.middleware, (req, res) => {
      if (typeof route.handler === 'function') {
        route.handler(req, res);
      } else {
        res.status(500).send(`Handler for route ${route.path} is not a function`);
      }
    });
  });

  app.get("/logout", (req, res) => {
    req.logout(err => {
      if (err) return res.status(500).send("Logout error");
      res.redirect("/login");
    });
  });
}