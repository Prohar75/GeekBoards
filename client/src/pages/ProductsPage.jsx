import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav places={places} setPlaces={setPlaces}></AccountNav>
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
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/account/bookings/"+place._id} className=" flex bg-gray-100 rounded-2xl p-4 gap-4">
              <div className="w-32 h-32 bg-gray-200 rounded-xl">
                {place.photos.length && (
                <img className="rounded-xl w-full h-full object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} atl="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
