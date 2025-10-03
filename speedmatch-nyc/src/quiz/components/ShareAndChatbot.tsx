import { useState } from 'react';
import styles from "../styles/ShareAndChatbot.module.css"
import { FaRegCircleCheck } from 'react-icons/fa6';
import SocialMedia from '../../components/SocialMedia';
import starLogo from "../../assets/Star.svg";

function ShareAndChatbot( {shareData} : {shareData?: any}) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (): Promise<void> => {
        if (!email) {
            setShowValidation(true);
            setTimeout(() => setShowValidation(false), 3000); // Hide after 3 seconds
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);

        // Your email submission logic here
        try {
        
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success state
            setIsSuccess(true);
            setEmail(''); // Clear the email

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        if (showValidation) setShowValidation(false); // Hide validation when user starts typing
    };

    const handleChatbotClick = () => {
		const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
		if (dfMessengerBubble) dfMessengerBubble.openChat();
	};

    return (
        <div className={styles.container}>
            <div className={styles.shareWrapper}>
                <div className={styles.sendEmail}>
                    <h3 className={styles.title}>Email my result to:</h3>
                    <div className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                placeholder="Enter Your Email Here..."
                                value={email}
                                onChange={handleInputChange}
                                required
                                className={styles.input}
                            />
                            {showValidation && (
                                <div className={styles.validationTooltip}>
                                    <span className={styles.validationIcon}>⚠</span>
                                    Please fill out your email.
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`${styles.button} ${isSuccess ? styles.successButton : ''}`}
                        >
                            {isSubmitting ? 'Sending...' : isSuccess ? (
                                <>
                                    Sent <FaRegCircleCheck style={{ marginLeft: '8px' }} />
                                </>
                            ) : 'Send My Result'}
                        </button>
                    </div>
                </div>
                <div className={styles.shareSocial}>
                    <h3 className={styles.title}>Share this website on Social Media:</h3>
                    <SocialMedia variant="results" shareData={shareData}/>
                </div>
            </div>

            <div className={styles.chatbotWrapper}>
                <h3 className={styles.chatbottTitle}>Want to know more about the candidates? Ask our Chatbot.</h3>
                <button 
                onClick={handleChatbotClick}
                className={styles.chatbotButton}>
                    Ask AI Chatbot
                    <img src={starLogo} alt="chatbotLogo" />
                    </button>
            </div>
        </div>
    )
}

export default ShareAndChatbot;