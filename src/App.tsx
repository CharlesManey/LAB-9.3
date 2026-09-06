
import Dashboard from "./components/Dashboard";




function App() {


  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl text-center">SBA 9: React Dashboard Application</h1>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;