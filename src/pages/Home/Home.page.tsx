import React from 'react';
import RoomAllocation from './components/RoomAllocation';

const HomePage = () => {
  return (
    <div className="home">
      <RoomAllocation guest={20} room={6} onChange={(result) => console.log(result)} />
    </div>
  );
};

export default HomePage;
