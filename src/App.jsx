import { useState } from "react";
import axios from "axios";

function App() {
  
  const [photo, setPhoto] = useState({ id: "", title: "", url: "" });

  const fetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/photos/1")
      .then((res) => {
        setPhoto(res.data);
      })
  };

  return (
    <div>
      <button onClick={fetchData}>fetch data</button>

      <p>{photo.id}</p>
      <p>{photo.title}</p>
      <p>{photo.url}</p>
    </div>
  );
}

export default App;
