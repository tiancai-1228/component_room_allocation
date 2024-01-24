import React, { useState, useRef, ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
}

enum EventTypeEnum {
  increase,
  decrease
}

const CustomInputNumber = ({ value, step, disabled, name, max, min, onChange, onBlur }: Props) => {
  const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setNativeInput = (value: number) => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(
      inputRef.current,
      value
    );
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const handleButtonClick = (EventType: EventTypeEnum): void => {
    if (disabled) return;
    const count = parseInt(inputRef.current?.value || '0');

    switch (EventType) {
      case EventTypeEnum.increase:
        if (count >= max) return;
        setNativeInput(Math.min(Number(count) + Number(step), max));
        break;

      case EventTypeEnum.decrease:
        if (count <= min) return;
        setNativeInput(Math.max(Number(count) - Number(step), min));
        break;

      default:
        break;
    }
  };

  const handleButtonMouseDown = (EventType: EventTypeEnum): void => {
    handleButtonClick(EventType);
    const timeout = setInterval(() => handleButtonClick(EventType), 200);
    setIntervalTimeout(timeout);
  };

  const handleButtonMouseUp = (): void => {
    inputRef.current.focus();
    clearInterval(intervalTimeout!);
    inputRef.current.blur();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target?.value || '0');
    const newNum = count > max ? max : count < min ? min : count;
    setNativeInput(newNum);
    onChange?.(e);
  };

  return (
    <div className="customInputNumber" key={name}>
      <button
        type="button"
        onMouseDown={() => handleButtonMouseDown(EventTypeEnum.decrease)}
        onMouseUp={handleButtonMouseUp}
        onTouchStart={() => handleButtonMouseDown(EventTypeEnum.decrease)}
        onTouchEnd={handleButtonMouseUp}
        className={`box subtraction  ${(disabled || parseInt(inputRef.current?.value || '0') == min) && 'disabled'}`}
      />
      <input
        ref={inputRef}
        type="number"
        value={value}
        max={max}
        min={min}
        name={name}
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleOnChange}
      />
      <button
        type="button"
        onMouseDown={() => handleButtonMouseDown(EventTypeEnum.increase)}
        onMouseUp={handleButtonMouseUp}
        onTouchStart={() => handleButtonMouseDown(EventTypeEnum.increase)}
        onTouchEnd={handleButtonMouseUp}
        className={`box plus ${(disabled || parseInt(inputRef.current?.value || '0') == max) && 'disabled'}`}
      />
    </div>
  );
};

export default CustomInputNumber;
