import { useId, useState } from "react";
import { toast } from "react-toastify";

export default function BotonSubir({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const tamanioMegas = 10;

  const botonId = useId();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = tamanioMegas * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`El archivo es demasiado grande. Máximo ${tamanioMegas}MB.`);
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        type="file"
        id={botonId}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label
        htmlFor={botonId}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
          width: "fit-content",
        }}
      >
        📤 Subir archivo
      </label>

      {fileName && (
        <span style={{ fontSize: "0.9rem", color: "#444" }}>
          Archivo seleccionado: <b>{fileName}</b>
        </span>
      )}
    </div>
  );
}
