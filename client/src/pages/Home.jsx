import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import axiosInstance from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";
const Home = () => {
  //create the state for ui error visibility, default is false.
  //fetch the notes and track the loading (as soon i visited the home page i will try to fetch the notes)
  //update the notes state.
  //finally- so either fetch succssfully or i got 429 error, in either case finally laoding state = false
  const [isRateLimitedUI, setRateLimitedUI] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await axiosInstance.get("/notes");
        console.log(resp.data);
        setNotes(resp.data);
        setRateLimitedUI(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setRateLimitedUI(true);
        } else {
          toast.error("Failed to load notes !");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  {
    /**dispaly the notes, if i am in the loading state render a loading comp.
     * once i fetched the notes
     * breakpoints in taliwind css
     * for every single note return the note card component
     */
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#141414" }}>
      <Navbar />
      {isRateLimitedUI && <RateLimitedUI />}

      {!loading && notes.length === 0 && !isRateLimitedUI && <NotesNotFound />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length > 0 && !isRateLimitedUI && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
