-- insert_item.sql
INSERT INTO public.items(
	id, name, description, price)
	VALUES ($1, $2, $3, $4)
	RETURNING *;