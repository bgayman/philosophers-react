import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from './color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Spacer from './Spacer';

interface ModalProps {
    children: React.ReactNode;
    isOpen?: boolean;
    backgroundColor?: string;
    shadowOpacity?: number;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = true, backgroundColor = colors.white, shadowOpacity = 0.1 }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <>
            <style>
                {`
                    dialog::backdrop {
                        background-color: rgba(0, 0, 0, 0.5);
                        animation: fadeIn 0.2s ease-out;
                    }

                    dialog[open] {
                        animation: slideIn 0.3s ease-out;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideIn {
                        from {
                            transform: translateY(-10%);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>
            <dialog
                ref={dialogRef}
                onClose={handleClose}
                onClick={e => {
                    if (e.target === dialogRef.current) {
                        handleClose();
                    }
                }}
                style={{
                    padding: 0,
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: backgroundColor,
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: `0 4px 6px rgba(0, 0, 0, ${shadowOpacity})`,
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    paddingBottom: '0px',
                }}>
                    <Spacer />
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#999',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#666';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#999';
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    padding: '20px',
                    paddingTop: '0px',
                    maxHeight: '70vh',
                    overflowY: 'auto'
                }}>
                    {children}
                </div>
            </dialog>
        </>
    );
};

export default Modal;