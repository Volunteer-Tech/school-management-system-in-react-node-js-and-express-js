const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const { port } = require('./config/constants');
const { options } = require('./config/middleware');
const { facultyRouter, studentRouter, projectRouter, departmentRouter, committeeRouter, libraryRouter } = require('./routes/index');
const app = express();

async function main() {

    //DB setup
    const connection = await dbConnection();    
    app.set('connection', connection);

    // middleware setup
    app.use(express.json());
    app.use(express.static(`${__dirname}/public`));
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    app.use(cors(options));

    //API setup
    app.use('/api/faculty', facultyRouter);
    app.use('/api/student', studentRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/department', departmentRouter);
    app.use('/api/committee', committeeRouter);
    app.use('/api/library', libraryRouter);

    return app;
}

main().then(server => {
    server.listen(port, () => {
        console.log(`server listening on port ${port}`);
    })
})