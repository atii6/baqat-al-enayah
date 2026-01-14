CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  role_id INTEGER,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  registry_public_url VARCHAR(255) UNIQUE,
  profile_image_url TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_stripe_linked BOOLEAN DEFAULT FALSE,
  stripe_account_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "gift_wells" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  privacy VARCHAR(10) DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "products" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  affiliate_link TEXT,
  is_affiliated BOOLEAN DEFAULT FALSE,
  category INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "donations" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL REFERENCES "gift_wells"(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  title VARCHAR(255),
  donation_method VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  status VARCHAR(255) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "registry_items" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL REFERENCES "gift_wells"(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES "products"(id),
  registry_product JSONB,
  quantity INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 1,
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  is_claimed BOOLEAN DEFAULT FALSE,
  status VARCHAR(255) DEFAULT 'listed' CHECK (status IN ('listed', 'purchased')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user_details" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  creating_for VARCHAR(20) NOT NULL DEFAULT 'myself',
  recipient_first_name VARCHAR(255),
  recipient_last_name VARCHAR(255),
  recipient_email VARCHAR(255),
  journey TEXT,
  street_address TEXT,
  address_line TEXT,
  city VARCHAR(150),
  state VARCHAR(150),
  zip_code VARCHAR(10),
  limit_account_access BOOLEAN DEFAULT FALSE,
  limit_others_adding_gifts BOOLEAN DEFAULT FALSE,
  enable_contribution_alerts BOOLEAN DEFAULT FALSE,
  terms_policy BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "product_types" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "services" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "support_messages" (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT,
  user_id INTEGER NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "payment_details" (
  id SERIAL PRIMARY KEY,
  donation_id INTEGER NOT NULL,
  stripe_id VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NULL,
  amount DECIMAL(10, 2) NOT NULL,
  cardholder_name VARCHAR(255) NULL,
  last_four_digits VARCHAR(4) NULL,
  connect_account_id VARCHAR(255) NULL,
  platform_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  recipient_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'processing')),
  currency VARCHAR(3) DEFAULT 'usd',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "registry_services" (
  id SERIAL PRIMARY KEY,
  giftwell_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  registry_service JSONB,
  order_index INTEGER NOT NULL,
  is_claimed BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('listed', 'availed')) DEFAULT 'listed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "blog_categories" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "blogs" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  category INTEGER[] NOT NULL DEFAULT '{}',
  attachments TEXT[] NOT NULL DEFAULT '{}',
  featured_image VARCHAR(255),
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  is_added_by_admin BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "roles" (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
tag TEXT,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "care_givers" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  recipient_first_name VARCHAR(255),
  recipient_last_name VARCHAR(255),
  recipient_email VARCHAR(255),
  role_id INTEGER,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
