const User = require('../models/user')

module.exports.renderRegisterForm = (req,res)=>{
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Todo!');
            res.redirect('/todos');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req,res) => {
    res.render('users/login')
}

module.exports.login = async (req,res) =>{
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/todos';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error logging out' });
        }
        
        req.flash('success', 'Goodbye');
        res.redirect('/');
    });
};

