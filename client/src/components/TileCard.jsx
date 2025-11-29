import React from 'react';

export default function TileCard({ tile }) {
  return (
    <div className="card transform transition hover:scale-105">
      <div className="h-48 w-full bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {tile.imageUrl ? <img src={tile.imageUrl} alt={tile.name} className="h-full object-cover"/> : <div className="text-gray-400">No Image</div>}
      </div>
      <div className="mt-3">
        <h3 className="font-semibold">{tile.name}</h3>
        <p className="text-sm">{tile.brand} • {tile.size} • {tile.surface}</p>
        <p className="mt-2 font-bold">₹{tile.price}</p>
      </div>
    </div>
  )
}
