import { useState } from "react";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import './App.css'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <h1>📃 User List with Search</h1>
      <UserList />
      
      <button className="open-btn" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello from Modal 🎉</h2>
        <p>This is a reusable modal component.</p>
      </Modal>
    </div>
  );
}
