
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const crearProducto = async (nombre: string, precio: number, stock: number) => {
    const docRef = await addDoc(collection(db, "productos"),
        {
            nombre,
            precio,
            stock,
        });
    return docRef.id;
};



