exports.getAllProjects = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, order } = req.query;
    order = order === '-1' ? 'DESC': 'ASC';
    const [rows, fields] = await connection.query(
        'select rp.pname, rp.p_desc, f.fname from (research_proj rp inner join research_faculty rf on rp.pid = rf.pid) inner join faculty f on rf.fid = f.fid ORDER BY ' + tag + ' ' + order);
    res.status(200).json(rows);
}

exports.addProject = async (req, res) => {
    const connection = req.app.get('connection');
    const { pid, pname, p_desc } = req.body;
    const post = { pid, pname, p_desc };
    const [rows, fields] = await connection.query('INSERT INTO research_proj SET ?', [post]);
    res.status(200).json(rows);
}

exports.searchProject = async(req, res) => {
    const connection = req.app.get('connection');
    var { tag, filter } = req.query;
    filter = '%' + filter + '%';
    const [rows, fields] = await connection.query(
        'select rp.pname as pname, rp.p_desc as p_desc, f.fname as fname from (research_proj rp inner join research_faculty rf on rp.pid = rf.pid) inner join faculty f on rf.fid = f.fid WHERE ' + tag + ' LIKE ?', [filter]);    
    res.status(200).json(rows);
}

exports.countProject = async(req, res) => {
    const connection = req.app.get('connection');
    const [rows, fields] = await connection.query(
        'SELECT COUNT(DISTINCT rp.pname) AS noOfProjects, COUNT(DISTINCT rs.sapid) AS noOfStudents, COUNT(DISTINCT rf.fid) AS noOfFaculties  FROM (research_proj rp INNER JOIN research_student rs ON rs.pid = rp.pid) INNER JOIN research_faculty rf'
        );
    res.status(200).json(rows[0]);
}