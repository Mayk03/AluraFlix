import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

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

function AgregarVideos() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Estado para la categoría seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);

  const categories = ["Tecnología", "Educación", "Entretenimiento"]; // Las categorías predefinidas

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://678dc6e4a64c82aeb11de3bb.mockapi.io/Videos"
        );
        const data = await response.json();

        if (videoId) {
          const foundVideo = data.find(
            (video) => video.id === parseInt(videoId)
          );
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

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setVideoUrl(video.videoUrl);
      setDescription(video.description || "");
      setCategory(video.category || ""); // Si ya existe un video, pre-llenar la categoría
    }
  }, [video]);

  const handleClear = () => {
    setTitle("");
    setVideoUrl("");
    setDescription("");
    setCategory(""); // Limpiar la categoría
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (title && videoUrl && category) {
      const videoIdForSave = videoId || Date.now();
      const videoKey = videoUrl.split("v=")[1]; // Obtener la parte del ID de la URL
      const imageUrl = `https://img.youtube.com/${videoKey}/hqdefault.jpg`; // Crear la URL de la imagen

      const updatedVideo = {
        id: videoIdForSave,
        title,
        videoUrl: videoKey, // Solo guardar el ID del video
        description,
        category,
        imageUrl, // URL de la imagen
      };

      try {
        const response = await fetch(
          `https://678dc6e4a64c82aeb11de3bb.mockapi.io/Videos/${
            videoIdForSave || ""
          }`,
          {
            method: videoId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVideo),
          }
        );

        if (!response.ok) {
          throw new Error("Error al guardar el video");
        }

        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  };

  if (loading) {
    return <LoadingMessage>Cargando...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <MainTitle>{videoId ? "Editar Video" : "Nuevo Video"}</MainTitle>
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Label htmlFor='title'>Título</Label>
          <Input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Label htmlFor='category'>Categoría</Label>
          <Select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <Label htmlFor='description'>Descripción</Label>
          <Input
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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