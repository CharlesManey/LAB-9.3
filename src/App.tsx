
import Dashboard from "./components/Dashboard";




function App() {


  return (
    <div className="flex justify-around">
      <div className="flex flex-col max-w-full">
        <h1 className="text-2xl text-center">SBA 9: React Dashboard Application</h1>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;