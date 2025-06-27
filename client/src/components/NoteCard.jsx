import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formateDate } from "../lib/utils";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
// grab the note from the props.
const NoteCard = ({ note, setNotes }) => {
  const deleteNote = async (e, id) => {
    //send a req to the api
    //update this state get all rpev notes but just filter out the one that i have deleted.
    e.preventDefault(); //no navigation behavior

    if (!window.confirm("Are you sure you want to delete this note ?")) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid the deleted one
      toast.success("Note deleted successfully !");
    } catch (error) {
      console.log("Error in handle delete ", error);
      toast.error("Failed to delete the note !");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card p-4 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] "
      style={{ backgroundColor: "#242424" }}
    >
      <div className="card-body ">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formateDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-5" />{" "}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => deleteNote(e, note._id)}
            >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
