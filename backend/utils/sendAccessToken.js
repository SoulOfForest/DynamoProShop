const sendAccessToken = (res, token) => {
    const HEADER_INDEX = 0, PAYLOAD_INDEX = 1, SIGNATURE_INDEX = 2; 
    
    const jwtComponents = token.split('.');

    res.cookie('jwt-payload', `${jwtComponents[HEADER_INDEX]}.${jwtComponents[PAYLOAD_INDEX]}`, {
        // secure: true,
        path: '/',
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000 * 0.5)
    })

    res.cookie('jwt-token', jwtComponents[SIGNATURE_INDEX], {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000 * 24 * 30),
    });
}

module.exports = sendAccessToken;