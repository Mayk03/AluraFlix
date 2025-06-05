import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../Contexts/Favoritos/FavoritosContext";
import { Link } from "react-router-dom";

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

// Tarjeta como contenedor relativo
const VideoCard = styled.div`
  width: calc(33% - 10px);
  height: 230px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 8px 2px ${(props) => props.categoryColor || "transparent"},
    inset 0 4px 10px ${(props) => props.categoryColor || "transparent"};
  transition: transform 0.3s ease;
  cursor: default;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;

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

// Link que cubre toda la tarjeta, con background image
const VideoLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl || ""});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  position: relative; /* Para los botones en overlay */
  z-index: 0;
`;

// Contenedor absoluto para los botones en el fondo negro al pie
const ButtonGroup = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: space-evenly;
  border-radius: 0 0 10px 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
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

// Botón favorito con color rojo si es favorito
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

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const categoryColors = {
    Frontend: "#18dcff",
    Backend: "#00C86F",
    "Innovación y Gestión": "#FFBA05",
  };

  const toggleFavorite = (video, categoryTitle) => {
    isFavorite(video.id)
      ? removeFavorite(video.id)
      : addFavorite(video, categoryTitle);
  };

  // Evitar que clicks en botones propaguen el evento y disparen el Link
  const handleButtonClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
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
                  >
                    {/* Link cubre toda la tarjeta y muestra la imagen */}
                    <VideoLink
                      to={`/player/${video.id}`}
                      imageUrl={video.imageUrl}
                    />
                    {/* Botones con z-index para estar encima y evitar propagación */}
                    <ButtonGroup>
                      <Button
                        onClick={(e) =>
                          handleButtonClick(e, () => onEdit(video))
                        }
                        title='Editar video'
                      >
                        <FiEdit2 /> Editar
                      </Button>
                      <FavoriteButton
                        isFavorite={isFavorite(video.id)}
                        onClick={(e) =>
                          handleButtonClick(e, () =>
                            toggleFavorite(video, category)
                          )
                        }
                        title='Favorito'
                      >
                        {isFavorite(video.id) ? <FaHeart /> : <FaRegHeart />}
                      </FavoriteButton>
                      <Button
                        onClick={(e) =>
                          handleButtonClick(e, () => onDelete(video.id))
                        }
                        title='Borrar video'
                      >
                        <RiDeleteBin3Line /> Borrar
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