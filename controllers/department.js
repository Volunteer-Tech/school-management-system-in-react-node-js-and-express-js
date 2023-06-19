exports.getAllDepartment = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, order } = req.query;
    order = order === '-1' ? 'DESC': 'ASC';
    await connection.query('create temporary table if not exists tmpDept(dname varchar(50), fname varchar(50), strength int(11) )');
    const [rowsDetails, fields] = await connection.query('select d.dname, f.fname from department d inner join faculty f on d.did = f.did where d.hod = f.fid');
    const [rowsStrength, fieldsStrength] = await connection.query('select count(distinct f.fid)+count(distinct s.sapid) as strength from faculty f inner join student s on f.did = s.did group by f.did');
    rowsDetails.map((el,id) => {
        el.strength =(rowsStrength[id].strength);
    });
    await connection.query('insert into tmpDept (dname, fname, strength) values ?', [rowsDetails.map(item => [item.dname, item.fname, item.strength])]);
    const [tmpRows, tmpFields] = await connection.query('SELECT distinct * FROM tmpDept ORDER BY ' + tag + ' ' + order);
    res.status(200).json(tmpRows);
}

exports.getADepartment = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, order } = req.query;
    var { dname } = req.params;
    dname = dname
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            console.log(dname);
    order = order === '-1' ? 'DESC': 'ASC';
    const [rows, fields] = await connection.query('select f.fname, f.email from faculty f inner join department d on f.did = d.did where d.dname = ? and f.fid != d.hod ORDER BY ' + tag + ' ' + order, [dname]);
    res.status(200).json(rows);
}

exports.getADepartmentData = async(req, res) => {
    const connection = req.app.get('connection');
    var { dname } = req.params;
    dname = dname
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    const [rowHod, fieldHod] = await connection.query(
        'select f.fname, f.email from faculty f inner join department d on f.did = d.did where d.dname = ? and f.fid = d.hod', [dname])
    const { fname, email } = rowHod[0];
    const [rowStudent, fieldStudent] = await connection.query(
        'select count(*) as noOfStudents from student s inner join department d on s.did = d.did where d.dname = ?', [dname]);
    const { noOfStudents } = rowStudent[0];
    const [rowFaculty, fieldFaculty] = await connection.query(
        'select count(*) as noOfFaculties from faculty f inner join department d on f.did = d.did where d.dname = ?', [dname]);
    const { noOfFaculties } = rowFaculty[0];
    const [rowCourse, fieldCourse] = await connection.query(
        'select count(*) as noOfCourses from course c inner join department d on c.did = d.did where d.dname = ?', [dname]);
    const { noOfCourses } = rowCourse[0];
    res.status(200).json({ dname, fname, email, noOfCourses, noOfStudents, noOfFaculties });
}

exports.getADepartmentCourse = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, order } = req.query;
    order = order === '-1' ? 'DESC': 'ASC';
    var { dname } = req.params;
    dname = dname
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    const [rowCourse, fieldCourse] = await connection.query(
        'select c.course_name as course_name, c.credits as credits, f.fname as fname from (course c inner join teaches t on c.courseid = t.courseid) inner join (faculty f  inner join department d on f.did = d.did) where f.fid = t.fid and d.dname = ? ORDER BY ' + tag + ' ' + order, [dname]);
    res.status(200).json(rowCourse);
}

exports.searchACourse = async(req, res) => {
    const connection = req.app.get('connection');
    var { filter } = req.query;
    var { dname } = req.params;
    dname = dname
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    filter = '%' + filter + '%';
    const [rows, fields] = await connection.query(
        'select c.course_name as course_name, c.credits as credits, f.fname as fname from (course c inner join teaches t on c.courseid = t.courseid) inner join (faculty f  inner join department d on f.did = d.did) where f.fid = t.fid and d.dname = ? and c.course_name LIKE ?', [dname, filter])
    res.status(200).json(rows);
}

exports.addDepartment = async(req, res) => {
    const connection = req.app.get('connection');
    const { did, dname, hod } = req.body;
    const post = { did, dname, hod };
    const [rows, fields] = await connection.query('INSERT INTO department SET ?', [post]);
    res.status(200).json(rows);
}

exports.searchDepartment = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, filter } = req.query;
    filter = '%' + filter + '%';
    const [rows, fields] = await connection.query(' SELECT distinct * FROM tmpDept WHERE ' + tag + ' LIKE ?', [filter]);
    res.status(200).json(rows);
}

exports.countDepartment = async(req, res) => {
    const connection = req.app.get('connection');
    const [rows, fields] = await connection.query(
        'SELECT COUNT(DISTINCT d.dname) AS noOfDepartments, COUNT(DISTINCT f.fid) AS noOfFaculties, COUNT(DISTINCT s.sapid) AS noOfStudents FROM (department d INNER JOIN faculty f ON d.did = f.did) INNER JOIN student s'
    )
    res.status(200).json(rows[0]);
}