import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

const app = express();
const port = process.env.PORT || 2000;
const __dirname = path.resolve();

//middleware
//if i got a req to this url it will hit the notesRoutes.js file, prefix

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json()); //allows me to get access to the req body the values taht i send as json (when send a post req) - will parse ajson bodies.
app.use(rateLimiter); //will check from the rate limiting

//custom middleware
app.use((req, resp, next) => {
  console.log(`Request method is: ${req.method} & Request url is: ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  //middleware that come from express, i will put a path for client dist folder, serve my optimized react app like static asset.
  app.use(express.static(path.join(__dirname, "../client/dist")));

  //other then the normal route would i like to server my react app.
  //to this only if i'm on the prod like render.com
  app.get(/.*/, (req, resp) => {
    resp.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => console.log(` Server listening on PORT ${port} !`));
});
