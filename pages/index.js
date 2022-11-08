import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/CSSReset"
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
//   const estiloHomePage = { backgroundColor: "red" };

  return (
    <>
        <CSSReset />
        <div>
        <Menu />
        <Header />
        <Timeline playL={config.playlists} />
        </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyleHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 75px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
  }
`;
function Header() {
  return (
    <StyleHeader>
      {/* {<img src="banner" />} */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.nome}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyleHeader>
  );
}

function Timeline(props) {
  const playlistNames = Object.keys(props.playL);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playL[playlistName];
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a src={video.url}>
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
