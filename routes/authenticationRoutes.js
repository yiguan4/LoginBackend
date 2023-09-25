const moogoose = require('mongoose');
const Account = moogoose.model('accounts');

module.exports = app => {

    // Routes
    app.post('/account', async (req, res) => {
        const { cUsername, cPassword } = req.body;

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
                
                console.log("Retrieving account ")
                res.send(userAccount);
                return;
            }
        }

        res.send("Invalid credentials");
        return;
    });
}