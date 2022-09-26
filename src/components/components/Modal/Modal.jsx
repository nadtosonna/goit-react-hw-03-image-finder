import { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModal)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            this.props.onClose();
        }
    }

    render() {
        const { closeModal } = this;
        const { children } = this.props;
        return createPortal(
            <div className={css.overlay} onClick={closeModal}>
                <div className={css.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        );
    }
}