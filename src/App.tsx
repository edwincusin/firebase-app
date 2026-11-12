import ProductoForm from "./components/ProductoForm"
import { ProductoLista } from "./components/ProductoLista"
import { useState } from "react"
import type { Producto } from "./services/productoService"

function App() {

  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [recarga, setRecarga] = useState(0);

  return (
    <>
      <div className="pagina">
        <ProductoForm
          key={productoEditar?.id ?? "Nuevo"}
          productoEditar={productoEditar}
          onGuardado={()=>{
            setProductoEditar(null);
            setRecarga((n)=>n+1);
          }}
        />
        <ProductoLista onEditar={setProductoEditar} />
      </div>

    </>
  )
}

export default App
