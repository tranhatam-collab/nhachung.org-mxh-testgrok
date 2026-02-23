import React from 'react';

function Header() {
  return (
    <header className="bg-blue-500 p-4 flex justify-between">
      <div className="logo text-white font-bold">NC - Nhà Chung</div> {/* Animation: Thêm CSS hover để mở rộng */}
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white">Home</a></li>
          <li><a href="/chat" className="text-white">Chat</a></li>
          <li><a href="/market" className="text-white">Marketplace</a></li>
          {/* Thêm menu khác */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
