import styles from "../styles/ShareAndChatbot.module.css"
import SocialMedia from '../../components/SocialMedia';
import axios from "axios";
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useMemo, useState } from "react";
import type { MatchCandidate } from "../../types/MatchCandidate";
import SEOHead from "../../components/SEOHead";

function ShareAndChatbot({candidates}: {candidates: MatchCandidate[]}) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (): Promise<void> => {
        if (isSubmitting) return;

        if (!email) {
            setShowValidation(true);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const endpoint = 
            'https://speedmatch-nyc-send-quiz-result-623092499467.northamerica-northeast2.run.app';
            //process.env.NODE_ENV === 'production'
            //    ? 'https://us-central1-speedmatch-nyc.cloudfunctions.net/send_quiz_result'
            //    : 'http://localhost:5001/speedmatch-nyc/us-central1/send_quiz_result';

            await axios.post(endpoint, {
                email,
                candidates,
            });

            // Show success state
            setIsSuccess(true);
            setEmail(''); // Clear the email

            // Reset success state after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);

        } catch (error) {
            console.error('Submission error:', error);
            setErrorMessage('Something went wrong. Please try again.');
            setTimeout(() => setErrorMessage(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        if (showValidation) {
            setShowValidation(false);
        }
        if (errorMessage) setErrorMessage(null);
    };
    const handleChatbotClick = () => {
        const dfMessengerBubble = document.querySelector('df-messenger-chat-bubble');
        if (dfMessengerBubble) {
            dfMessengerBubble.setAttribute('style', 'display: block;');
            (dfMessengerBubble as any).openChat();
        }
    };

    const shareData = useMemo((): { title: string; description: string; url: string; image?: string } | null=> {
        if (candidates.length === 0) return null;

        const topMatch = candidates[0];

        return {
            title: "My Speed Match NYC Result",
            description: `I took the Speed Match NYC quiz and my top match is ${topMatch?.name}! Take the quiz to find your match.`,
            // For testing, also need to build and deploy to this domain to see open graph shared
            // Need to change to official domain if test is ok
            url: 'https://www.speedmatch.nyc',
            image: 'https://www.speedmatch.nyc/images/OG/OG_Facebook.jpg'
        };
    }, [candidates]);

    return (
        <>
            <SEOHead
                title={shareData?.title || "Your Matching Results"}
                description={shareData?.description || "See your Speed Match NYC quiz results and find your ideal 2025 NYC Mayoral candidate."}
                canonical="https://www.speedmatch.nyc/quiz/result"
                ogImages={{
                    // Need to change to official domain if test is ok
                    facebook: "https://www.speedmatch.nyc/images/OG/OG_Facebook.jpg",
                    twitter: "https://www.speedmatch.nyc/images/OG/OG_Twitter_v2.jpg",
                    linkedin: "https://www.speedmatch.nyc/images/OG/OG_Linkedin.jpg"
                }}
            />
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
                                {errorMessage && (
                                    <div className={`${styles.validationTooltip} ${styles.errorTooltip}`}>
                                        <span className={styles.validationIcon}>⚠</span>
                                        {errorMessage}
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
                        <SocialMedia variant="results" shareData={shareData || undefined} />
                    </div>
                </div>

                <div className={styles.chatbotWrapper}>
                    <h3 className={styles.chatbottTitle}>Want to know more about the candidates? Ask our Chatbot.</h3>
                    <button
                        onClick={handleChatbotClick}
                        className={styles.chatbotButton}>
                        Ask AI Chatbot
                    </button>
                </div>
            </div>
        </>
    )
}

export default ShareAndChatbot;