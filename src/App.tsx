import ProductoForm from "./components/ProductoForm"
import { ProductoLista } from "./components/ProductoLista"
import { useState } from "react"
import { obtenerProductosDisponibles, type Producto } from "./services/productoService"
import { ProductoListaPaginados } from "./components/ProductoListaPaginada";

function App() {

  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

  return (
    <>
       <div className="pagina">
        <ProductoForm
          key={productoEditar?.id ?? "Nuevo"}
          productoEditar={productoEditar}
          onGuardado={()=>{
            setProductoEditar(null);
          }}
        />
        <ProductoLista onEditar={setProductoEditar} />


        <ProductoListaPaginados/>

      </div> 

    <button onClick={async()=>{
      const productosDeConsulta=await obtenerProductosDisponibles();
      console.log(productosDeConsulta);
    }
    }>CONSULTA</button>


    </>
  )
}

export default App
