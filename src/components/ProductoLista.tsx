import { useEffect, useState } from "react";
import { obtenerProductos, eliminarProducto, type Producto } from "../services/productoService";


interface Props{
    onEditar:(producto:Producto)=>void;
};

export const ProductoLista=({onEditar}:Props)=>{
    const [productos, setProductos]=useState<Producto[]>([]);

    useEffect(()=>{
        const cargarProductos=async()=>{
            try {
                const datos=await obtenerProductos();
                setProductos(datos);
            } catch (error) {
                console.error("Error al obtener productos: ",error);
            }
        }
        cargarProductos();
    })

    const handleEliminar=async(id:string)=>{
        try {
            await eliminarProducto(id);
        } catch (error) {
            console.error("ERROR : ",error);
        }
    }

    return (
    <div className="panel lista">
        <header className="lista__cabecera">
            <h2>Lista productos</h2>
            <span className="contador">{productos.length} registros</span>
        </header>

        {productos.length === 0 ? (
            <p className="vacio">No existen productos que mostrar</p>
        ) : (
            <ul className="tarjetas">
                {productos.map((producto) => (
                    <li className="tarjeta" key={producto.id}>
                        <span className="tarjeta__id">{producto.id}</span>
                        <h3 className="tarjeta__nombre">{producto.nombre}</h3>
                        <dl className="tarjeta__datos">
                            <div>
                                <dt>Precio</dt>
                                <dd>${producto.precio.toFixed(2)}</dd>
                            </div>
                            <div>
                                <dt>Stock</dt>
                                <dd>{producto.stock}</dd>
                            </div>
                        </dl>
                        <dl>
                            <button type="button" onClick={()=>onEditar(producto)}>Editar</button>
                            <button type="button" onClick={()=>handleEliminar(producto.id)}>Eliminar</button>
                        </dl>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}