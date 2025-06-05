import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #0f0f0f;
  border: 2px solid #0ff;
  box-shadow: 0 0 20px #0ff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  color: #fff;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: #ff006e;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  font-weight: bold;
  text-shadow: 0 0 5px #fff;
  &:hover {
    background-color: #d1005e;
  }
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

const Textarea = styled.textarea`
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

const Modal = ({ video, onClose, onSave }) => {
  const [editedVideo, setEditedVideo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  // Cargar categorías únicas
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(
          "https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos"
        );
        const data = await res.json();
        const categoriasUnicas = [...new Set(data.map((v) => v.categoria))];
        setCategorias(categoriasUnicas);
      } catch (err) {
        console.error("Error al cargar las categorías:", err);
        setError("Error al cargar las categorías.");
      }
    };

    fetchCategorias();
  }, []);

  // Cargar video al abrir modal
  useEffect(() => {
    if (video) {
      setEditedVideo({ ...video });
    }
  }, [video]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editedVideo) return;

    const { titulo, imageUrl, videoUrl, descripcion, categoria, id } =
      editedVideo;

    if (
      !id ||
      !titulo ||
      !imageUrl ||
      !videoUrl ||
      !descripcion ||
      !categoria
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(
        `https://683a6a6543bb370a8672a3fe.mockapi.io/videos/Videos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo,
            imageUrl,
            videoUrl,
            descripcion,
            categoria,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const updatedVideo = await response.json();
      onSave(updatedVideo);
      onClose();
    } catch (err) {
      console.error("Error en guardado:", err);
      alert(
        "Hubo un error al guardar el video. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Editar Video</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <FormGroup>
          <Label>Título:</Label>
          <Input
            type='text'
            name='titulo'
            value={editedVideo?.titulo || ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>URL de la Imagen:</Label>
          <Input
            type='text'
            name='imageUrl'
            value={editedVideo?.imageUrl || ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>URL del Video:</Label>
          <Input
            type='text'
            name='videoUrl'
            value={editedVideo?.videoUrl || ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Descripción:</Label>
          <Textarea
            name='descripcion'
            value={editedVideo?.descripcion || ""}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Categoría:</Label>
          <Select
            name='categoria'
            value={editedVideo?.categoria || ""}
            onChange={handleInputChange}
          >
            <option value=''>Seleccionar Categoría</option>
            {categorias.map((cat, idx) => (
              <option
                key={idx}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button
            color='#0f0'
            onClick={handleSave}
          >
            Guardar
          </Button>
          <Button
            color='#f00'
            onClick={onClose}
          >
            Cancelar
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackground>
  );
};


export default Modal;