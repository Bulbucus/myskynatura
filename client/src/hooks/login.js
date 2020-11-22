import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

export const useLoginHandler = () => {
    const [showAutenc, setShowAutenc] = useState(false)
    const [preMessage, setPreMessageLogin] = useState('');

    const history = useHistory();

    const loginChanges = (preMessage) => {
        setShowAutenc(!showAutenc)
        setPreMessageLogin(preMessage)
        !showAutenc ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
        !showAutenc ? history.push({search:"?=login"}) : history.push({search:""});
    }

    useEffect(() => {
        history.location.search === '?=login' && loginChanges();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [history])
    
    return {showAutenc, preMessage, history, loginChanges}
}