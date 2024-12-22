function App() {
  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch("/api/v1");
          const data = await response.text();
          console.log(data);
        }}
      >
        On click
      </button>
    </div>
  );
}

export default App;
