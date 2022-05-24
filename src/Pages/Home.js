import Banner from "../Components/Banner";
import Row from "../Components/Row";
import requests from "../request";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Row title="Top Rated" fetchURL={requests.fetchTrending} />
      <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals}/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
};

export default Home;
