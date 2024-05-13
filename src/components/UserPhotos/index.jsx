import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import { getPhotosOfUser } from "../../services/PhotoService";
import { useSelector } from "react-redux";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const upLoadPhoto = useSelector(state => state.upLoadPhoto);
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const getUserPhoto = async (userID) => {
      const result = await getPhotosOfUser(userID);
      const json = await result.json();
      // console.log(json);
      json.sort((a, b) => {
        const dateA = new Date(a.date_time);
        const dateB = new Date(b.date_time);
        return dateB - dateA;
      });
      if (result.status === 200) {
        setPhotos(json);
      } else {
        throw new error(result.status);
      }
    }
    getUserPhoto(userId);
  }, [userId, upLoadPhoto]);

  return (
    <>
      {photos.map((item) => (
        <div className="photo" key={item._id}>
          <div className="content">
            <i>{item.date_time}</i>
            <div className="image">
              <img src={item.file_name} />
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
