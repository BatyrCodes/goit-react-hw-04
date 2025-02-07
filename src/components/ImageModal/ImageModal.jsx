import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    borderRadius: "10px",
    backgroundColor: "white",
    maxWidth: "80%",
    maxHeight: "80%",
    overflow: "hidden",
    border: "none",
  },
};

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) {
      onClose();
    }
  }, [image, onClose]);

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {image && (
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
