import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment ,reset,incrementByAmount} from "./counterSlice";

const counter = () => {
  const count = useSelector((state) => state.counter.count);

  const [addmt, setAddmt] = useState(0);

  const value =Number(addmt)||0

  const dispatch = useDispatch();

  const zero =()=>{
    setAddmt(0)
    dispatch(reset())
  }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>

        <div>
          <input
            value={addmt}
            onChange={(e) => {
              setAddmt(e.target.value);
            }}
          />
          <div>
            <button onClick={()=>{dispatch(incrementByAmount(value))}}>add amt</button>
          </div>
        </div>
      </div>
      <div onClick={zero}>reset</div>
    </section>
  );
};

export default counter;
