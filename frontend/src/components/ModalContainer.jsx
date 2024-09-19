import React from "react";
import { motion } from "framer-motion";
const ModalContainer = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="rounded-lg shadow-lg p-6 max-w-lg w-full relative"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center top-4 right-4 text-white hover:bg-gray-700 transition-colors"
        >
          x
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default ModalContainer;
