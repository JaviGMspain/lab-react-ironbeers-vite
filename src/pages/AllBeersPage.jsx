import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllBeersPage() {
  const [beers, setBeers] = useState([]);
  const [searchBeer, setSearchBeer] = useState("");

  useEffect(() => {
    fetch(`https://ih-beers-api2.herokuapp.com/beers${searchBeer ? `/search?q=${searchBeer}` : ""}`)
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
      })
      .catch((error) => console.error(error));
  }, [searchBeer]);

  const handleSearch = (event) => {
    setSearchBeer(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todas las Cervezas</h1>
      <input
        type="text"
        placeholder="Buscar cerveza..."
        value={searchBeer}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beers.map((beer) => (
          <NavLink to={`/beers/${beer._id}`} key={beer._id} className="border p-4 rounded shadow hover:bg-gray-50">
            <img src={beer.image_url} alt={beer.name} className="h-40 mx-auto" />
            <h2 className="text-xl font-semibold">{beer.name}</h2>
            <p className="text-gray-500">{beer.tagline}</p>
            <p><strong>Created by:</strong> {beer.contributed_by}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AllBeersPage;
