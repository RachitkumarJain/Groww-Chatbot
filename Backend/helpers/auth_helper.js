const User = require('../models/auth_models');
const Authentication = require('../utils/auth')

let authHelper = {};

// registers a new user and issues a jwt access token
authHelper.registerUser = async (req, res) => {
    // headers: email, password, name
    try {
        let { email, password } = req.headers;
        let user = await User.findOne({ email: email });

        if (!user) {
            user = new User(req.headers);
            await user.setPasswordAndSave(password);

            // auto login on register
            const auth = new Authentication();
            const data = {
                userId: user.id,
                role: user.role
            }
            const token = auth.createAccessToken(data);
            res.status(200).json({ token: token, name: user.name, email: user.email });
        } else {
            res.status(409).json({ msg: "user already exists" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

// logs in a new user by issuing a access token
authHelper.loginUser = async (req, res) => {
    // headers: email, password 
    try {
        let { email, password } = req.headers;
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ msg: "Not Found" });
        } else {
            if (await user.verifyPassword(password)) {
                const auth = new Authentication();
                const data = {
                    userId: user.id,
                    role: user.role
                }
                const token = auth.createAccessToken(data);
                res.status(200).json({ token: token, name: user.name, email: user.email });
            } else {
                res.status(401).json({ msg: "Unauthorized" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: e })
    }
}

authHelper.logoutUser = async (req, res) => {
    res.json({ msg: "Success" });
}

authHelper.updateKycStatus = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.data, { kycStatus: true });
        res.status(200).json({ msg: "Success" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Server Error" });
    }
}

module.exports = authHelper;