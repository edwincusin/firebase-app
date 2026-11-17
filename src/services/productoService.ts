import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, type DocumentData } from "firebase/firestore";

//INTERFASE
export interface Producto {
    id:string;
    nombre:string;
    precio:number;
    stock:number;
    categoria:string;
};



// CREAR PRODUCTO
export const crearProducto = async (nombre: string, precio: number, stock: number, categoria:string) => {
    const docRef = await addDoc(collection(db, "productos"),
        {
            nombre,
            precio,
            stock,
            categoria
        });
    return docRef.id;
};


//ANTES DE OBTNER 
// Arma un Producto completo, con valores por defecto si falta algún campo
const convertirDocumentoAProducto = (id: string, datos: DocumentData): Producto => ({
    id,
    nombre: datos.nombre ?? "",
    precio: datos.precio ?? 0.0,
    stock: datos.stock ?? 0.0,
    categoria: datos.categoria ?? "",
});

//OBTENER PRODCUTOS FORMA 1 SIN FORMATEAR LOS CAMPOS ANTIGUOS..
/*
export const obtenerProductos=async():Promise<Producto[]>=>{

    const querySnapshot=await getDocs(collection(db,"productos"));

    const productos=querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data() // realiza una copia de los campos
    })) as Producto[]; // se va acoplar a este formato de interfas

    return productos;

}*/

//OBTENER PRODCUTOS FORMA 2  FORMATEA CAMPOS VIEJOS Y NUEVOS..
/*
export const obtenerProductos=async():Promise<Producto[]>=>{

    const querySnapshot=await getDocs(collection(db,"productos"));

    const productos=querySnapshot.docs.map((doc)=>convertirDocumentoAProducto(doc.id,doc.data())) as Producto[]; // se va acoplar a este formato de interfas

    return productos;

}*/

// ESCUCHAR PRODUCTOS EN TIEMPO REAL EN LUGAR DE OBTENER 
export const escucharProductos = (
    callback: (productos: Producto[]) => void,
    onError?: (error: Error) => void
) => {

    const productosRef = collection(db, "productos");

    const unsubscribe = onSnapshot(
        productosRef,
        (querySnapshot) => {

            const productos = querySnapshot.docs.map((documento) =>
                convertirDocumentoAProducto(
                    documento.id,
                    documento.data()
                )
            );

            callback(productos);
        },
        (error) => {
            console.error("Error al escuchar productos:", error);
            onError?.(error);
        }
    );

    return unsubscribe;
};



//MODIFICAR UN DOCUMENTO MEDIANTE ID
export const actualizarProducto=async(
    id:string,
    nombre:string,
    precio:number,
    stock:number,
    categoria:string
)=>{

    const productoRef = doc(db,"productos",id);

    await updateDoc(productoRef,{
        nombre,
        precio,
        stock,
        categoria
    });
}

//ELIMINAR PRODCUTO MEDIANTE ID
export const eliminarProducto=async(id:string)=>{
    const productoRef=doc(db,"productos",id);

    await deleteDoc(productoRef);
}

