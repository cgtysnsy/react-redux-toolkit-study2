import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./userSlice";

export const UserView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>All users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Errors: {user.error}</div> : null}
      {!user.loading && user.users.length > 0 ? (
        <ul>
          {user.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
