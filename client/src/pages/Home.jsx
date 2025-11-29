import React, { useEffect, useState } from 'react';
import { fetchTiles } from '../api/tiles';
import TileCard from '../components/TileCard';

export default function Home(){
  const [tiles, setTiles] = useState([]);
  const [q, setQ] = useState('');

  const load = async (search='') => {
    try {
      const res = await fetchTiles(search);
      setTiles(res.data);
    } catch (err) { console.error(err) }
  };

  useEffect(()=> { load(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    load(q);
  };

  return (
    <div>
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Our Tiles</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or brand" className="px-3 py-2 border rounded"/>
            <button className="px-3 py-2 bg-blue-600 text-white rounded">Search</button>
          </form>
        </div>
        <p className="mt-3 text-sm text-gray-600">Scroll down to see tiles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tiles.map(t => <TileCard key={t._id} tile={t} />)}
      </div>
    </div>
  )
}
