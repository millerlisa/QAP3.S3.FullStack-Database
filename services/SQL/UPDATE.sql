-- update_item.sql
UPDATE public.items
	SET name=$1, description=$2, price=$3
	WHERE id=$4
	RETURNING *;