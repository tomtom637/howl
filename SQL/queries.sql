-- we select for all users the number of origin posts they wrote this month
-- we also select the number of replies they got on each of their posts
-- we select as well as how many original posts and posts replies there wrote


SELECT
	u.nickname,
	COUNT(p.id) AS posts,
	COUNT(p.id) FILTER (WHERE p.parent_id IS NULL) AS original_posts,
	COUNT(p.id) FILTER (WHERE p.parent_id IS NOT NULL) AS posts_replies
FROM users u
JOIN posts p ON p.user_id = u.id
WHERE p.creation_date > now() - interval '1 month'
GROUP BY u.nickname;



