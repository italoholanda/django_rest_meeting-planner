import Modal from "../Modal";
import "./styles.css";

interface IProps {
  text: string;
  onClose: () => any;
  onConfirm: () => any;
}

const AreYouSureModal = ({ onClose, onConfirm, text }: IProps) => {
  return (
    <Modal onClose={onClose}>
      <div>
        <p>{text}</p>
        <div className="areyousure-btns">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
};

export default AreYouSureModal;
