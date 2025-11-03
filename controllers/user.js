const User = require("../models/user");

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'User Registered Successfully');
            res.redirect('/listings');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
}

module.exports.randerSignupForm = (req, res) => {
    res.render('users/signup');
}

module.exports.randerUser = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = async (req, res) => {
    req.flash('welcome to wanderlust you are logged in');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}


module.exports.logoutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
    });
    req.flash('success', 'you are logged out now');
    res.redirect('/listings');
}