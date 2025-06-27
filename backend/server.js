import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const port = process.env.PORT || 2000;

//middleware
//if i got a req to this url it will hit the notesRoutes.js file, prefix
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); //allows me to get access to the req body the values taht i send as json (when send a post req) - will parse ajson bodies.
app.use(rateLimiter); //will check from the rate limiting

//custom middleware
app.use((req, resp, next) => {
  console.log(`Request method is: ${req.method} & Request url is: ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(port, () => console.log(` Server listening on PORT ${port} !`));
});
