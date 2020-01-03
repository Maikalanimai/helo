insert into users (username, hash, profile_picture)
values($1, $2, $3)
returning *;