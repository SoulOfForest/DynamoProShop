export const getTokenFromCookie = () => {
    const userInfoCookie = document.cookie.match(new RegExp('(^| )' + 'jwt-payload' + '=([^;]+)')) || null;

    let userInfo = null;
    let error = null;

    if (userInfoCookie) {
        const userInfoPayload = userInfoCookie[2].split('.')[1] || null;
        try {
            userInfo = userInfoPayload && JSON.parse(atob(userInfoPayload));
        } catch (err) {
            error = err.message;
            console.error(err);
        }
    }

    return { userInfo, error };
}