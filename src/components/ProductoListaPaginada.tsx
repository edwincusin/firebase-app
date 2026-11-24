import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { obtenerProductosPaginados, type Producto } from "../services/productoService";
import { useState } from "react";


export const ProductoListaPaginados = () => {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [ultimodocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData>>();

    const cargarPrimerPagina = async () => {
        const resultado = await obtenerProductosPaginados();

        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimodocumento);

    }


    const siguientePagina = async () => {
        if (!ultimodocumento) return;

        const resultado = await obtenerProductosPaginados(ultimodocumento);

        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimodocumento)
    }
    return (
        <div className="panel lista paginacion">

            {/* ===== CABECERA: título, contador y carga inicial ===== */}
            <header className="lista__cabecera">
                <h2>Productos paginados</h2>
                <span className="contador">{productos.length} cargados</span>
                <button type="button" className="boton boton--secundario" onClick={cargarPrimerPagina}>
                    Cargar productos
                </button>
            </header>

            {/* ===== TARJETAS ===== */}
            {productos.length === 0 ? (
                <p className="vacio">Aún no hay productos. Pulsa “Cargar productos”.</p>
            ) : (
                <ul className="tarjetas">
                    {productos.map((producto) => (
                        <li className="tarjeta" key={producto.id}>
                            <h3 className="tarjeta__nombre">{producto.nombre}</h3>
                            <span className="tarjeta__categoria">{producto.categoria || "Sin categoría"}</span>
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

            {/* ===== PIE: un solo botón para toda la lista ===== */}
            <footer className="paginacion__pie">
                <span className="paginacion__estado">Mostrando {productos.length} productos</span>
                <button type="button" className="boton" onClick={siguientePagina} disabled={!ultimodocumento}>
                    Siguiente página
                </button>
            </footer>
        </div>
    )

}