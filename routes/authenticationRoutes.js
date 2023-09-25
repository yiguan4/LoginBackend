const moogoose = require('mongoose');
const Account = moogoose.model('accounts');

module.exports = app => {

    // Routes
    app.post('/account/login', async (req, res) => {
        const { cUsername, cPassword } = req.body;

        if(cUsername == null || cPassword == null){
            res.send("Invalid credentials");
            return;
        }

        var userAccount = await Account.findOne({ username : cUsername});
        if(userAccount != null){
            if(cPassword == userAccount.password){
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();
                
                console.log("Retrieving account ")
                res.send(userAccount);
                return;
            }
        }

        res.send("Invalid credentials");
        return;
    });


    app.post('/account/register', async (req, res) => {
        const { first, last, cEmail, cUsername, cPassword } = req.body;

        if(cUsername == null || cPassword == null){
            res.send("Invalid credentials");
            return;
        }

        var userAccount = await Account.findOne({ username : cUsername});
        if(userAccount == null){
            console.log("Registering new account");

            var newAccount = new Account({
                firstname: first,
                lastname: last,
                email: cEmail,
                username : cUsername,
                password : cPassword,

                lastAuthentication : Date.now()
            });

            await newAccount.save();

            res.send(newAccount);
            return;
        }else{
            res.send("Username is already taken");
        }

        res.send("Invalid credentials");
        return;
    });
}