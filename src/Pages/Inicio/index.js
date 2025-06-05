import React, { useState, useEffect } from "react";
import Banner from "Componets/Banner/Banner";
import Modal from "Componets/Modal/Modal";
import styled from "styled-components";
import Categorias from "Componets/Categorias/Categoria";

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

function Inicio() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSave = async (updatedVideo) => {
    try {
      const response = await fetch(
        `https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos/${updatedVideo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVideo),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar el video.");
      }

      const data = await response.json();

      // Actualizamos la lista local
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === data.id ? data : video))
      );

      setError(null);
      handleModalClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const videoToDelete = videos.find((video) => video.id === id);
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres borrar este video: ${videoToDelete?.titulo}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al borrar el video.");
      }

      // Eliminarlo del estado local
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      setError("No se pudo eliminar el video.");
    }
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        setVideos(data);

        // 👇 Aquí se imprime la lista de videos disponibles
        console.log("Videos disponibles:");
        data.forEach((video) =>
          console.log(`ID: ${video.id}, Título: ${video.titulo}`)
        );

        setError(null);
      } catch (error) {
        setError("Error al obtener los videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  if (loading) {
    return <LoadingMessage>Cargando contenido...</LoadingMessage>;
  }

  return (
    <div>
      <Banner />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Categorias
        videos={videos}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <Modal
          video={selectedVideo}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Inicio;