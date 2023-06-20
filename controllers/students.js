exports.getAllStudents = (req,res) => {
    const connection = req.app.get('connection');

    connection.query('SELECT * FROM student', (err, result) => {
        if(!err) {
            res.status(200).json(result);
        }
    });
}
