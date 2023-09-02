import BackgroundImg from "../components/BackgroundImg";
import Carrossel from "../components/Carrossel";

const Movies = () => {
    const movieInfos = {
        img: "https://images2.alphacoders.com/131/thumbbig-1317561.webp",
        imdbId: "tt9362722"
    }
    return <div className="relative">
        <BackgroundImg infos={movieInfos} blur={false}/>
        <Carrossel searchTitle="Popular" type="movie" page="3"/>
        <Carrossel searchTitle="Popular" type="movie" page="4"/>
        <div className="h-2 w-full mb-14"></div>
    </div>
}

export default Movies;