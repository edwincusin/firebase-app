import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

//INTERFASE
export interface Producto {
    id:string;
    nombre:string;
    precio:number;
    stock:number;
};



// CREAR PRODUCTO
export const crearProducto = async (nombre: string, precio: number, stock: number) => {
    const docRef = await addDoc(collection(db, "productos"),
        {
            nombre,
            precio,
            stock,
        });
    return docRef.id;
};


//OBTENER PRODCUTOS
export const obtenerProductos=async():Promise<Producto[]>=>{

    const querySnapshot=await getDocs(collection(db,"productos"));

    const productos=querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data() // realiza una copia de los campos
    })) as Producto[]; // se va acoplar a este formato de interfas

    return productos;

}


