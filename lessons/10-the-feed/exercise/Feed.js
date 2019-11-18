import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed


function Feed() {
  const [createdAt, setCreatedAt] = useState(Date.now);
  const [feedPosts, setFeedPosts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [newPosts, setNewPosts] = useState([]);

  // ------- View More Posts -------- //

  function handleViewMore() {
    setLimit(limit+3);
  }

  // TODO: Use a plugin instead of worrying about the cleanup myself
  useEffect(() => {
    let isCurrent = true;
    (async () => {
      let morePosts = await loadFeedPosts(createdAt, limit);
      if (isCurrent) {
        setFeedPosts(morePosts);
      }
    })();
    return () => (isCurrent = false);
  }, [createdAt, limit]);

  // FYI: Normal promise syntax instead of async await (would still want to add the cleanup stuff though)
  // useEffect(() => {
  //   loadFeedPosts(Date.now(), 3).then(posts =>
  //     setFeedPosts(posts)
  //   });
  // }, []);

  // ------- Check for Existence of New Posts -------- //

  useEffect(() => {
    let isCurrent = true;
    (async () => {
      let posts = await subscribeToNewFeedPosts(createdAt, posts => {
        if (isCurrent) {
          setNewPosts(newPosts);
        }
      });
    })();
    return () => (isCurrent = false);
  }, []);

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
        >
          View 3 New Posts
        </button>
      </div>

      {feedPosts.map(post =>
        <FeedPost post={post} key={post.id} />
      )}
      
      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button" onClick={handleViewMore}>View More</button>
      </div>
    </div>
  )
}

// you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2",
//   id: "foobar"
// }

