drop database if exists cop4710;

Create database cop4710;

use cop4710;

create table users (
	uid bigint auto_increment primary key,
	username varchar(100) not null,
    hashPass varchar(100) not null,
    email varchar(100) not null,
    phone varchar(100) not null,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    role varchar(10) not null
);

create table superadmin (
	uid bigint primary key,
    foreign key(uid) references users(uid)
);

create table university(
	unid bigint auto_increment primary key,
    uid bigint not null,
    unName varchar(45),
    location varchar(100),
    description varchar(500),
    numStudents integer,
    foreign key (uid) references superadmin(uid)
);

create table student (
	uid bigint primary key,
    unid bigint not null,
    foreign key(uid) references users(uid),
    foreign key (unid) references university(unid)
);

create table admin (
	uid bigint primary key,
    unid bigint not null,
    foreign key(uid) references users(uid),
    foreign key (unid) references university(unid)
);

create table rso (
	rid bigint auto_increment primary key,
    uid bigint not null,
    unid bigint not null,
    rsoName varchar(45),
    foreign key (uid) references admin(uid),
	foreign key (unid) references university(unid)
);


create table _events (
	eid bigint auto_increment primary key,
    uid bigint not null,
    eventName varchar(45),
    timedate datetime,
    category varchar(45),
    description varchar(500),
	latitude varchar(45),
    longitude varchar(45),
    eventStatus varchar(20),
    #foreign key(lid) references locations(lid),
    foreign key(uid) references admin(uid)
);

create table publicEvent (
	eid bigint primary key,
	foreign key(eid) references _events(eid)
);

create table privateEvent (
	eid bigint primary key,
    unid bigint not null,
	foreign key(eid) references _events(eid),
    foreign key(unid) references university(unid)
);

create table rsoEvent (
	eid bigint primary key,
    rid bigint not null,
    foreign key(rid) references rso(rid),
    foreign key(eid) references _events(eid)
);

create table comments(
	uid bigint,
	eid bigint,
    body varchar(500),
    rating integer,
    timedate datetime default current_timestamp,
    primary key(uid, eid, timedate),
    foreign key(uid) references users(uid),
    foreign key(eid) references _events(eid)
);

create table rsoMembers(
	rid bigint,
    uid bigint,
    primary key(rid, uid),
	foreign key(uid) references users(uid),
    foreign key(rid) references rso(rid)
);


    