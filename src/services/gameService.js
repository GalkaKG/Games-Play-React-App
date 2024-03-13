import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/games';

export const getAll = () => request.get(baseUrl);

// export const getOne = (gameId) => {
//     request.get(`${baseUrl}/${gameId}`);
// }

export const getOne = async (gameId) => {
    try {
        const result = await request.get(`${baseUrl}/${gameId}`);
        return result; 
    } catch (error) {
        console.error('Error fetching game details:', error); 
        throw error; 
    }
}

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData)