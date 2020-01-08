insert into posts (user_id, title, content)
values ($1, $2, $3)

returning *;
