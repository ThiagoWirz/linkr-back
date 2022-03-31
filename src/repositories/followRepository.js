import connection from '../db.js';
import pkg from 'sqlstring';

const { format } = pkg;

async function followUser(followedId, followerId) {
    const query = format(
        `INSERT INTO follows ("followerId", "followedId")
        VALUES (?, ?)`,
        [parseInt(followerId), followedId]
    );
    return connection.query(query);
}

async function isFollowing(followedId, followerId) {
    const query = format(
        `SELECT * FROM follows
        WHERE "followerId" =  ?
        AND "followedId" = ?`,
        [parseInt(followerId), followedId]
    );
    return connection.query(query);
}

async function unFollowUser(followedId, followerId) {
    const query = format(
        `DELETE FROM follows
        WHERE "followerId" =  ?
        AND "followedId" = ?`,
        [parseInt(followerId), followedId]
    );
    return connection.query(query);
}

async function getFollows(id) {
    const query = format(
        `
    SELECT "followedId" FROM follows WHERE "followerId"=?`,
        [id]
    );
    return connection.query(query);
}

export const followRepository = {
    followUser,
    isFollowing,
    unFollowUser,
    getFollows,
};
