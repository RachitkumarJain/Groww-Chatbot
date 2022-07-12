const Authentication = require('../utils/auth');

const requireAdminLogin = (req, res, next) => {
    try {
        const auth = new Authentication();
        let data = auth.verifyAccessToken(req.headers.accesstoken);
        data.role = "admin";
        if (data && data.role === "admin") {
            req.data = data.userId;
            next();
        } else {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}

module.exports = requireAdminLogin;