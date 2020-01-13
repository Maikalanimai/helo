select p.title, p.image_url, p.content,  p.id, u.username, u.profile_picture, p.user_id from posts p
join users u on u.id=p.user_id
where p.id = $1
