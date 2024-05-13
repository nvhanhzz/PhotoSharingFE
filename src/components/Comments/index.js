import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useSelector } from "react-redux";
import { getPhotoById } from "../../services/PhotoService";

function calculateElapsedTime(timestamp) {
    // Current time object
    var now = new Date();

    // Uploaded time object
    var uploadedTime = new Date(timestamp);

    // Calculate elapsed time
    var elapsedTime = now - uploadedTime;

    // Convert elapsed time to appropriate units
    var seconds = Math.floor(elapsedTime / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var weeks = Math.floor(days / 7);
    var months = Math.floor(days / 30);
    var years = Math.floor(days / 365);

    // Return result as "time ago"
    if (years > 0) {
        return years + (years === 1 ? " year ago" : " years ago");
    } else if (months > 0) {
        return months + (months === 1 ? " month ago" : " months ago");
    } else if (weeks > 0) {
        return weeks + (weeks === 1 ? " week ago" : " weeks ago");
    } else if (days > 0) {
        return days + (days === 1 ? " day ago" : " days ago");
    } else if (hours > 0) {
        return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else {
        return "just commented";
    }
}


function Comments({ data }) {
    const addComment = useSelector(state => state.addComment);
    const { comments, photoId } = data;

    const sortCmt = (comments) => {
        if (Array.isArray(comments)) {
            comments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        } else {
            console.error("Đối số 'comments' không phải là một mảng.");
        }
    }
    sortCmt(comments);

    const [cmts, setCmts] = useState(comments);

    useEffect(() => {
        const getPhoto = async (id) => {
            const result = await getPhotoById(id);
            const json = await result.json();
            // console.log(json);
            sortCmt(json.comments);
            if (result.status === 200) {
                setCmts(json.comments);
            } else {
                console.error(result.status);
            }
        }
        getPhoto(photoId);
    }, [addComment]);

    return (
        <div className="comments">
            {cmts ? <h2>Comment:</h2> : <div></div>}
            {cmts ? (
                cmts.map((cmt, index) => (
                    <div key={index}>
                        <div className="comments__header">
                            <Link to={`/users/${cmt.user._id}`}>
                                {cmt.user.first_name} {cmt.user.last_name}
                            </Link>
                            <i>{calculateElapsedTime(cmt.date_time)}</i> {/* Display elapsed time */}
                        </div>
                        <p>{cmt.comment}</p>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Comments;
