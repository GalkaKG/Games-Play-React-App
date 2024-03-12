import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from 'react-router-dom';
import * as gameService from '../services/gameService';

export const GameContext = createContext();


export const GameProvider = ({
    children
}) => {
    const gameReducer = (state, value) => {
        console.log('Old state: ', state);
        console.log('New state: ', value);

        return value;
    }

    const navigate = useNavigate();
    // const [games, setGames] = useState([]);
    const [games, dispatcher] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                dispatcher(result);
            })
    }, []);

    const addComment = (gameId, comment) => {
        // setGames(state => {
        //     const game = state.find(x => x._id == gameId);
            
        //     const comments = game.comments || [];
        //     comments.push(comment)
    
        //     return [
        //         ...state.filter(x => x._id !== gameId),
        //         {...game, comments},
        //     ];
        // })
      };
    
      const addGameHandler = (gameData) => {
        // setGames(state => [
        //     ...state,
        //    gameData,
        // ]);
    
        navigate('/catalog');
      };
    
      const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x => x._id === gameId ? gameData : x));
      }

    return (
        <GameContext.Provider value={{games, addGameHandler, gameEdit, addComment}}>
            {children}
        </GameContext.Provider>
    );
}