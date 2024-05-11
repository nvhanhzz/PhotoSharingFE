import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import { getPhotosOfUser } from "../../services/PhotoService";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const getUserPhoto = async (userID) => {
      const result = await getPhotosOfUser(userID);

      if (result) {
        console.log(result);
        setPhotos(result);
      }

      return result;
    }
    getUserPhoto(userId);
  }, [userId]);

  return (
    <>
      {photos.map((item) => (
        <div className="photo" key={item._id}>
          <div className="content">
            <i>{item.date_time}</i>
            <div className="image">
              <img src={"../images/" + item.file_name} />
            </div>
          </div>
          <div className="comments">
            {item.comments ? <h2>Comment:</h2> : <div></div>}
            {item.comments ? (
              item.comments.map((cmt, index) => (
                <div key={index}>
                  <div className="comments__header">
                    <Link to={`/users/${cmt.user._id}`}>
                      {cmt.user.first_name} {cmt.user.last_name}
                    </Link>
                    <i>{cmt.date_time}</i>
                  </div>
                  <p>{cmt.comment}</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default UserPhotos;
