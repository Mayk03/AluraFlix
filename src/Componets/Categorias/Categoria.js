import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../Contexts/Favoritos/FavoritosContext";

const CategorySection = styled.section`
  margin: 30px 0;
  padding: 0 30px;
`;

const CategoryTitle = styled.h2`
  background-color: ${(props) => props.categoryColor || "#000"};
  color: #fff;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px;
  border: 2px solid ${(props) => props.categoryColor || "#000"};
  width: 20%;
`;

const CategoryContainer = styled.div`
  margin: 20px;
`;

const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const VideoCard = styled.div`
  width: calc(33.33% - 10px);
  height: 260px;
  background-color: transparent;
  background-image: url(${(props) => props.imageUrl || ""});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: inset 0 4px 10px
    ${(props) => props.categoryColor || "transparent"};
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  margin-bottom:20px; /* Esto es importante para que el ButtonGroup se posicione relativo a la tarjeta */

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 1300px) {
    width: 300px;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: #000000;
  justify-content: space-evenly;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
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

const FavoriteButton = styled(Button)`
  color: ${(props) => (props.isFavorite ? "red" : "#ffffff")};
  transition: color 0.3s ease;
`;

const Categorias = ({ videos, onEdit, onDelete }) => {
  const [categories, setCategories] = useState({
    Frontend: [],
    Backend: [],
    "Innovación y Gestión": [],
  });

  const categoryColors = {
    Frontend: "#18dcff",
    Backend: "#00C86F",
    "Innovación y Gestión": "#FFBA05",
  };

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (videoId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [videoId]: !prevFavorites[videoId],
    }));
  };

  useEffect(() => {
    const groupedVideos = {
      Frontend: videos.filter((video) => video.categoria === "Frontend"),
      Backend: videos.filter((video) => video.categoria === "Backend"),
      "Innovación y Gestión": videos.filter(
        (video) => video.categoria === "Innovación y Gestión"
      ),
    };
    setCategories(groupedVideos);
  }, [videos]);

  return (
    <div>
      {Object.keys(categories).map((category) => (
        <CategorySection key={category}>
          <CategoryTitle categoryColor={categoryColors[category]}>
            {category}
          </CategoryTitle>
          <CategoryContainer>
            <VideoList>
              {categories[category].length > 0 ? (
                categories[category].map((video) => (
                  <VideoCard
                    key={video.id}
                    categoryColor={categoryColors[category]}
                    imageUrl={video.imageUrl}
                  >
                    <ButtonGroup>
                      <Button onClick={() => onEdit(video)}>
                        <FiEdit2 />
                        Editar
                      </Button>
                      <FavoriteButton
                        isFavorite={favorites[video.id]}
                        onClick={() => toggleFavorite(video.id)}
                      >
                        {favorites[video.id] ? <FaHeart /> : <FaRegHeart />}
                      </FavoriteButton>
                      <Button onClick={() => onDelete(video.id)}>
                        <RiDeleteBin3Line />
                        Borrar
                      </Button>
                    </ButtonGroup>
                  </VideoCard>
                ))
              ) : (
                <div style={{ color: "white" }}>
                  No hay videos disponibles en esta categoría.
                </div>
              )}
            </VideoList>
          </CategoryContainer>
        </CategorySection>
      ))}
    </div>
  );
};

export default Categorias;