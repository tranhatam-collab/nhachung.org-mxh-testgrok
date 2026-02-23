import React, { useState, useEffect } from 'react';

function Home() {
  const [posts, setPosts] = useState([]); // Sau này fetch từ API

  useEffect(() => {
    // Fetch posts từ backend API
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Chào Mừng Đến Nhà Chung!</h1>
      <p>Đây là không gian chia sẻ chung cho mọi người – học tập, kinh doanh, kết nối chân thật.</p>
      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="post bg-white p-4 mb-4 shadow">
            <p>{post.content}</p>
            <button>Like (+ điểm)</button>
            <button>Share</button>
          </div>
        ))}
      </div>
      <form> {/* Form đăng post */}
        <textarea placeholder="Chia sẻ suy nghĩ của bạn..."></textarea>
        <button type="submit">Đăng</button>
      </form>
    </div>
  );
}

export default Home;
