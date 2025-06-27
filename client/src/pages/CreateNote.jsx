import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { Link, useNavigate } from "react-router";

const CreateNote = () => {
  //track the inputs taht user puts in
  //once submit the form the loading will be true.
  //the button will be disabled on laoding state
  //send a request
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //once i submit the form i would like to run the fun
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, content);

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required !");
      return;
    }

    //if provide some values
    setLoading(true);

    try {
      //send  a request with some body
      await axiosInstance.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully !");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      if (error.response.status === 429) {
        toast.error("Slow down ! You are creating notes too fast !", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Error creating notes !");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Notes
          </Link>

          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
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

export default CreateNote;
