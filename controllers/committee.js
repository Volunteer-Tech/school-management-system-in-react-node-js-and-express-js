exports.getAllCommittee = async(req, res) => { 
    const connection = req.app.get('connection');
    let { tag, order } = req.query;
    order = order === '-1' ? 'DESC': 'ASC';
    await connection.query('create temporary table if not exists tmpComm(isTech int(1), cname varchar(50), fname varchar(50), accolades int(11) )');
    const [rowsDetails, fields] = await connection.query('select c.c_name as cname, c.tech_c as isTech, s.full_name as fname from committee c inner join student s on c.c_head = s.sapid');
    const [rowsAccolades, fieldsAccolades] = await connection.query('select (c.compi_wins+c.events_organised) as accolades from committee c ');
    rowsDetails.map((el,id) => {
        el.accolades = (rowsAccolades[id].accolades);
    });
    console.log((rowsDetails));
    await connection.query('insert into tmpComm (isTech, cname, fname, accolades) values ?', [rowsDetails.map(item => [item.isTech, item.cname, item.fname, item.accolades])]);
    const [tmpRows, tmpFields] = await connection.query('SELECT distinct * FROM tmpComm ORDER BY ' + tag + ' ' + order);
    res.status(200).json(tmpRows);
}

exports.addCommittee = async(req, res) => {
    const connection = req.app.get('connection');
    const  { committee_id, c_name, c_head, tech_c, compi_wins, events_organised } = req.body;
    const post = { committee_id, c_name, c_head, tech_c, compi_wins, events_organised };
    const [rows, fields] = await connection.query('INSERT INTO committee SET ?', [post]);
    res.status(201).json(rows);
}

exports.searchCommittee = async (req, res) => {
    const connection = req.app.get('connection');
    let { tag, filter } = req.query;
    filter = '%' + filter + '%';
    const [rows, fileds] = await connection.query(' SELECT distinct * FROM tmpComm WHERE ' + tag + ' LIKE ?', [filter]);
    res.status(200).json(rows);
}

exports.countCommittee = async (req, res) => {
    const connection = req.app.get('connection');
    const [rowsCommittee, fieldCommittee] = await connection.query('select count(c_name) as noOfCommittees from committee');
    const { noOfCommittees } = rowsCommittee[0];
    const [rows, fields] = await connection.query(        
        'select sum(compi_wins) as noOfVictories, sum(events_organised) as noOfEvents from committee')
        const { noOfVictories, noOfEvents } = rows[0];
    const [rowsStudent, fieldsStudent ] = await connection.query(
        'select sum(cnt) as noOfStudents from (select count(sapid) as cnt from core_members union all select count(sapid) as cnt from co_members) tmp',
        )
        const { noOfStudents } = rowsStudent[0];
        res.status(200).send({ noOfCommittees, noOfVictories, noOfEvents, noOfStudents });
}