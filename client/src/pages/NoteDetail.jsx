import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import axiosInstance from "../lib/axios";
import Navbar from "../components/Navbar";

//content
const NoteDetail = () => {
  //fetch the actual note, whenever the id changes o would like to run once.
  //initially null once it has been fetched the state will be updated
  //already have access to id from the URL
  const [note, setNote] = useState(null);

  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const resp = await axiosInstance.get(`/notes/${id}`);
        setNote(resp.data);
      } catch (error) {
        console.log("Error in fetching !", error);
        toast.error("Failed to fetch the note !");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const deleteNote = async () => {
    if (!window.confirm("re you sure you want to delete this note? ")) return;

    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note Deleted !");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note: ", error);
      toast.error("Failed to delete note !");
    }
  };

  //update
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content !");
      return;
    }
    setUpdate(true);

    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("Note updated successfully !");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note: ", error);
      toast.error("Failed to update the note !");
    } finally {
      setUpdate(false);
    }
  };
  console.log({ note });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-20" />
      </div>
    );
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#141414" }}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" /> Back to Notes
            </Link>

            <button onClick={deleteNote} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" /> Delete Note
            </button>
          </div>
          <div className="card " style={{ backgroundColor: "#242424" }}>
            <div className="card-body  ">
              <form action="">
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    style={{ backgroundColor: "#141414" }}
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    name=""
                    placeholder="Write your note here..."
                    id=""
                    className="textarea textarea-bordered h-32"
                    style={{ backgroundColor: "#141414" }}
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={update}
                    onClick={handleSave}
                  >
                    {update ? "Update..." : "Update Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
