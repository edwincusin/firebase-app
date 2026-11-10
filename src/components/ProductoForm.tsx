import { useState, type SyntheticEvent } from "react"
import { crearProducto } from "../services/productoService";


function ProductoForm() {

    type Errores = {
        nombre?: string;
        precio?: string;
        stock?: string;
    };

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [errores, setErrores] = useState<Errores>({});

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (guardando) return;      // si ya hay un guardado en curso, no hace nada
        if (!validarCampos()) return;
        setGuardando(true);         // marca que empezó a guardar

        try {

            const idCreado = await crearProducto(nombre, Number(precio), Number(stock));
            console.log("Producto creado con ID:", idCreado);
            limpiarFormulario();

        } catch (error) {
            console.error("ERROR: ", error)
        } finally {
            setGuardando(false); //se libera del bloqueo 
        }
    }

    const limpiarFormulario = () => {
        setNombre("");
        setPrecio("");
        setStock("");
        setErrores({});
    }

    const validarCampos = (): boolean => {
        const nuevosErrores: Errores = {};

        if (nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio";
        }

        if (precio === "") {
            nuevosErrores.precio = "El precio es obligatorio";
        } else if (Number(precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }

        if (stock === "") {
            nuevosErrores.stock = "El stock es obligatorio";
        } else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
            nuevosErrores.stock = "El stock debe ser un entero de 0 o más";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0; // true si no hay errores
    };


    return (
        <div className="pagina">
            <div className="panel">
                <header className="panel__cabecera">
                    <h1>Registro de productos</h1>
                </header>

                <form className="formulario" onSubmit={guardarProducto}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Teclado mecánico"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
                    </div>

                    <div className="fila">
                        <div className="campo">
                            <label htmlFor="precio">Precio</label>
                            <input
                                id="precio"
                                type="number"
                                placeholder="0.00"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                            {errores.precio && <span className="error" role="alert">{errores.precio}</span>}
                        </div>

                        <div className="campo">
                            <label htmlFor="stock">Stock</label>
                            <input
                                id="stock"
                                type="number"
                                placeholder="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            {errores.stock && <span className="error" role="alert">{errores.stock}</span>}
                        </div>
                    </div>

                    <button type="submit" className="boton" disabled={guardando}>
                        {guardando ? "Guardando..." : "Registrar"}
                    </button>
                </form>
            </div>
        </div>

    );
}
export default ProductoForm;