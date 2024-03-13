import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const create = (gameId, comment) => 
    request.post(baseUrl, { gameId, text: comment });   
