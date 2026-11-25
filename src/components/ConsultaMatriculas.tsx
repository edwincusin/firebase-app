import { useState } from "react";
import { obtenerMatriculaPorId, obtenerCursosDeEstudiante, obtenerEstudiantesDeCurso, obtenerMatriculasActivas,  type Matricula } from "../services/matriculaServices";


function ConsultaMatriculas() {

    // Lo que el usuario escribe en cada campo
    const [estudianteId, setEstudianteId] = useState("");
    const [cursoId, setCursoId] = useState("");
    const [matriculaId, setMatriculaId] = useState("");

    // Resultado que se muestra en la tabla
    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [titulo, setTitulo] = useState("");
    const [error, setError] = useState("");

    // Ejecuta cualquier consulta, guarda el resultado y muestra el error si falla
    const ejecutarConsulta = async (nombre: string, consulta: () => Promise<Matricula[]>) => {
        setError("");
        try {
            const resultado = await consulta();
            setMatriculas(resultado);
            setTitulo(nombre);
        } catch (e) {
            console.error("ERROR en " + nombre + ":", e);
            setError("Falló la consulta. Revisa la consola del navegador.");
        }
    };

    // La consulta por ID devuelve una matrícula o null: la convertimos en lista para la tabla
    const consultarPorId = async (): Promise<Matricula[]> => {
        const matricula = await obtenerMatriculaPorId(matriculaId.trim());
        return matricula ? [matricula] : [];
    };

    return (
        <div>
            <h2>Consulta de matrículas</h2>

            {/* 1. Cursos de un estudiante */}
            <div>
                <input
                    type="text"
                    placeholder="ID del estudiante"
                    value={estudianteId}
                    onChange={(e) => setEstudianteId(e.target.value)}
                />
                <button
                    type="button"
                    disabled={estudianteId.trim() === ""}
                    onClick={() => ejecutarConsulta("Cursos de un estudiante", () => obtenerCursosDeEstudiante(estudianteId.trim()))}
                >
                    Cursos del estudiante
                </button>
            </div>

            {/* 2. Estudiantes de un curso */}
            <div>
                <input
                    type="text"
                    placeholder="ID del curso"
                    value={cursoId}
                    onChange={(e) => setCursoId(e.target.value)}
                />
                <button
                    type="button"
                    disabled={cursoId.trim() === ""}
                    onClick={() => ejecutarConsulta("Estudiantes de un curso", () => obtenerEstudiantesDeCurso(cursoId.trim()))}
                >
                    Estudiantes del curso
                </button>
            </div>

            {/* 3. Matrículas activas */}
            <div>
                <button
                    type="button"
                    onClick={() => ejecutarConsulta("Matrículas activas", obtenerMatriculasActivas)}
                >
                    Matrículas activas
                </button>
            </div>

            {/* 4. Matrícula por ID */}
            <div>
                <input
                    type="text"
                    placeholder="ID de la matrícula"
                    value={matriculaId}
                    onChange={(e) => setMatriculaId(e.target.value)}
                />
                <button
                    type="button"
                    disabled={matriculaId.trim() === ""}
                    onClick={() => ejecutarConsulta("Matrícula por ID", consultarPorId)}
                >
                    Matrícula por ID
                </button>
            </div>

            {/* Resultados */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {titulo !== "" && (
                <div>
                    <h3>{titulo}</h3>
                    <p>Total: {matriculas.length}</p>

                    {matriculas.length === 0 ? (
                        <p>Sin resultados</p>
                    ) : (
                        <table border={1} cellPadding={6}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Estudiante ID</th>
                                    <th>Estudiante</th>
                                    <th>Curso ID</th>
                                    <th>Curso</th>
                                    <th>Estado</th>
                                    <th>Periodo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.map((m) => (
                                    <tr key={m.id}>
                                        <td>{m.id}</td>
                                        <td>{m.estudianteId}</td>
                                        <td>{m.estudianteNombre}</td>
                                        <td>{m.cursoId}</td>
                                        <td>{m.cursoNombre}</td>
                                        <td>{m.estado}</td>
                                        <td>{m.periodo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default ConsultaMatriculas;