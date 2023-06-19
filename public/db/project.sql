create database college_mgmt;
use college_mgmt;
create table department
(
	did int primary key not null,
    dname varchar(50)
);
create table student
(
    first_name varchar(100),
	last_name  varchar(100),
	full_name varchar(200) AS (concat_ws(' ', first_name, last_name)),
    sapid varchar(11) primary key not null,
    gender varchar(6) not null,
    dob date,
    did int,
    foreign key(did) references department(did)
);
create table faculty 
(
	fid int primary key not null,
    fname varchar(50),
    salary decimal(8,2),
    email varchar(50),
    did int,
    foreign key(did) references department(did)
);

alter table department
add hod int;

alter table department
add foreign key (hod) references faculty(fid);

create table course
(
	courseid int primary key not null,
    course_name varchar(50),
    credits int,
    did int,
    foreign key(did) references department(did)
);

create table teaches
(
	fid int,
    courseid int,
    foreign key(fid) references faculty(fid),
    foreign key(courseid) references course(courseid)
);

create table research_proj
(
	pid int primary key not null,
    pname varchar(50),
    p_desc varchar(100)
);

create table research_faculty
(
	fid int,
    pid int,
    foreign key(fid) references faculty(fid),
    foreign key(pid) references research_proj(pid)
);

create table research_student
(
	sapid varchar(11),
    pid int,
    foreign key(sapid) references student(sapid),
    foreign key(pid) references research_proj(pid)
);

create table library
(
	bookid int primary key not null,
    bname varchar(50),
    edition int,
    author varchar(50)
);

create table borrowed
(
	bookid int,
    fid int,
    sapid varchar(11),
    timestamp datetime default current_timestamp,
    foreign key(fid) references faculty(fid),
    foreign key(sapid) references student(sapid),
    foreign key(bookid) references library(bookid)
);

create table committee
(
	committee_id int primary key not null,
    c_name varchar(50),
    c_head varchar(11),
    tech_c boolean,
    compi_wins int,
    events_organised int,
    foreign key(c_head) references student(sapid)
);

create table core_members
(
	committee_id int not null,
    sapid varchar(11) not null,
    foreign key(committee_id) references committee(committee_id),
    foreign key(sapid) references student(sapid)
);

create table co_members
(
	committee_id int not null,
    sapid varchar(11) not null,
    foreign key(committee_id) references committee(committee_id),
    foreign key(sapid) references student(sapid)
);

insert into department (did,dname) values(1,"Computer Engineering");
insert into department (did,dname) values(2,"Mechanical Engineering");
insert into department (did,dname) values(3,"Electronics Engineering");
insert into department (did,dname) values(4,"Data Science");

insert into faculty values(34,"Neha Sharma",50000,"neha@faculty.com",1);
insert into faculty values(56,"Rohan Kakade",60000,"rohan@faculty.com",1);
insert into faculty values(66,"Mohan Mistry",70000,"mohan@faculty.com",1);

insert into faculty values(12,"Pratik Sharma",50000,"pratik@faculty.com",2);
insert into faculty values(26,"Manav Shah",60000,"manav@faculty.com",2);
insert into faculty values(42,"Rohan Savla",70000,"rohan@faculty.com",2);

insert into faculty values(2,"Dipesh Agarwal",50000,"dipesh@faculty.com",3);
insert into faculty values(24,"Kreena Kapoor",60000,"kreena@faculty.com",3);
insert into faculty values(18,"Karishma Shah",70000,"karishma@faculty.com",3);

insert into faculty values(73,"Shivesh Bhandari",50000,"shivesh@faculty.com",4);
insert into faculty values(48,"Poonam Choudhary",60000,"poonam@faculty.com",4);
insert into faculty values(37,"Manika Saxena",70000,"manika@faculty.com",4);

update department
set hod = 66
where did = 1;

update department
set hod = 42
where did = 2;

update department
set hod = 18
where did = 3;

update department
set hod = 37
where did = 4;

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Nemil","Shah","60004180061","male","2001-01-20",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Nimit","Vasavat","60004180064","male","2000-08-08",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Naman","Dangi","60004180056","male","2000-07-30",1);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kanishk","Shah","60005180061","male","2000-12-08",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kedar","Kini","60005180064","male","2000-10-08",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Jinit","Jain","60005180056","male","2000-09-12",2);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Muskaan","Sharma","60003180061","female","2000-02-03",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Pankti","Galia","60003180064","female","2000-05-15",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shreya","Jain","60003180056","female","2000-12-02",3);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Abhinav","Kumar","60007180061","male","2000-04-13",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Rhea","Maheshwari","60007180064","female","2000-06-23",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Aakansha","Nair","60007180056","female","2000-03-15",4);

