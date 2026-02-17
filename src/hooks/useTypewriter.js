import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 100, startDelay = 500) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let timeout;

        const startTyping = () => {
            setIsTyping(true);
            let i = 0;
            setDisplayText('');

            const typeChar = () => {
                if (i < text.length) {
                    setDisplayText(text.substring(0, i + 1));
                    i++;
                    timeout = setTimeout(typeChar, speed);
                } else {
                    setIsTyping(false);
                }
            };

            typeChar();
        };

        const initialTimeout = setTimeout(startTyping, startDelay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(initialTimeout);
        };
    }, [text, speed, startDelay]);

    return { displayText, isTyping };
};

export default useTypewriter;
