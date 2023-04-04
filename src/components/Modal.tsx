import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmIcon?: IconDefinition;
    cancelIcon?: IconDefinition;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    show: boolean;
    onHide: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title,
    message,
    confirmIcon = null,
    cancelIcon = null,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    show,
    onHide,
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    {cancelIcon && <FontAwesomeIcon icon={cancelIcon} className="mr-2" />}
                    {cancelText}
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    {confirmIcon && <FontAwesomeIcon icon={confirmIcon} className="mr-2" />}
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