insert into course values(2,"Advanced Algorithms",4,1);
insert into course values(4,"Operating System",4,1);
insert into course values(6,"Fluids",4,2);
insert into course values(8,"Mechanical Forces",4,2);
insert into course values(10,"Microprocessor",4,3);
insert into course values(12,"Electronics Communication",4,3);
insert into course values(14,"Applied Statistics",4,4);
insert into course values(16,"Machine Learning",4,4);

insert into teaches values(34,2);
insert into teaches values(56,4);
insert into teaches values(12,6);
insert into teaches values(26,8);
insert into teaches values(2,10);
insert into teaches values(24,12);
insert into teaches values(73,14);
insert into teaches values(48,16);

insert into research_proj values(1,"Farmer's Tech","Working on technology to help farmers improve on the efficiency of their farm fields.");
insert into research_proj values(2,"Analysis of Air Pollution in India","Working on trends of air quality of different cities in India.");

insert into research_faculty values(12,1);
insert into research_faculty values(34,2);

insert into research_student values("60004180056",1);
insert into research_student values("60005180061",1);
insert into research_student values("60004180064",1);
insert into research_student values("60004180061",2);
insert into research_student values("60003180061",2);
insert into research_student values("60007180064",2);

insert into library values(1,"Deep Learning",2,"Andrew NG");
insert into library values(2,"Web Development Basics",2,"Angela Yu");
insert into library values(3,"Computer Vision",2,"Jeff Bezos");
insert into library values(4,"Electric Vehicles",2,"Elon Musk");

insert into committee values(1,"Association of Computer Machinery","60004180056",1,1,0);
insert into committee values(2,"Unicode","60004180064",1,4,0);
insert into committee values(3,"National Social Service","60007180061",0,0,24);

insert into core_members values(1,"60005180061");
insert into co_members values(1,"60005180056");
insert into core_members values(2,"60004180061");
insert into co_members values(2,"60003180056");
insert into core_members values(3,"60003180064");
insert into co_members values(3,"60005180064");

DELIMITER $$
CREATE TRIGGER after_student_delete
    AFTER DELETE
    ON student FOR EACH ROW
BEGIN
	delete from co_members where sapid = old.sapid;
	delete from core_members where sapid = old.sapid;
    delete from research_student where sapid = old.sapid;
END$$    
DELIMITER ;

DELIMITER $$
CREATE TRIGGER after_faculty_delete
    AFTER DELETE
    ON faculty FOR EACH ROW
BEGIN
	delete from teaches where fid = old.fid;
    delete from research_faculty where fid = old.fid;
END$$    
DELIMITER ;

DELIMITER $$
CREATE TRIGGER after_project_delete
    AFTER DELETE
    ON research_proj FOR EACH ROW
BEGIN
    delete from research_student where pid = old.pid;
    delete from research_faculty where pid = old.pid;
END$$    
DELIMITER ;

DELIMITER $$
CREATE TRIGGER after_committee_delete
    AFTER DELETE
    ON committee FOR EACH ROW
BEGIN
	delete from co_members where committee_id = old.committee_id;
	delete from core_members where committee_id = old.committee_id;
END$$    
DELIMITER ;

