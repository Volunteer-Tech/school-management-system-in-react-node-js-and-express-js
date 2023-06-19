exports.getAllFaculty = (req, res) => {
    const connection = req.app.get('connection');

    connection.query('SELECT * FROM faculty', (err, result) => {
        if(!err) {
            res.status(200).json(result);
        }
    });
}
