import React, { useState, useEffect } from 'react';
import WalletConnect from '../components/WalletConnect'; // Giả sử có component này từ trước

function Home() {
  const [posts, setPosts] = useState([]); // Danh sách bài post
  const [textareaValue, setTextareaValue] = useState(''); // Nội dung post mới
  const [account, setAccount] = useState(null); // Địa chỉ wallet từ WalletConnect

  // Fetch posts từ API khi load trang
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Handle submit form post mới, tích hợp on-chain nếu connected
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textareaValue) return alert('Vui lòng nhập nội dung!');
    if (!account) return alert('Kết nối wallet trước để chia sẻ on-chain!');

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress: account, content: textareaValue })
      });
      if (response.ok) {
        // Refresh feed sau khi post thành công
        const updatedPosts = await fetch('/api/posts').then(res => res.json());
        setPosts(updatedPosts);
        setTextareaValue('');
        alert('Chia sẻ thành công! Điểm thưởng đã được cộng on-chain.');
      } else {
        alert('Lỗi khi chia sẻ!');
      }
    } catch (error) {
      console.error('Error posting:', error);
      alert('Lỗi kết nối!');
    }
  };

  // Handle like một post (có thể tích hợp on-chain sau)
  const handleLike = async (postId) => {
    if (!account) return alert('Kết nối wallet để like!');
    // Gọi API like, cộng điểm on-chain
    await fetch(`/api/like/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ userAddress: account })
    });
    // Refresh posts
    const updatedPosts = await fetch('/api/posts').then(res => res.json());
    setPosts(updatedPosts);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Chào Mừng Đến Nhà Chung!</h1>
      <p className="text-center mb-8 text-lg">Đây là không gian chia sẻ chung cho mọi người – học tập, kinh doanh, kết nối chân thật với công nghệ blockchain và AI.</p>
      
      {/* Kết nối Wallet */}
      <div className="text-center mb-6">
        <WalletConnect onAccountChange={setAccount} /> {/* Truyền callback để cập nhật account */}
      </div>

      {/* Form đăng post */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          placeholder="Chia sẻ suy nghĩ, kiến thức hoặc sản phẩm của bạn trong Nhà Chung..."
          className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-none h-32"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Đăng Chia Sẻ (On-Chain)
        </button>
      </form>

      {/* Feed bài post */}
      <div className="feed space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có bài chia sẻ nào. Hãy là người đầu tiên!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">{post.user || 'Người dùng ẩn danh'}</span>
                <span className="text-gray-500 text-sm">{new Date(post.timestamp).toLocaleString()}</span>
              </div>
              <p className="mb-4">{post.content}</p>
              <div className="flex space-x-4">
                <button onClick={() => handleLike(post.id)} className="text-blue-500 hover:underline">
                  Like ({post.likes || 0}) - + Điểm
                </button>
                <button className="text-green-500 hover:underline">Share</button>
                <span className="text-gray-500">Điểm: {post.points || 0}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