insert into library values(5,"Polysaccharides of Microbial Origin",2,"Oliveira");
insert into library values(6,"Adverse Aeroelastic Rotorcraft",2,"Masarati");
insert into library values(7,"Encyclopedia of Ocean Engineering",2,"Cui");
insert into library values(8,"System and Circuit Design",2,"Sanchez-Sinencio");
insert into library values(9,"Handbook of Biochips",2,"Sawan");
insert into library values(10,"Nanoworkbenches",2,"Ahner");
insert into library values(11,"Handbook of Single-Cell Technologies",2,"Santra");
insert into library values(12,"Testing, Modelling and Engineering of YC",2,"Koenders");
insert into library values(13,"Wearable Medical Sensors and Systems",2,"Zhang");
insert into library values(14,"Chip Design and Manufacturing",2,"Lanzerotti");
insert into library values(15,"Vascularization of Tissue Engineering",2,"Banfi");
insert into library values(16,"Signal Processing",2,"Paul");
insert into library values(17,"The Stability of Equilibrium Capillary Surfaces",2,"Slobozhanin");
insert into library values(18,"Organ Tissue Engineering",2,"Lee");
insert into library values(19,"Encyclopedia of Systems and Control",2,"Samad");
insert into library values(20,"Rapid Roboting",2,"Auat Cheein");
insert into library values(21,"Semiconductors for Optoelectronics",2,"Balkan");
insert into library values(22,"Load Transportation Using Aerial Robots",2,"Fierro");
insert into library values(23,"Liposome-Based Drug Delivery Systems",2,"Lu");
insert into library values(24,"Nanotechnology in Oil and Gas Processing",2,"Nassar");
insert into library values(25,"Adhesive Bonding of Aircraft Composite Structures",2,"Cavalcanti");
insert into library values(26,"Automotive Control",2,"Isermann");
insert into library values(27,"High Performance Analog",2,"Garimella");
insert into library values(28,"Comfort and Perception in Architecture",2,"Jakubiec");
insert into library values(29,"Vibration Engineering for a Sustainable Future",2,"Oberst");
insert into library values(30,"Acoustics for Mechanical Structures",2,"Herisanu");

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Advaith","Gill","60004180001","male","2000-01-20",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shanaya","Pau","60004180002","female","2000-02-21",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Bhavana","Kothari","60004180003","female","2000-03-22",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Parth","Baral","60004180004","male","2000-04-23",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Swarna","Gara","60004180005","female","2000-05-24",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Devansh","Gada","60004180006","male","2000-06-25",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Lata","Tripathi","60004180007","female","2000-07-26",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Radha","Puri","60004180008","female","2000-08-27",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Abha","Iyenger","60004180009","female","2000-09-28",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Padma","Sani","60004180010","female","2000-10-29",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Karishma","Dey","60004180011","female","2000-11-30",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ravindra","Sami","60004180012","male","2000-12-31",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Richa","Shah","60004180013","female","2000-12-01",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kushal","Bhattacharyya","60004180014","male","2000-11-02",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Diksha","Srinivas","60004180015","female","2000-10-03",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Rajiv","Oza","60004180016","male","2000-09-04",1);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shivansh","Tripathi","60004180017","male","2000-08-05",1);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Dayaram","Vala","60005180001","male","2000-07-06",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Aditi","Rana","60005180002","female","2000-06-07",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Hrithik","Gokhale","60005180003","male","2000-05-08",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Madhur","Thaman","60005180004","male","2000-04-09",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kalpana","Chandra","60005180005","female","2000-03-10",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Mukta","Solanki","60005180006","female","2000-02-11",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Isha","Nadkarni","60005180007","female","2000-01-12",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Arnav","Thakkar","60005180008","male","2000-01-13",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Alisha","D'Alia","60005180009","female","2000-02-14",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kavita","Iyer","60005180010","female","2000-03-15",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Aryan","Nayar","60005180011","male","2000-04-16",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Advay","Hayre","60005180012","male","2000-05-17",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Devina","Sachdev","60005180013","female","2000-06-18",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ranya","Nori","60005180014","female","2000-07-19",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shantanu","Chhabra","60005180015","male","2000-08-20",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Sai","Khalsa","60005180016","male","2000-09-21",2);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Surya","Rau","60005180017","male","2000-10-22",2);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Krishna","Mitra","60003180001","male","2000-11-23",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Abha","Narasimhan","60003180002","female","2000-12-24",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Akash","Bansal","60003180003","male","2000-12-25",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ryka","Srinivasan","60003180004","female","2000-11-26",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Tanu","Goel","60003180005","female","2000-10-27",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Abhay","Basi","60003180006","male","2000-09-28",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Malini","Kanda","60003180007","female","2000-08-29",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Lakshmi","Savant","60003180008","female","2000-07-30",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Bhavana","Prashad","60003180009","female","2000-06-01",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Sarita","Sankar","60003180010","female","2000-05-02",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ryka","Gour","60003180011","female","2000-04-03",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Isha","Din","60003180012","female","2000-03-04",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Riya","Cheema","60003180013","female","2000-02-05",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Pravin","Patel","60003180014","male","2000-01-06",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kamala","Chhabra","60003180015","female","2000-01-07",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Namrata","Ghosh","60003180016","female","2000-02-08",3);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Gauri","Soni","60003180017","female","2000-03-09",3);

insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ishaan","Sangha","60007180001","male","2000-04-10",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shakti","Tara","60007180002","female","2000-05-11",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Diti","Sandal","60007180003","female","2000-06-12",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ana","Grover","60007180004","female","2000-07-13",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Sai","Uppal","60007180005","male","2000-08-14",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Anik","Gokhale","60007180006","male","2000-09-15",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Aruna","Thakur","60007180007","female","2000-10-16",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Pravin","Mital","60007180008","male","2000-11-17",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kshitij","Sant","60007180009","male","2000-12-18",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Kamala","Das","60007180010","female","2000-12-19",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Chiran","Rastogi","60007180011","male","2000-11-20",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Rajendra","Bhat","60007180012","male","2000-10-21",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Ankur","Chada","60007180013","male","2000-09-22",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Shanta","Kohli","60007180014","female","2000-08-23",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Gita","Khosla","60007180015","female","2000-07-24",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Rajesh","Hayre","60007180016","male","2000-06-25",4);
insert into student (first_name,last_name,sapid,gender,dob,did) values ("Arnav","Sawhney","60007180017","male","2000-05-26",4);

insert into course values(1,"Data Structures",4,1);
insert into course values(3,"Object Oriented Programming",4,1);
insert into course values(5,"Thermodynamics",4,2);
insert into course values(7,"Laws of Motion",4,2);
insert into course values(9,"Semiconductors",4,3);
insert into course values(11,"Network Analysis",4,3);
insert into course values(13,"Data Preprocessing",4,4);
insert into course values(15,"Artificial Intelligence",4,4);

insert into faculty values(33,"Darpan Sonawne",50000,"darpan@faculty.com",1);
insert into faculty values(55,"Mona Bajekal",60000,"mona@faculty.com",1);

insert into faculty values(11,"Rajiv Mishra",50000,"rajiv@faculty.com",2);
insert into faculty values(25,"Sonali Bindra",60000,"sonali@faculty.com",2);

insert into faculty values(3,"Bhavesh Mehta",50000,"bhavesh@faculty.com",3);
insert into faculty values(23,"Manan Mehta",60000,"manan@faculty.com",3);

insert into faculty values(72,"Pooja Shukla",50000,"pooja@faculty.com",4);
insert into faculty values(47,"Rahul Sharma",60000,"rahul@faculty.com",4);

insert into teaches values(33,1);
insert into teaches values(55,3);
insert into teaches values(11,5);
insert into teaches values(25,7);
insert into teaches values(3,9);
insert into teaches values(23,11);
insert into teaches values(72,13);
insert into teaches values(47,15);

insert into core_members values(1,"60004180012");
insert into co_members values(1,"60004180008");
insert into co_members values(1,"60004180009");
insert into co_members values(1,"60004180013");
insert into co_members values(1,"60005180004");

insert into core_members values(2,"60007180001");
insert into co_members values(2,"60007180003");
insert into co_members values(2,"60003180014");
insert into co_members values(2,"60007180015");
insert into co_members values(2,"60007180009");

insert into core_members values(3,"60003180001");
insert into co_members values(3,"60003180004");
insert into co_members values(3,"60003180005");
insert into co_members values(3,"60003180006");
insert into co_members values(3,"60003180011");

insert into research_proj values(3,"Master Boot Record","Studying on working of MBR");
insert into research_proj values(4,"Optimization of Bus Routes in Mumbai","Optimizing bus routes to reduce vehicle traffic.");

insert into research_faculty values(23,3);
insert into research_faculty values(47,4);

insert into research_student values("60003180007",3);
insert into research_student values("60003180011",3);
insert into research_student values("60004180003",3);
insert into research_student values("60007180015",4);
insert into research_student values("60007180011",4);
insert into research_student values("60007180009",4);

create table messages
(
	id int auto_increment primary key,
    sapid varchar(11),
    message varchar(255) not null,
    foreign key(sapid) references student(sapid)
)

DELIMITER $$
CREATE TRIGGER gender_trigger
    AFTER INSERT
    ON student FOR EACH ROW
BEGIN
    if (new.gender != "male" or new.gender != "female") then
		insert into messages(sapid,message) values(new.sapid,"Please update your gender");
    end if;
END$$    
DELIMITER ;

drop table borrowed;
alter table library 
modify column bookid int not null auto_increment unique;
insert into library(bname,edition,author) values ("AutoCAD",3,"Himanshu Pandey");
create table borrowed
(
	bookid int,
    fid int,
    sapid varchar(11),
    timestamp datetime default current_timestamp,
    foreign key(fid) references faculty(fid),
    foreign key(sapid) references student(sapid),
    foreign key(bookid) references library(bookid)
)

DELIMITER $$
CREATE TRIGGER lock_library_trigger
    before INSERT
    ON library FOR EACH ROW
BEGIN
    lock tables library read;
END$$    
DELIMITER ;

DELIMITER $$
CREATE TRIGGER unlock_library_trigger
    after INSERT
    ON library FOR EACH ROW
BEGIN
    unlock tables;
END$$    
DELIMITER ;

