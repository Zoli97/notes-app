import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

//endpoints
//take these controllers and put under a specific file

//get a single note by id
router.get("/:id", getSingleNote);
//get all notes
router.get("/", getAllNotes);
//create a note
router.post("/", createNote);

//update a note by id
router.put("/:id", updateNote);

//delete a note by id
router.delete("/:id", deleteNote);

export default router;
