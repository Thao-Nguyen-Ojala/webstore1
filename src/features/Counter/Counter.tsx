import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './counterSlice';

interface RootState {
  count: { value: number };
}

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count.value);

  const handleDecreaseClick = () => {
    const action = decrement();
    dispatch(action);
  };
  const handleIncreaseClick = () => {
    const action = increment();
    dispatch(action);
  };
  return (
    <div>
      <div>
        <button onClick={handleDecreaseClick}>Decrease</button>
      </div>
      Counter: {count}
      <div>
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
}
