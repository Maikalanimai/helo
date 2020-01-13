select p.title, p.id, u.username, u.profile_picture from posts p
join users u on u.id=p.user_id
where title ilike $1 or title ilike $2