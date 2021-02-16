const checkEnv = () => {
    if (process.env.NODE_ENV !== 'production') {
        return 'http://95.93.159.118:4040';
    }
    return '';
}

export default checkEnv;