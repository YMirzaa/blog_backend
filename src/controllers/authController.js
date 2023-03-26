const passport = require('passport');
const jwt = require('jsonwebtoken');

/* login middleware. */
exports.signup = (req, res, next) => {
    passport.authenticate(
        'signup',
        { session: false },
        async (err, user, info) => {
            // console.log(err.message);
            if (err || !user) {
                // const error = new Error('An error occurred.');
                return next(err);
            }

            res.json({
                message: 'Signup successful',
                user: req.user,
            });
        }
    )(req, res, next);
};

exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                // const error = new Error('An error occurred.');
                // console.log(info);
                // console.log(err);
                return next(err || info);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

exports.logout = function (req, res, next) {};
