import { useState, useEffect } from "react";
import * as gameService from '../../services/gameService';
import LatestGame from "./LatestGame/LatestGame";


const Home = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            })
    }, []);

    return (
        <section id="welcome-world">
        <div className="welcome-message">
          <h2>ALL new games are</h2>
          <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero" />
        <div id="home-page">
            
          <h1>Latest Games</h1>
          {games.length > 0
            ? games.map(x => <LatestGame game={x} />)
            : <p className="no-articles">No games yet</p>
          }
          {/* Display div: with information about every game (if any) */}
  
          {/* <div className="game">
            <div className="image-wrap">
              <img src="./images/ZombieLang.png" />
            </div>
            <h3>Zombie Lang</h3>
            <div className="rating">
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <div className="data-buttons">
              <a href="#" className="btn details-btn">
                Details
              </a>
            </div>
          </div>
          <div className="game">
            <div className="image-wrap">
              <img src="./images/MineCraft.png" />
            </div>
            <h3>MineCraft</h3>
            <div className="rating">
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <div className="data-buttons">
              <a href="#" className="btn details-btn">
                Details
              </a>
            </div>
          </div> */}
          {/* Display paragraph: If there is no games  */}
         
        </div>
      </section>
    );
}

export default Home;