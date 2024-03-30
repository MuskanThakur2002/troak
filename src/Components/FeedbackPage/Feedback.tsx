import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import styles from "./Feedback.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import feedbackSubmittedImage from "../../images/yellowCorrectIcon.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitFeedback } from "../../Utilities/ApiHandler"

interface FeedbackProps {
    isOpen: boolean;
    onClose: () => void;
}
interface CustomWindow extends Window {
    ReactNativeWebView?: {
        postMessage: (message: string) => void;
    };
}

const customWindow = window as CustomWindow;

const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState<string>("");
    const [submitData, setSubmitData] = useState<boolean>(false);
    const navigate = useNavigate(); 


    useEffect(() => {
        if (submitData) {
            const timeout = setTimeout(() => {
                navigate('/');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [submitData, navigate]);


    const logout = () => {
        if (customWindow.ReactNativeWebView) {
            customWindow.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
        }

        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    };

    const handleSubmit = async () => {
        if (feedback.trim() === "") {
            toast.error('Feedback cannot be empty');
            return;
        }

        const sessionId = localStorage.getItem("sessionId");
        if (sessionId !== null && sessionId !== undefined) {
            try {
                await submitFeedback(sessionId, feedback);
                setSubmitData(true);
            } catch (error) {
                console.error('Error submitting feedback:', error);
                toast.error('Error submitting feedback. Please try again later.');
            }
        } else {
            logout()
        }
    };

    const handleClose = () => {
        onClose();
        if (submitData) {
            navigate('/');
        }
    };

    return (
        <>
            {isOpen && (
                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <div className={styles.closeIcon} onClick={handleClose}>
                            <AiOutlineClose />
                        </div>

                        {!submitData ? (
                            <>
                                <div className={styles.popupContent}>
                                    <div className={styles.title}>How can we improve the app?</div>
                                    <div className={styles.innerText}>We're sorry to hear you didn't like the app. Please share what we can do to improve:</div>
                                    <div className={styles.textareaContainer}>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Type your feedback here..."
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                                <div className={styles.mainButtonContainer}>
                                    <div className={styles.buttonContainer}>
                                        <button className={styles.button} onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={styles.popupBottomContent}>
                                <div className={styles.imageContainer}>
                                    <img src={feedbackSubmittedImage} alt="Feedback Submitted" className={styles.feedbackImage} />
                                </div>
                                <div className={styles.title}>Thanks for your feedback!</div>
                                <div className={styles.innerText}>We appreciate your feedback—it fuels our improvement process.</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default Feedback;
