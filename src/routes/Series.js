import BackgroundImg from "../components/BackgroundImg";
import Carrossel from "../components/Carrossel";

const Series = () => {
    const movieInfos = {
        img: "https://images4.alphacoders.com/131/thumbbig-1315826.webp",
        imdbId: "tt0903747",
        type: "series"
    }
    return <div className="relative">
        <BackgroundImg infos={movieInfos} blur={true}/>
        <Carrossel searchTitle="Avengers" type="series"/>
        <Carrossel searchTitle="Batman" type="series"/>
        <div className="h-2 w-full mb-14"></div>
    </div>
}

export default Series;