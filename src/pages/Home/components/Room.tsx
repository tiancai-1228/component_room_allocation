import React, { useState, useEffect } from 'react';
import { CustomInputNumber } from '../../../components';

export interface roomItem {
  adult: number;
  child: number;
}

interface userTypes_I {
  label: string;
  hint: string | null;
  min: number;
  max: number;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Prop {
  roomData: roomItem;
  unAllocationUser: number;
  onChange: (val: roomItem) => void;
}

const Room = ({ roomData, unAllocationUser, onChange }: Prop) => {
  const [roomItem, setRoomItem] = useState<roomItem>(roomData);
  const roomSize = 4;

  const userTypes: userTypes_I[] = [
    {
      label: '大人',
      hint: '年齡20+',
      min: 1,
      max: unAllocationUser == 0 ? roomItem.adult : roomSize - roomItem.child,
      name: 'adult',
      value: roomItem.adult,
      onChange: (e) => {
        setRoomItem((pre) => ({ ...pre, adult: parseInt(e.target.value) }));
      }
    },
    {
      label: '小孩',
      hint: null,
      min: 0,
      max: unAllocationUser == 0 ? roomItem.child : roomSize - roomItem.adult,
      name: 'child',
      value: roomItem.child,
      onChange: (e) => {
        setRoomItem((pre) => ({ ...pre, child: parseInt(e.target.value) }));
      }
    }
  ];

  useEffect(() => {
    onChange(roomItem);
  }, [roomItem]);

  return (
    <div className="room">
      <div className="title">
        <p>{`房間 : ${roomItem.adult + roomItem.child} 人`}</p>
      </div>

      {userTypes.map((type) => (
        <div className="roomItem" key={type.name}>
          <div>
            <p className="label">{type.label}</p>
            {type.hint && <p className="hint">{type.hint}</p>}
          </div>
          <CustomInputNumber
            min={type.min}
            max={type.max}
            name={type.name}
            value={type.value}
            onChange={type.onChange}
            step={1}
            disabled={false}
            onBlur={() => {}}
          />
        </div>
      ))}
    </div>
  );
};

export default Room;
