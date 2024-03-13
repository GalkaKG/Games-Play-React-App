import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GameContext } from '../../context/GameContext';
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

const GameDetails = () => {
    const { addComment, fetchGameDetails, selectGame } = useContext(GameContext);
    const { gameId } = useParams();
    // console.log(gameId);
    const currentGame = selectGame(gameId);

    useEffect(() => {
      (async () => {
        const gameDetails = await gameService.getOne(gameId);
        console.log(gameDetails);
        const gameComments = await commentService.getByGameId(gameId);
      
        fetchGameDetails(gameId, {...gameDetails, comments: gameComments});
      })();
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');
        
        commentService.create(gameId, comment)
          .then(result => {
              addComment(gameId, comment);
          })
        
    }

    return (
        <section id="game-details">
          <h1>{currentGame?.title}</h1>
          <div className="info-section">
            <div className="game-header">
              <img className="game-img" src={currentGame?.imageUrl} />
              <h1>Bright</h1>
              <span className="levels">MaxLevel: {currentGame?.maxLevel}</span>
              <p className="type">{currentGame?.category}</p>
            </div>
            <p className="text">
              {currentGame?.summary}
            </p>

            <div className="details-comments">
              <h2>Comments:</h2>
              <ul>
                {currentGame?.comments?.map(x => 
                  <li className="comment">
                      <p>{x}</p>
                  </li>
                )}
              </ul>
              {!currentGame?.comments &&
                  <p className="no-comment">No comments.</p>
              }  
            </div>

          
            <div className="buttons">
              <Link to={`/games/${gameId}/edit`} className="button">
                Edit
              </Link>
              <Link to="#" className="button">
                Delete
              </Link>
            </div>
          </div>
      
        <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" onSubmit={addCommentHandler}>
            {/* <input
              type="text" 
              name="username" 
              placeholder="John Doe"
              onChange={onChange}
              onBlur={validateUsername}
              value={comment.username} 
             />

            {error.username && 
                <div style={{color: 'red'}}>{error.username} </div>
            } */}
            
            <textarea
              name="comment"
              placeholder="Comment......"
            />
            <input
              className="btn submit"
              type="submit"
              value="Add Comment"
            />
          </form>
        </article>
      </section>
    );   
};

export default GameDetails;