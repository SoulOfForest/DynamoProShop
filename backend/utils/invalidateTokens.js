const invalidateTokens = (res, tokens) => {
    for (let token of tokens) {
        res.cookie(token, null, {
            maxAge: 0
        })
    }
}

module.exports = invalidateTokens;