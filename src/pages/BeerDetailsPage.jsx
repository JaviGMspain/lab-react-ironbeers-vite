import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BeerDetailsPage() {
  const { beerId } = useParams();
  const [beer, setBeer] = useState(null);

  useEffect(() => {
    fetch(`https://ih-beers-api2.herokuapp.com/beers/${beerId}`)
      .then(response => response.json())
      .then(data => setBeer(data))
      .catch(error => console.error(error));
  }, [beerId]);

  if (!beer) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <img src={beer.image_url} alt={beer.name} className="h-80 mx-auto" />
      <h1 className="text-3xl font-bold">{beer.name}</h1>
      <p className="text-lg text-gray-500">{beer.tagline}</p>
      <p><strong>First Brewed:</strong> {beer.first_brewed}</p>
      <p className='text-gray-500'> {beer.attenuation_level}</p>
      <p>{beer.description}</p>
      <p className='text-gray-500'>Created by: {beer.contributed_by}</p>
    </div>
  );
}

export default BeerDetailsPage;
