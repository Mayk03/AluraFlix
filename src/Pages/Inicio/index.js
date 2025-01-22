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

  const handleSave = (updatedVideo) => {
    // Aquí se manejaría la lógica de guardado si fuera necesario
    handleModalClose();
  };

  // Obtener los videos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://678dc6e4a64c82aeb11de3bb.mockapi.io/Videos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        setVideos(data); // Guardamos los videos
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

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div>
      <Banner />
      <Categorias
        videos={videos}
        onEdit={handleEditClick}
        onDelete={() => {}}
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