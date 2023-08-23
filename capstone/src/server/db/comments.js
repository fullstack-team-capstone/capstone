const db = require('./client')

const createComment = async({
    thumbsUpOrDown,
    title,
    commentBody
}) => {
    try{
        const{rows:[comment]} = await db.query (`
        INSERT INTO comments (thumbsUpOrDown, title, commentBody)
        VALUES ($1, $2, $3)
        RETURNING * `, [thumbsUpOrDown, title, commentBody])

        return comment

    } catch (error) {
        throw error
    }
}

const getAllComments = async() => {
    try{
        const{rows} = await db.query(`
        SELECT * FROM comments`)
        return rows 

    } catch (error){
        throw error
    }
}

const getCommentById = async(commentid) => {
    try{
        const{rows:[comment]} = await db.query(`
        SELECT *
        FROM comments 
        WHERE commentid = $1;
        `,[commentid])
        return comment


    }catch(error){
        throw error
    }
}

const deleteCommentById = async(commentid) => {

    try{
        const{rows:[comment]} = await db.query(`
        DELETE FROM comments 
        WHERE commentid = $1
        RETURNING * ;

        
        
        `,[commentid])
        return comment

    }catch(error){
        throw error
    }



}


const editComment = async(commentid, fields={}) => {

    const setString = Object.keys(fields).map((key,index) => `"${key}" =$${index + 1}`).join(',');
    if(setString.length === 0) {
        return;
    } try{
        const{rows:[comment]} = await db.query(`
        UPDATE comments
        SET ${setString}
        WHERE commentid = ${commentid}
        RETURNING * ;

    
        `, Object.values(fields))
        return comment

    }catch(error){
        throw error
    }

}


module.exports = {createComment, getAllComments, getCommentById, deleteCommentById, editComment}
