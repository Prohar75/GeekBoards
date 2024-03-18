import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductsPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    data.set("photos", files);
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center font-bold">
          <Link
            className="inline-flex gap-2 bg-primary text-white py-2 pl-2 pr-6 rounded-full"
            to={"/account/bookings/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            add new
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="w-full">
          <form className="m-auto max-w-2xl">
            <h2 className="text-xl">Title</h2>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <h2 className="text-xl">Description</h2>
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <h2 className="text-xl mt-4">Photos</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"add using a link ...jpg"}
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 grow px-4 rounded-xl"
              >
                Grab&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lggrid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="">
                    <img
                      className="rounded-2xl h-48 w-96"
                      src={"http://localhost:4000/uploads/" + link}
                      alt=""
                    />
                  </div>
                ))}
              <label className="cursor-pointer flex items-center border bg-transparent rounded-2xl py-2 justify-center gap-2">
                <input type="file" className="hidden" onChange={uploadPhoto} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
