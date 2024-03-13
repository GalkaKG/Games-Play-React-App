import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from 'react-router-dom';
import * as gameService from '../services/gameService';

export const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
        if (Array.isArray(action.payload)) {
            return action.payload.map(x => ({...x, comments: []}));
        } else {
            console.error('Payload is not an array in ADD_GAMES action');
            return state;
        }
        // case 'ADD_GAMES':
        //     return action.payload.map(x => ({...x, comments: []}));
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'FETCH_GAME_DETAILS':
        case 'EDIT_GAME':
            return state.map(x => x._id === action.gameId ? action.payload : x);
        case 'ADD_COMMENT':
            // return state.map(x => x._id === action.gameId ? {...x, comments: [...x.comments, action.payload]} : x);
            return state.map(x => x._id === action.gameId ? {...x, comments: [...(x.comments || []), action.payload]} : x);
        case 'REMOVE_GAME':
            return state.filter(x => x._id !== action.gameId);
        default:
            return state;
    }
}


export const GameProvider = ({
    children
}) => {
    const navigate = useNavigate();
    // const [games, setGames] = useState([]);
    const [games, dispatch] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_GAMES',
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const selectGame = (gameId) => {
        return games.find(x => x._id === gameId) || {};
    }

    const fetchGameDetails = (gameId, gameData) => {
        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: gameData,
            gameId,
        })
    }

    const addComment = (gameId, comment) => {
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,
            gameId
        });

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
        dispatch({
            type: 'ADD_GAME',
            payload: gameData,
        })
    
        navigate('/catalog');
      };
    
      const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x => x._id === gameId ? gameData : x));
        dispatch({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId,
        });
    };

    const gameRemove = (gameId) => {
        dispatch({
            type: 'REMOVE_GAME',
            gameId
        })
    }

    return (
        <GameContext.Provider value={{games, addGameHandler, gameEdit, addComment, fetchGameDetails, selectGame, gameRemove}}>
            {children}
        </GameContext.Provider>
    );
}