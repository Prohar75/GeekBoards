import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places-index").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <>
      <div className="mt-4">
        <div className="grid grid-cols-3 md:grid-cols-4 w-7/12 m-auto">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/account/bookings/"+place._id} className="bg-transparent border-solid border-4 border-gray-200 rounded-2xl p-4 gap-4 m-4 max-w-44">
              <div className="w-32 min-w-32 h-32 bg-gray-200 rounded-xl">
                {place.photos.length && (
                <img className="rounded-xl w-full h-full object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} atl="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
