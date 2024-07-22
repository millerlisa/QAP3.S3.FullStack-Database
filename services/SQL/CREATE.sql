-- create_table.sql
REATE TABLE public.items
(
    id serial NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;