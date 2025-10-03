import styles from "../styles/ShareAndChatbot.module.css"
import SocialMedia from '../../components/SocialMedia';
import starLogo from "../../assets/Star.svg";

function ShareAndChatbot( {shareData} : {shareData?: any}) {

    const handleChatbotClick = () => {
		const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
		if (dfMessengerBubble) (dfMessengerBubble as any).openChat();
	};

    return (
        <div className={styles.container}>
            <div className={styles.shareWrapper}>
                {/* <div className={styles.sendEmail}>
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
                </div> */}
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