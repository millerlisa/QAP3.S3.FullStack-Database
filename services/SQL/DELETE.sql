-- delete_item.sql
DELETE FROM public.menu_items
	WHERE available = false
	RETURNING *;
