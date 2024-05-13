import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { getPhotosOfUser } from "../../services/PhotoService";
import { useSelector } from "react-redux";
import Photo from "../Photo";
import Comments from "../Comments";
import NewComment from "../NewComment";

function UserPhotos() {
  const upLoadPhoto = useSelector(state => state.upLoadPhoto);
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getUserPhoto = async (userID) => {
      const result = await getPhotosOfUser(userID);
      const json = await result.json();
      json.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
      if (result.status === 200) {
        setPhotos(json);
      } else {
        console.error(result.status);
      }
    }
    getUserPhoto(userId);
  }, [userId, upLoadPhoto]);

  return (
    <>
      {photos.map((item) => (
        <div key={item._id} className="photo-box">
          <Photo item={item} />
          <div className="comment-box">
            <Comments data={{ comments: item.comments, photoId: item._id }} />
            <NewComment photoId={item._id} />
          </div>
        </div>
      ))}
    </>
  );
}

export default UserPhotos;
