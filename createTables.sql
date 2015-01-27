create table users(
    u_id serial primary key,  --this is my pk
    name text,
    photo text
);

create table places(
    p_id serial primary key,
    name text,
    city text,
    country text
);

create table sites(
    site_id serial primary key,
    name text,
    photo text,
    p_id integer references places(p_id) -- this creates my one to many relationships
);

create table diveshops(
    ds_id serial primary key,
    name text,
    photo text,
    address text,
    operatinghours text
);

create table siteshops(
    ss_id serial primary key,
    ds_id integer references diveshops(ds_id), -- this is the info from diveshops table
    site_id integer references sites(site_id)
);

create table userdives(
    ud_id serial primary key,
    ss_id integer references siteshops(ss_id),
    review decimal,
    comments text,
    u_id integer references users(u_id)
);

