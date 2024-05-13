import React, { useState, useRef } from "react";
import "./styles.css";
import { postNewComment } from "../../services/CommentServices";
import { useDispatch } from "react-redux";
import { addCommentAction } from "../../actions/AddComment";

function NewComment({ photoId }) {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    const [comment, setComment] = useState("");
    const [showSubmit, setShowSubmit] = useState(false);

    const addComment = async () => {
        try {
            const cmt = {
                comment: comment,
                photoId: photoId
            }
            const result = await postNewComment(cmt);
            if (result.status === 200) {
                dispatch(addCommentAction());
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setComment(value);
        setShowSubmit(value.trim() !== "");

        // Adjust wrapper height
        if (wrapperRef.current) {
            wrapperRef.current.style.height = "auto";
            wrapperRef.current.style.height = wrapperRef.current.scrollHeight + "px";
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() !== "") {
            addComment();
            setComment("");
            setShowSubmit(false);

            // Reset wrapper height
            if (wrapperRef.current) {
                wrapperRef.current.style.height = "auto";
            }
        }
    };

    return (
        <div className="new-comment">
            <div className="input-wrapper" ref={wrapperRef}>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Add a new comment..."
                        value={comment}
                        onChange={handleChange}
                    />
                    {showSubmit && <button type="submit">Comment</button>}
                </form>
            </div>
        </div>
    );
}

export default NewComment;
