-- update_item.sql
UPDATE public."items"
	SET price= 21.99
	WHERE id=4
	RETURNING *;