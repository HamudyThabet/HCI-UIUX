-- 0. Setup Database
CREATE DATABASE IF NOT EXISTS goldilocksdb;
USE goldilocksdb;

-- 1. Users Table (The Root)
CREATE TABLE users (
    user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Buyer', 'Admin') DEFAULT 'Buyer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Products Table (With all requested attributes in order)
CREATE TABLE products (
    product_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    tagline VARCHAR(200),
    details TEXT,
    description TEXT,
    ingredients TEXT,
    flavor VARCHAR(50),
    texture VARCHAR(50),
    serving_suggestion TEXT,
    serving_capacity VARCHAR(50),
    tags VARCHAR(255),
    stock_quantity INT(11) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Cart Table (Connected to Users and Products)
CREATE TABLE cart (
    cart_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    product_id INT(11) NOT NULL,
    quantity INT(11) DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Orders Table (Connected to Users)
CREATE TABLE orders (
    order_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Order_Items Table (Bridge to connect Orders and Products)
CREATE TABLE order_items (
    order_item_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT(11) NOT NULL,
    product_id INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;

-- 6. Reviews Table (Connected to Users and Products)
CREATE TABLE reviews (
    review_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    product_id INT(11) NOT NULL,
    rating INT(11) CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;
