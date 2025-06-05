import React from "react";
import { useState } from "react";
import Modal from "Componets/Modal/Modal";
import { useFavorites } from "../../Contexts/Favoritos/FavoritosContext";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Importamos Link para redirección
import bacgroudImagen from "./bannerFav.jpg";

// Estilos para el banner de la sección de favoritos
const BannerContainer = styled.div`
  background: url(${bacgroudImagen}) no-repeat center center;
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
      `${props.overlayColor || "rgba(0, 0, 0, 0.5)"}`};
    z-index: 1;
  }
`;

const FavoritesContainer = styled.div`
  h2 {
    text-align: center;
    color: white;
    font-size: 2rem;
  }
  p {
    text-align: center;
    color: white;
  }
`;

const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 1200px;
`;

const VideoCard = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: #000000;
  justify-content: space-evenly;
  border-radius: 0px 0px 10px 10px;
  width: 280px;
`;

const Button = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageVideo = styled.img`
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02); /* 💡 Efecto visual al pasar el mouse */
  }
`;

const FavoriteButton = styled(Button)`
  color: ${(props) => (props.isFavorite ? "red" : "#ffffff")};
`;

function Favoritos() {
  const { favorites, removeFavorite, updateFavorite } = useFavorites();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [localFavorites, setLocalFavorites] = useState(favorites); // Para refrescar UI

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
      updateFavorite(data); // actualizamos en contexto

      // Actualizar UI local
      setLocalFavorites((prev) =>
        prev.map((video) => (video.id === data.id ? data : video))
      );

      setError(null);
      handleModalClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const response = await fetch(
        `https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos/${videoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al borrar el video");
      }

      // Eliminar de favoritos (contexto)
      removeFavorite(videoId);

      // Actualizar UI local para reflejar cambio inmediato
      setLocalFavorites((prev) => prev.filter((video) => video.id !== videoId));

      setError(null);
    } catch (error) {
      console.error(error);
      setError("No se pudo borrar el video.");
    }
  };

  // Sincronizar localFavorites cuando cambia favorites en contexto
  React.useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  return (
    <>
      <BannerContainer overlayColor='rgba(255, 0, 0, 0.4)' />
      <FavoritesContainer>
        <h2>Mis Videos Favoritos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {localFavorites.length === 0 ? (
          <p>No tienes videos favoritos.</p>
        ) : (
          <VideoList>
            {localFavorites.map((video) => (
              <VideoCard key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <ImageVideo
                    src={video.imageUrl}
                    alt={video.title}
                  />
                </Link>

                <ButtonGroup>
                  <Button onClick={() => handleEditClick(video)}>
                    <FiEdit2 />
                    Editar
                  </Button>
                  <FavoriteButton
                    onClick={() => removeFavorite(video.id)}
                    isFavorite={true}
                  >
                    <FaHeart />
                  </FavoriteButton>
                  <Button onClick={() => handleDelete(video.id)}>
                    <RiDeleteBin3Line />
                    Borrar
                  </Button>
                </ButtonGroup>
              </VideoCard>
            ))}
          </VideoList>
        )}
      </FavoritesContainer>

      {isModalOpen && (
        <Modal
          video={selectedVideo}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Favoritos;