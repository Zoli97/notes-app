import React from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header
      className=" border-b border-base-content/10"
      style={{ backgroundColor: "#242424" }}
    >
      <div className="mx-auto max-w-6xl p-4">
        {/**the left & right hand sides */}
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight cursor-pointer">
              NotesBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary ">
              <PlusIcon className="size-5" />
              <span>Create Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
