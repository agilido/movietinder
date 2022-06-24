import { useCallback } from "react";
import { IFilms } from "../interfaces/IData";
import TinderCard from "react-tinder-card";

import '../styles/Card.css';

type Props = {
    film: IFilms;
    filmArr: IFilms[];
    index: number;
    fref: any;
    sendReject: (data: IFilms) => void;
    sendAccept: (data: IFilms) => void;
    updateCurrentIndex: () => void;
}


function Card({ film, fref, sendReject, sendAccept, updateCurrentIndex }: Props) {

    const decideMovieDir = useCallback((dir: string) => {
        if (dir === "right") {
            updateCurrentIndex()
            sendReject(film)
        }
        if (dir === "left") {
            updateCurrentIndex()
            sendAccept(film)
        }
    }, [film, sendReject, sendAccept, updateCurrentIndex]);

    return (
        <>
            <TinderCard
                preventSwipe={['down', 'up']}
                className="card"
                ref={fref}
                flickOnSwipe
                onSwipe={decideMovieDir}
            >
                <div
                    style={{ backgroundImage: `url(${film.imageURL})` }}
                    className="box"
                >
                    <h3 className="title">{film.title} ({film.rating}/10)</h3>
                </div>
                <div className="summary">
                    <p>{film.summary}</p>
                </div>
            </TinderCard>
        </>
    )
}

export default Card