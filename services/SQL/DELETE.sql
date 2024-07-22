-- delete_item.sql
DELETE FROM public.items
	WHERE id = $1 
	RETURNING *;