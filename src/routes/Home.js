import BackgroundImg from "../components/BackgroundImg";
import Carrossel from "../components/Carrossel";

const Home = () => {
    const movieInfos = {
        img: "https://images2.alphacoders.com/605/605929.jpg",
        imdbId: "tt2084970",
        type: "movie"
    }
    return <div className="relative">
        <BackgroundImg infos={movieInfos} blur={true}/>
        <Carrossel searchTitle="Popular" type="movie" page="1"/>
        <Carrossel searchTitle="Popular" type="movie" page="2"/>
        <div className="h-2 w-full mb-14 sm:hidden"></div>
    </div>
}

export default Home;