import { useId, useState, useImperativeHandle, forwardRef } from "react";
import { uploadImage, deleteImage } from "../services/imageService";
import { toast } from "react-toastify";


const SubirImagen = forwardRef(({ handleImgURL }, ref) => {
  const [preview, setPreview] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const botonId = useId();


  useImperativeHandle(ref, () => ({
    reset() {
      setPreview(null);
      setImageData(null);
    },
  }));

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(null);
    const base64 = await fileToBase64(file);
    setPreview(base64);
  };

  const handleUpload = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      const result = await uploadImage(preview);
      setImageData(result);
      toast.success("Imagen subida con éxito");
      handleImgURL(result);
    } catch (err) {
      alert("Error al subir la imagen: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageData?.public_id) return;
    setLoading(true);
    try {
      await deleteImage(imageData.public_id);
      toast.success("Imagen eliminada con éxito");
      setPreview(null);
      setImageData(null);
    } catch (err) {
      alert(" Error al eliminar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Seleccione una imagen</h2>
      <input
        type="file"
        id={botonId}
        accept="image/*"
        hidden={true}
        onChange={handleFileChange}
        disabled={loading}
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
        📤 Seleccionar archivo
      </label>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: 10,
              display: "block",
              marginBottom: "15px"
            }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {!imageData ? (
          <button onClick={handleUpload} disabled={loading || !preview} className="btn-green">
            {loading ? "Subiendo..." : "Subir Imagen"}
          </button>
        ) : (
          <button onClick={handleDelete} disabled={loading} className="btn-red">
            {loading ? "Eliminando..." : "Eliminar Imagen"}
          </button>
        )}
      </div>

      {imageData && (
        <div style={{ marginTop: 15 }}>
          <p>
            🌐 <strong>URL:</strong>{" "}
            <a href={imageData.secure_url} target="_blank" rel="noreferrer">
              Ver en Cloudinary
            </a>
          </p>
          <p>
            🆔 <strong>Public ID:</strong> {imageData.public_id}
          </p>
        </div>
      )}
    </div>
  );
});

export default SubirImagen;


