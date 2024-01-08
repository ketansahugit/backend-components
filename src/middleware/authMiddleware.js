const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');

/* node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" */ //to generate a secret key
const secretKey = process.env.JWT_SECRET || 'your-secret-key'

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id:user._id, username: user.username }, secretKey, { expiresIn: '1h'});
};

// Middleware to verify JWT token
const authenticateJwt = passport.authenticate('jwt', {session: false });

// Passport JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}, async (payload, done) => {
    try {
        // Check if the user exists based on the payload
        const user = await YourUserModel.findById(payload.id);
        if (!user) {
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Middleware for user authentication
const authenticate = passport.authenticate('local', { session: false });

// Middleware to authorize based on user role
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        // Check if the user has the required role
        if (req.isAuthenticated() && req.user.role === requiredRole) {
            return next(); // User has the required role, continue to the next middleware or route handler
        } else {
            // User does not have the required role, handle accordingly
            res.status(403).json({ message: 'Forbidden' });
        }
    }
};

module.exports = { generateToken, authenticateJwt, authenticate, authorizeRole };