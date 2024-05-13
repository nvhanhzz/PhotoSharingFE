import React from "react";
import "./styles.css";

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
        return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
}


function Photo({ item }) {
    return (
        <div className="photo" key={item._id}>
            <div className="content">
                <i>{calculateElapsedTime(item.date_time)}</i>
                <div className="image">
                    <img src={item.file_name} alt={`Photo uploaded at ${item.date_time}`} />
                </div>
            </div>
        </div>
    );
}

export default Photo;
