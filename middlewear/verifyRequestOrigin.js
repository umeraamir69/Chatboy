
function verifyRequestOrigin(req, res, next) {
    const referer = req.headers.referer;

    if (!referer) {
        return res.status(403).json({ error: 'No Referer header found' });
    }

    const requestOrigin = new URL(referer).origin;
    const serverOrigin = new URL(process.env.SERVER_BASE_URL).origin;

    if (requestOrigin !== serverOrigin) {
        return res.status(403).json({ error: 'Invalid request origin' });
    }

    next();
}

export default verifyRequestOrigin;