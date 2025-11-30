import React, { useEffect, useState } from 'react';
import { fetchTiles } from '../api/tiles';
import TileCard from '../components/TileCard';

export default function Home(){
  const [tiles, setTiles] = useState([]);  

  const load = async (search='') => {
    try {
      const res = await fetchTiles(search);
      setTiles(res.data);
    } catch (err) { console.error(err) }
  };  

  useEffect(()=> { load(); }, []);

  return (
    <div>
      {/* Hero section */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 flex flex-col items-center text-center gap-4 hero-cta">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">Beautiful Tiles For Every Space</h1>
          <p className="mt-2 text-gray-600">Browse a curated selection of premium tiles — quality, style and durability combined.</p>
          <div className="mt-6">
            <a href="#tiles-grid" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Shop Tiles
            </a>
          </div>
        </div>
      </div>

      {/* Tiles Grid */}
      <div id="tiles-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {tiles.map(t => <TileCard key={t._id} tile={t} />)}
      </div>
    </div>
  )
}
