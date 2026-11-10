import { useEffect, useState } from "react";
import { obtenerProductos, type Producto } from "../services/productoService";


export const ProductoLista=()=>{
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

    return (
    <div className="panel lista">
        <header className="lista__cabecera">
            <h2>Inventario</h2>
            <span className="contador">{productos.length} registros</span>
        </header>

        {productos.length === 0 ? (
            <p className="vacio">No existen productos que mostrar</p>
        ) : (
            <ul className="tarjetas">
                {productos.map((producto) => (
                    <li className="tarjeta" key={producto.id}>
                        <span className="tarjeta__id">{producto.id.slice(0, 8)}</span>
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
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}