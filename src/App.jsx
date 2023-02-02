import GoogleAutoComplete from "./components/GoogleAutoComplete.jsx";
import "./App.css";

function App() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-bold">Google Auto Complete</p>
        <GoogleAutoComplete />
      </div>
      <div></div>
    </div>
  );
}

export default App;
