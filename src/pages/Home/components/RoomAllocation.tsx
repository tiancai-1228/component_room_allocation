import React, { useEffect, useState } from 'react';
import Room, { roomItem } from './Room';

interface Prop {
  guest: number;
  room: number;
  onChange: (result: roomItem[]) => void;
}

const initroom = { adult: 1, child: 0 };

const RoomAllocation = ({ guest, room, onChange }: Prop) => {
  const [rooms, setRooms] = useState<roomItem[]>(new Array(room).fill(initroom));
  const unAllocationUser = rooms.reduce((pre, cur) => {
    return pre - (cur.adult + cur.child);
  }, guest);

  const handleChange = (room: roomItem, index: number) => {
    setRooms((pre) => {
      const newRoom = [...pre];
      newRoom[index] = room;
      return newRoom;
    });
  };

  useEffect(() => {
    onChange(rooms);
  }, [rooms]);

  return (
    <div className="roomAllocation">
      <h3>{`住客人數 : ${guest}人 / ${room}房`}</h3>

      <div className="info">{`尚未分配人數 : ${unAllocationUser}人`}</div>

      {rooms.map((room, i) => {
        return (
          <Room
            key={i}
            roomData={room}
            unAllocationUser={unAllocationUser}
            onChange={(val) => {
              handleChange(val, i);
            }}
          />
        );
      })}
    </div>
  );
};

export default RoomAllocation;
