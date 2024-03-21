import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductsFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {      
      const { data } = response;
      setTitle(data.title);
      setDescription(data.description);
      setAddedPhotos(data.photos);
    });
  }, [id]);
  
  async function saveProduct(ev) {
    ev.preventDefault();
    const productData = { title, description, addedPhotos };
    if(id){
      await axios.put("/places", {...productData, id});
    }
    else{
      await axios.post("/places", productData);
    }
    setRedirect(true);
  }
  
  async function deleteProduct(ev){
    ev.preventDefault();
    await axios.delete("/places/" + id, {});
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div className="w-full">
      <AccountNav />
      <form className="m-auto max-w-2xl" >
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
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <button className="primary mt-3" onClick={saveProduct}>Save</button>
        {id && (
            <>
                <div className="w-full h-1 bg-gray-300 mt-5 mb-5 rounded-full"></div>
                <button className="primary-del" onClick={deleteProduct}>delete</button>
            </>
        )}
      </form>
    </div>
  );
}
