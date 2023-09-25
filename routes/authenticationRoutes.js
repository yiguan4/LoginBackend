const moogoose = require('mongoose');
const Account = moogoose.model('accounts');

module.exports = app => {

    // Routes
    app.get('/account', async (req, res) => {
        const { cUsername, cPassword } = req.query;

        if(cUsername == null || cPassword == null){
            res.send("Invalid credentials");
            return;
        }

        var userAccount = await Account.findOne({ username : cUsername});
        if(userAccount == null){
            console.log("Create new account");

            var newAccount = new Account({
                username : cUsername,
                password : cPassword,

                lastAuthentication : Date.now()
            });

            await newAccount.save();

            res.send(newAccount);
            return;
        }else{
            if(cPassword == userAccount.password){
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();
                
                console.log("retrieving ")
                res.send(userAccount);
                return;
            }
        }

        res.send('hello');
    });
}