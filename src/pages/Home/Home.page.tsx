import React from 'react';
import RoomAllocation from './components/RoomAllocation';

const HomePage = () => {
  return (
    <div className="home">
      <RoomAllocation guest={10} room={3} onChange={(result) => console.log(result)} />
    </div>
  );
};

export default HomePage;
