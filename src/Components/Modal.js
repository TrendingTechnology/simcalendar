import React, { Component }from 'react';
// from https://peteris.rocks/blog/modal-window-in-react-from-scratch/

class Modal extends Component {
  render() {
    if (this.props.isOpen === false)
      return null

    return (
      <div>
        <div className="modal">{this.props.children}</div>
        <div className="modal-backdrop" onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

export default Modal
