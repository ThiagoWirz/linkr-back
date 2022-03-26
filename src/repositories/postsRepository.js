import connection from '../db.js';
import pkg from 'sqlstring';

const { format } = pkg;

async function publish(
    description,
    url,
    userId,
    urlTitle,
    urlDescription,
    urlImage
) {
    const query = format(
        `INSERT INTO posts (description, url, "userId", "urlTitle", "urlDescription", "urlImage") 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [description, url, userId, urlTitle, urlDescription, urlImage]
    );
    return connection.query(query);
}

async function listAll() {
    const query = format(
        `SELECT p.*, 
        u.name author, u.image "profilePicture" 
        FROM posts p
        LEFT JOIN users u ON u.id = p."userId"
        ORDER BY p.id 
        DESC
        LIMIT 20`
    );

    return connection.query(query);
}

async function listHashtag(hashtag) {
    const query = format(
        `SELECT p.*, 
        u.name author, u.image "profilePicture" 
        FROM posts p
        LEFT JOIN users u ON u.id = p."userId"
        WHERE p.description LIKE ?
        ORDER BY p.id 
        DESC
        LIMIT 20`,
        [`%#${hashtag}%`]
    );
    return connection.query(query);
}

async function editPost(description, id) {
    const query = format(
        `UPDATE posts
        SET description = ?
        WHERE id=?`,
        [description, id]
    );
    return connection.query(query);
}

async function userPosts(userId) {
    const query = format(
        `SELECT p.*, 
        u.name author, u.image "profilePicture" 
        FROM posts p
        LEFT JOIN users u ON u.id = p."userId"
        WHERE p."userId" = ?
        ORDER BY p.id 
        DESC
        LIMIT 20`,
        [userId]
    );

    return connection.query(query);
}

async function deletePost(postId) {
    const query = format(
        `DELETE 
        FROM posts
        WHERE id=?`,
        [postId]
    );

    return connection.query(query);
}

export const postsRepository = {
    publish,
    listAll,
    userPosts,
    editPost,
    listHashtag,
    deletePost,
};
