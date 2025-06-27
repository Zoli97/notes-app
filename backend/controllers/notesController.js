import Note from "../models/Note.js";

/**
 * Notes Controller
 *
 * Defines controller functions to handle HTTP requests for notes:
 * - getAllNotes
 * - createNote
 * - updateNote
 * - deleteNote
 *
 * Each function is designed to be used as an Express route handler.
 */

export const getAllNotes = async (_, resp) => {
  try {
    //fetch every single note
    const notes = await Note.find().sort({ createdAt: -1 }); //newest first
    resp.status(200).json(notes);
  } catch (error) {
    console.error("Error in get all notes controller ", error);
    resp.status(500).json({ message: "Internal server error !" });
  }
};

export const getSingleNote = async (req, resp) => {
  try {
    //get the id from URL and get that specifically
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return resp.status(404).json({ message: "Note not found !" });
    resp.json(note);
  } catch (error) {
    console.error("Error in getting a single note controller ", error);
    resp.status(500).json({ message: "Internal server error !" });
  }
};

export const createNote = async (req, resp) => {
  try {
    //get the value sfrom req body
    //create the note and save it to db
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    resp.status(201).send(savedNote);
    // console.log(title, content);
  } catch (error) {
    // console.error("Error in create Note controller ", error);
    resp.status(500).json({ message: "Internal server error !" });
  }
};

export const updateNote = async (req, resp) => {
  try {
    //get the id
    //get from the body the title and content
    //handle when the user introduce an id that not exist.
    //and i will send the updated note in resp
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return resp.status(404).json({ message: "Note not found !" });
    resp.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in update note controller ", error);
    resp.status(500).json({ message: "Internal server error !" });
  }
};

export const deleteNote = async (req, resp) => {
  //delete a note by id

  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return resp.status(404).json({ message: "Note not found !" });
    }
    resp.status(200).json({ message: "Note deleted successfully !" });
  } catch (error) {
    console.error("Error in delete note controller ", error);
    resp.status(500).json({ message: "Internal server error !" });
  }
};
