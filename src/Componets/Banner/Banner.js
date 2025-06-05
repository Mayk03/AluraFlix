import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bacgroudImagen from "./banner3.webp";

const BannerContainer = styled.div`
  background: url(${bacgroudImagen}) no-repeat center center;
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 20px;
  position: relative;
`;

const MessageContainer = styled.div`
  padding: 16px;
  max-width: 45%;
  p {
    font-size: 18px;
  }
`;

const MessageDescription = styled.div`
  margin-top: 10px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  line-height: 1.5;
`;

const FeaturedVideoCard = styled.div`
  width: 300px;
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
  bottom: -50px;

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
`;

const VideoDescription = styled.p`
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.5;
  background: linear-gradient(45deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.1));
  padding: 10px;
  border-radius: 5px;
`;

const VideoFrame = styled.img`
  width: 100%;
  height: 230px;
  border: none;
  border-radius: 5px;
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
`;

const Banner = ({ category = "Innovación y Gestión" }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          "https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos"
        );
        if (!response.ok) throw new Error("Error al conectar con la API");
        const data = await response.json();

        // Filtrar por categoría
        const videosByCategory = data.filter(
          (video) => video.categoria === category
        );

        if (!videosByCategory.length) {
          throw new Error("No se encontraron videos para esta categoría.");
        }

        // Elegir un video al azar
        const randomIndex = Math.floor(Math.random() * videosByCategory.length);
        const randomVideo = videosByCategory[randomIndex];

        // Guardar en el estado
        setVideoData(randomVideo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);  

  if (loading) return <LoadingMessage>Cargando...</LoadingMessage>;
  if (error) return <LoadingMessage>{error}</LoadingMessage>;

  return (
    <BannerContainer>
      <MessageContainer>
        <MessageDescription>
          <p>
            Explora los mejores videos seleccionados especialmente para ti.
            Descubre contenido único y agrega tus propios favoritos.
          </p>
        </MessageDescription>
      </MessageContainer>
      {videoData && (
        <FeaturedVideoCard>
          <VideoDescription>Video destacado.</VideoDescription>
          <Link to={`/player/${videoData.id}`}>
            <VideoFrame
              src={videoData.imageUrl}
              alt={`Miniatura del video: ${videoData.titulo}`}
            />
          </Link>
        </FeaturedVideoCard>
      )}
    </BannerContainer>
  );
};

export default Banner;