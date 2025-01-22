import React, { useEffect, useState } from "react";
import { useFavorites } from "../../Contexts/Favoritos/FavoritosContext";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import bacgroudImagen from "./bannerFav.jpg";

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
`;

const FavoriteButton = styled(Button)`
  color: ${(props) => (props.isFavorite ? "red" : "#ffffff")};
`;

function Favoritos() {
  const [videos, setVideos] = useState([]);
  const { favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    // Obtener los videos de la API MockAPI
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://62905c46d68fae0012f06e75.mockapi.io/videos"
        );
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, []); // Se ejecuta solo al montar el componente

  const handleFavoriteClick = (video) => {
    removeFavorite(video.id);
  };

  return (
    <>
      <BannerContainer overlayColor='rgba(255, 0, 0, 0.4)' />
      <FavoritesContainer>
        <h2>Mis Videos Favoritos</h2>
        {favorites.length === 0 ? (
          <p>No tienes videos favoritos.</p>
        ) : (
          <VideoList>
            {favorites.map((favorite) => {
              // Filtrar el video favorito por ID
              const video = videos.find((video) => video.id === favorite.id);
              if (!video) return null; // Si no se encuentra el video, se omite
              return (
                <VideoCard key={video.id}>
                  <ImageVideo
                    src={video.thumbnailUrl}
                    alt={video.title}
                  />
                  <ButtonGroup>
                    <Button>
                      <FiEdit2 />
                      Editar
                    </Button>
                    <FavoriteButton
                      onClick={() => handleFavoriteClick(video)}
                      isFavorite={true}
                    >
                      <FaHeart />
                    </FavoriteButton>
                    <Button>
                      <RiDeleteBin3Line />
                      Borrar
                    </Button>
                  </ButtonGroup>
                </VideoCard>
              );
            })}
          </VideoList>
        )}
      </FavoritesContainer>
    </>
  );
}

export default Favoritos;