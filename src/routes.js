import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritosProvider } from "./Contexts/Favoritos/FavoritosContext";
import Header from "./Componets/Header/Header";
import Footer from "./Componets/Footer";
import Inicio from "./Pages/Inicio";
import Player from "./Pages/Player/Player";
import Favoritos from "Pages/Favoritos/Favoritos";
import Error404 from "Pages/Error404";
import AgregarVideos from "./Pages/AgregarVideos/AgregarVideos";

const AppRouters = () => {
  return (
    <FavoritosProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Inicio />}
          />
          <Route
            path='/new-video'
            element={<AgregarVideos />}
          />
          <Route
            path='/player/:videoId'
            element={<Player />}
          />
          <Route
            path='/favoritos'
            element={<Favoritos />}
          />
          <Route
            path='*'
            element={<Error404 />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FavoritosProvider>
  );
};

export default AppRouters;
