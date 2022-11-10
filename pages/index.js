import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      
      <div>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline  searchValue={valorDoFiltro} playL={config.playlists} />
        <Favoritos />
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyleHeader = styled.div`
  background-color: ${({theme}) => theme.backgroundLevel1};
  .perfil {
    width: 120px;
    border-radius: 50%;
  }
  .banner {
    height: 250px;
    width: 100%;
  }

  .user-info {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
  }
`;
function Header() {
  return (
    <StyleHeader>
      <img className="banner" src="/img/Banner.png" />
      <section className="user-info">
        <img
          className="perfil"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.nome}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyleHeader>
  );
}

function Timeline({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playL);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playL[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) =>{
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

const StyledFav = styled.section`
  padding: 0 32px;
  .itens {
    display: flex;
    gap: 20px;
  }

  .item {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    text-align: center;
  }
  span {
    padding-top: 5px;
    font-weight: bold;
  }
  img {
    width: 120px;
  }
`;
function Favoritos() {
  const fav = config.favoritos;
  return (
    <StyledFav>
      <h1>AluraTubes Favoritos</h1>
      <div className="itens">
        {fav.map((f) => {
          return (
            <div key={f.nome} className="item">
              <img src={f.img} />
              <span>{f.nome}</span>
            </div>
          );
        })}
      </div>
    </StyledFav>
  );
}
