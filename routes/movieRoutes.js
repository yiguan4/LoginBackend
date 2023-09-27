const moogoose = require('mongoose');
const Movies = moogoose.model('movies');

module.exports = app => {

    //Testing purpose
    app.get('/movies', async(req, res) => {
        const { cMoviename} = req.query;
        try {
            const movie = await Movies.findOne({moviename : cMoviename})

            if(movie == null){
                
                console.log("creating movie ")
                var newMovie = new Movies({
                    moviename: cMoviename,
           
                });
    
                await newMovie.save();
    
                res.send(newMovie);
                return;
            }
            
            if(movie) {
                console.log("found movie ")
                res.send(movie)
                return;
            }
            else{
                return res.status(400).json(error);
            }
        } catch (error) {
            return res.status(400).json(error);
        }
        
    });

}