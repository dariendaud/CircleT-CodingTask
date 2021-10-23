import React, { Component } from "react";
import Modal from 'react-modal';
import { connect } from "react-redux";
import { closeModal } from "../redux";

interface IModalProps {
  showModal: boolean,
  className?: string,
  closeModal(): any,
}

interface IModalState {
  showMoadl: boolean
}

class CustomModal extends Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);

    this.state = {
      showMoadl: false
    };
  }

  closeModal = () => {
    console.log("close modal");
    this.props.closeModal();
  }

  render() {
    let className = "modal-dialog " + this.props.className;
    return (
      <Modal isOpen={this.props.showModal} className={className}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Error</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => this.closeModal()} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Oopss... An error has occured. Please try again later.</p>
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: IModalState) => {
  return {
    showMoadl: state.showMoadl,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeModal: () => dispatch(closeModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (CustomModal);