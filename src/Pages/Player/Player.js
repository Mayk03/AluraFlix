import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import bacgroudImagen from "./banner2.jpg";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #ffffff;
  }
`;

const Banner = styled.div`
  background: url(${bacgroudImagen}) no-repeat center center;
  background-size: cover;
  height: 300px;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.color ? `${props.color}99` : "rgba(0, 0, 0, 0.5)"};
    z-index: 1;
  }
`;

const VideoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: left;
  width: 100%;
  max-width: 1000px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 10px;
`;

const IframeContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 315px;
  margin: 0 auto;
  border: none;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  color: #ffffff;
  font-size: 1rem;
  text-align: justify;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-top: 10px;
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

const Player = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://678dc6e4a64c82aeb11de3bb.mockapi.io/Videos"
        );
        const data = await response.json();

        const foundVideo = data.find((v) => v.id === videoId);

        if (foundVideo) {
          setVideo(foundVideo);
        } else {
          setError("Video no encontrado.");
        }
      } catch (error) {
        setError("Error al obtener el video.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  if (loading) {
    return <LoadingMessage>Cargando video...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PlayerContainer>
      <Banner color='#FFBA05' />
      <h1>Video Player</h1>
      <VideoItem>
        <IframeContainer>
          <iframe
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${video.videoUrl}`}
            title={video.titulo}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </IframeContainer>
        <DescriptionContainer>
          <VideoTitle>{video.titulo}</VideoTitle>
          <p>{video.description}</p>
        </DescriptionContainer>
      </VideoItem>
    </PlayerContainer>
  );
};

export default Player;