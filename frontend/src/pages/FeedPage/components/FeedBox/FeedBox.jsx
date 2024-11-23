import { Link, useNavigate } from "react-router-dom";
import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../../core/constants/DateTimeFormat";
import { IoEyeSharp } from "react-icons/io5";
import { registerFeedView } from "../../../../core/api/feed";
import { useMutation } from "@tanstack/react-query";
import { useIncreaseFeedView } from "../../../../core/query/feed";
import { useState } from "react";
import "./FeedBox.css";

export const FeedBox = ({ feed }) => {
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);
  const feedId = feed._id;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { mutate: increaseFeedView } = useIncreaseFeedView();
  const currentUserId = sessionStorage.getItem("userId");
  const handleMoveFeed = (feedId) => {
    increaseFeedView(feedId);
    navigate(`/feed/${feedId}`);
  };

  const handleToggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleFeedDelete = () => {
    console.log("삭제");
    setIsMenuVisible(false);
  };

  const profileLink =
    currentUserId === feed.userInfo.user
      ? "/user/me"
      : `/user/${feed.userInfo.user}`;

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Link to={profileLink}>
            <Avatar src={feed.userInfo.profileImg} isOnline />
          </Link>
          <div>
            <div>{feed.userInfo.nickname}</div>
            <span>Lv 0</span>
          </div>
        </div>
        <div className="feed-button">
          <FaEllipsisVertical onClick={handleToggleMenu} />
          <span>
            {isMenuVisible && (
              <span className="feed-delete" onClick={() => handleFeedDelete()}>
                삭제
              </span>
            )}
          </span>
        </div>
      </div>
      <picture className="feed-imgbox" onClick={() => handleMoveFeed(feedId)}>
        <img src={feed?.fileUrl} alt="" />
      </picture>

      <div className="feed-inner">
        <div className="feed-inner-text">
          <LikeButton />
          <div className="feed-view-section">
            <IoEyeSharp className="feed-view-icon" />
            <span>{feed.views}</span>
          </div>
        </div>

        <div
          onClick={() => handleMoveFeed(feedId)}
          className={
            location.pathname === "/feed" ? "feed-text" : "feed-detail-text"
          }
        >
          <div>{feed?.description}</div>
        </div>
      </div>
      <div className="feed-tag-info">
        <div className="feed-tags-list">
          {feed?.hashtags.map((tag, index) => (
            <TagButton tagName={tag} key={index} />
          ))}
        </div>

        <span>{timeText(feedDate)}</span>
      </div>
    </article>
  );
};
