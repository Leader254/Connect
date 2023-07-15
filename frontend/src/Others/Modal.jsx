import './Modal.css'
const Modal = ({ closeModal }) => {
    return (
        <div className="modalBg">
            <div className="modalContainer">
                <div className="closeBtn">
                    <button onClick={() => {
                        closeModal(false)
                    }}> X </button>
                </div>

                <div className="title">
                    <h1>Are you sure you want to delete</h1>
                </div>
                <div className="body">
                    <p>Proceed to delete</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            closeModal(false)
                        }}
                    >Close</button>
                    <button id='cancelBtn'>Continue</button>
                </div>
            </div>
        </div >
    )
}

export default Modal