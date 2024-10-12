import React, { useState, useEffect } from 'react';

const MessageModal = ({ message, duration = 5000, onClose }) => {
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setShow(false);
                    return 0;
                }
                return prev - 100 / (duration / 10);
            });
        }, 10);

        const timeout = setTimeout(() => {
            onClose();
            setShow(false);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [duration]);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-3">
            <div className="bg-white shadow-2xl rounded-md p-4 max-w-sm w-full border-1 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 bg-white hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <div>
                    <p className="text-sm">{message}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;