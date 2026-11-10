import { useState, type SyntheticEvent } from "react"
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

function App() {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "productos"),
        {
          nombre,
          precio: Number(precio),
          stock: Number(stock)
        });

      console.log("prodcuto creado", docRef.id);
      vaciarFormulario()
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }

  const vaciarFormulario = () => {
    setNombre("");
    setPrecio("");
    setStock("");
  }

  return (

    <div>
      <h1>REGISTRO DE PRODUCTOS</h1>
      <div>
        <form onSubmit={guardarProducto}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            placeholder="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            placeholder="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            placeholder="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button
            type="submit">Registrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
