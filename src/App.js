import { CakeView } from "./store/cake/CakeView";
import { IcecreamView } from "./store/icecream/IcecreamView";
import { UserView } from "./store/user/UserView";

function App() {
  return (
    <div className="App">
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  );
}

export default App;
