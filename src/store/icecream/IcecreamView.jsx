import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const numberOfIcecream = useSelector(
    (state) => state.icecream.numberOfIcecreams
  );

  return (
    <div>
      <h2>Number of icecreams - {numberOfIcecream}</h2>
      <button onClick={() => dispatch(ordered())}>Order icecream</button>
      <br />
      <input
        value={value}
        type="number"
        onChange={(event) => setValue(parseInt(event.target.value))}
      />
      <br />
      <button onClick={() => dispatch(restocked(value))}>
        ReStock icecream
      </button>
    </div>
  );
};
