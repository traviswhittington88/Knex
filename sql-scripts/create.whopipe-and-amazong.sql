CREATE TABLE IF NOT EXISTS whopipe_video_views (
    view_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    video_name TEXT NOT NULL,
    region TEXT NOT NULL,
    date_viewed TIMESTAMP DEFAULT now() NOT NULL
);

DROP TYPE IF EXISTS department CASCADE department;
CREATE TYPE department AS ENUM (
    'Electronics',
    'Cleaning',
    'Grocery',
    'Furniture',
    'Stationery',
    'Clothing',
    'DIY',
    'Sports',
    'Homeware', 
    'Games',
    'Transport'
);

CREATE TABLE IF NOT EXISTS amazong_products (
    product_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    price decimal(12,2) NOT NULL,
    category department NOT NULL,
    image TEXT
);


