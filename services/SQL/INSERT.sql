-- insert_item.sql
INSERT INTO public.items(
	id, name, description, price, avaia)
	VALUES (1, 'Pizza', Tomato sauce with fresh tomatoes, mozzarella cheese and basil, 19.99, true),
	(2, 'Pasta Carbonara', Creamy sauce made with eggs, pancetta, parmesan cheese and pepper, served with spaghetti pasta, 18.99, true),
	(3, 'Pasta Bolognese', Tomato sauce with ground beef, onions, carrots, celery, garlic, white wine, and cream, served with spaghetti pasta, 17.99, true),
	(4, 'Pasta Alfredo', Creamy sauce made with parmesan cream, garlic and butter, served with fettuccine pasta, 17.99, true),
	(5, 'Calamari Fritti', Calamari served with garlic aioli, 21.99, true), 
	(6, 'Bruschetta', Toasted bread topped with fresh tomatoes, garlic, basil, olive oil, and salt, 12.99, true),
	(7, 'Caprese Salad', Fresh tomatoes, mozzarella cheese, basil, olive oil, and salt, 14.99, true),
	(8, 'Tiramisu', Coffee-flavored Italian dessert made of ladyfingers, mascarpone cheese, eggs, sugar, cocoa, and coffee, 9.99, true),
	(9, 'Cannoli', Pastry tube filled with sweet ricotta cream, 8.99, true),
	(10, 'Gelato', Italian ice cream made with milk, sugar, and flavoring, 7.99, true)
	RETURNING *;