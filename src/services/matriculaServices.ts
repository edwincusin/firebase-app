import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    type DocumentData,
    type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";


// PARA CREAR DATOS
export const crearDatosMatricula=async()=>{
    await setDoc(doc(db,"estudiantes","EST002"),{
        nombre:"Marlon Loor",
        email:"edwin@email.com",
        celular:"0999995558",
        estado:"activo"
    })

    await setDoc(doc(db,"cursos","CUR001"),{
        nombre:"Desarrollo Web",
        codigo:"DW-001",
        estado:"activo"
    })

    await setDoc(doc(db,"matriculas","MAT002"),{
        estudianteId:"EST002",
        estudianteNombre:"Marlon Loor",
        cursoId: "CUR001",
        cursoNombre: "Desarrollo Web",
        estado:"activo",
        periodo:"2020-2"

    })
}




// Forma de un documento de la colección "matriculas"
export interface Matricula {
    id: string;
    estudianteId: string;
    estudianteNombre: string;
    cursoId: string;
    cursoNombre: string;
    estado: string;
    periodo: string;
}

// Debe coincidir EXACTO con lo guardado en Firestore (distingue mayúsculas)
const ESTADO_ACTIVO = "activo";

// Convierte un documento "crudo" de Firestore en una Matricula (id + campos)
const aMatricula = (documento: QueryDocumentSnapshot<DocumentData>): Matricula =>
    ({ id: documento.id, ...documento.data() }) as Matricula;

// 1. Cursos de un estudiante
export const obtenerCursosDeEstudiante = async (estudianteId: string): Promise<Matricula[]> => {
    const consulta = query(
        collection(db, "matriculas"),
        where("estudianteId", "==", estudianteId)
    );
    const resultado = await getDocs(consulta);
    return resultado.docs.map(aMatricula);
};

// 2. Estudiantes de un curso
export const obtenerEstudiantesDeCurso = async (cursoId: string): Promise<Matricula[]> => {
    const consulta = query(
        collection(db, "matriculas"),
        where("cursoId", "==", cursoId)
    );
    const resultado = await getDocs(consulta);
    return resultado.docs.map(aMatricula);
};

// 3. Matrículas activas
export const obtenerMatriculasActivas = async (): Promise<Matricula[]> => {
    const consulta = query(
        collection(db, "matriculas"),
        where("estado", "==", ESTADO_ACTIVO)
    );
    const resultado = await getDocs(consulta);
    return resultado.docs.map(aMatricula);
};

// 4. Matrícula por ID (lectura directa: no usa query, devuelve una o ninguna)
export const obtenerMatriculaPorId = async (id: string): Promise<Matricula | null> => {
    const referencia = doc(db, "matriculas", id);
    const resultado = await getDoc(referencia);

    if (!resultado.exists()) return null;

    return { id: resultado.id, ...resultado.data() } as Matricula;
};

