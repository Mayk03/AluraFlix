import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

// Estilos con styled-components
const PageContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MainTitle = styled.h1`
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
  margin: 20px 0;
`;

const Form = styled.form`
  background: #0f0f0f;
  border: 2px solid #0ff;
  box-shadow: 0 0 20px #0ff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #0ff;
  text-shadow: 0 0 5px #0ff;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #0ff;
  background: #1a1a1a;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px #0ff;
  &:focus {
    outline: none;
    border-color: #ff006e;
    box-shadow: 0 0 10px #ff006e;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #0ff;
  background: #1a1a1a;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px #0ff;
  &:focus {
    outline: none;
    border-color: #ff006e;
    box-shadow: 0 0 10px #ff006e;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "#0ff"};
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  text-shadow: 0 0 5px #fff;
  box-shadow: 0 0 10px ${(props) => props.color || "#0ff"};
  &:hover {
    opacity: 0.9;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.7);
  padding: 10px;
  border-radius: 5px;
`;

// Función para extraer el ID de cualquier formato de URL de YouTube
const extractYouTubeId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : url;
};

function AgregarVideos() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);

  const categories = ["Frontend", "Backend", "Innovación y Gestión"];

  // Cargar datos si estamos editando un video
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos"
        );
        const data = await response.json();

        if (videoId) {
          const foundVideo = data.find((v) => v.id === videoId);
          setVideo(foundVideo || null);
        }
      } catch (error) {
        setError("Error al obtener los videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  // Rellenar campos si se está editando
  useEffect(() => {
    if (video) {
      setTitulo(video.titulo || "");
      setVideoUrl(video.videoUrl || "");
      setDescripcion(video.descripcion || "");
      setCategoria(video.categoria || "");
    }
  }, [video]);

  // Limpiar el formulario
  const handleClear = () => {
    setTitulo("");
    setVideoUrl("");
    setDescripcion("");
    setCategoria("");
  };

  // Guardar (crear o actualizar) el video
  const handleSave = async (e) => {
    e.preventDefault();

    if (titulo && videoUrl && categoria) {
      // Extrae el ID correctamente desde cualquier formato de URL
      const videoKey = extractYouTubeId(videoUrl);
      const imageUrl = `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`;

      const nuevoVideo = {
        titulo,
        imageUrl,
        videoUrl: videoKey,
        descripcion,
        categoria,
      };

      try {
        const response = await fetch(
          `https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos/${
            videoId || ""
          }`,
          {
            method: videoId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoVideo),
          }
        );

        if (!response.ok) throw new Error("Error al guardar el video");

        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  };

  // Mostrar cargando o error si aplica
  if (loading) return <LoadingMessage>Cargando...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PageContainer>
      <MainTitle>{videoId ? "Editar Video" : "Nuevo Video"}</MainTitle>
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Label htmlFor='titulo'>Título</Label>
          <Input
            id='titulo'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder='Título del video'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='videoUrl'>URL del Video</Label>
          <Input
            id='videoUrl'
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder='URL del video'
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='categoria'>Categoría</Label>
          <Select
            id='categoria'
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value=''>Selecciona una categoría</option>
            {categories.map((cat, index) => (
              <option
                key={index}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='descripcion'>Descripción</Label>
          <Input
            id='descripcion'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder='Descripción (opcional)'
          />
        </FormGroup>
        <ButtonContainer>
          <Button
            color='#0ff'
            type='submit'
          >
            {videoId ? "Actualizar" : "Guardar"}
          </Button>
          <Button
            color='#ff006e'
            type='button'
            onClick={handleClear}
          >
            Limpiar
          </Button>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
}

export default AgregarVideos;