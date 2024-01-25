import React from 'react';
import { CustomInputNumber } from '../../../components';

export interface roomData {
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
  roomData: roomData;
  unAllocationUser: number;
  onChange: (val: roomData) => void;
}

const Room = ({ roomData, unAllocationUser, onChange }: Prop) => {
  const roomSize = 4;

  const getMaxSize = (curr: number, other: number) => {
    if (unAllocationUser == 0) return curr;
    const currMax = roomSize - other;
    if (currMax > unAllocationUser) {
      unAllocationUser + curr > roomSize ? roomSize : unAllocationUser + curr;
    }
    return currMax;
  };

  const userTypes: userTypes_I[] = [
    {
      label: '大人',
      hint: '年齡20+',
      min: 1,
      max: getMaxSize(roomData.adult, roomData.child),
      name: 'adult',
      value: roomData.adult,
      onChange: (e) => {
        onChange({ ...roomData, adult: parseInt(e.target.value) });
      }
    },
    {
      label: '小孩',
      hint: null,
      min: 0,
      max: getMaxSize(roomData.child, roomData.adult),
      name: 'child',
      value: roomData.child,
      onChange: (e) => {
        onChange({ ...roomData, child: parseInt(e.target.value) });
      }
    }
  ];

  return (
    <div className="room">
      <div className="title">
        <p>{`房間 : ${roomData.adult + roomData.child} 人`}</p>
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
