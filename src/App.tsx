import { RouterProvider } from "react-router-dom";
import { router } from "./components/routing/navigation";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
