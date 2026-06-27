create table branches (
  id uuid primary key,
  name text not null,
  address text,
  active boolean not null default true
);

create table roles (
  id uuid primary key,
  name text not null unique
);

create table users (
  id uuid primary key,
  role_id uuid not null references roles(id),
  name text not null,
  username text not null unique,
  password_hash text not null,
  active boolean not null default true,
  last_login_at timestamptz
);

create table audit_logs (
  id uuid primary key,
  branch_id uuid references branches(id),
  user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);

create table rate_history (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  commodity text not null,
  grade text not null,
  old_rate numeric(14, 4),
  new_rate numeric(14, 4) not null,
  unit text not null default 'gram',
  reason text,
  approved_by uuid not null references users(id),
  effective_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table parties (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  party_type text not null,
  customer_code text,
  name text not null,
  opening_balance numeric(14, 2) not null default 0,
  balance_type text not null default 'Dr',
  opening_weight numeric(14, 3) not null default 0,
  weight_type text not null default 'Give',
  phone text,
  mobile text,
  email text,
  address text,
  city text,
  place text,
  state_province text not null default 'KERALA',
  country text not null default 'INDIA',
  pan_gst text,
  gstin text,
  fax text,
  website text,
  pin_code text,
  aadhaar text,
  agent text,
  date_of_birth date,
  join_date date,
  opening_date date,
  touch numeric(8, 2),
  converted_touch numeric(8, 2),
  wastage numeric(8, 3),
  private_notes text,
  active boolean not null default true
);

create table employees (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  employee_code text not null unique,
  employee_name text not null,
  designation text,
  opening_balance numeric(14, 2) not null default 0,
  balance_type text not null default 'Dr',
  opening_date date,
  address text,
  city text,
  place text,
  state_province text not null default 'KERALA',
  country text not null default 'INDIA',
  mobile text,
  point_card_no text,
  basic_salary numeric(14, 2) not null default 0,
  ta numeric(14, 2) not null default 0,
  da numeric(14, 2) not null default 0,
  hra numeric(14, 2) not null default 0,
  status text not null default 'Active',
  date_of_birth date,
  date_of_join date
);

create table account_masters (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  account_code text not null unique,
  account_name text not null,
  alias_name text,
  sub_schedule text,
  opening_balance numeric(14, 2) not null default 0,
  balance_type text not null default 'Dr',
  opening_date date,
  status text not null default 'ACTIVE',
  cost_center text,
  mobile text,
  admin_only boolean not null default false
);

create table item_categories (
  id uuid primary key,
  name text not null,
  purity text,
  default_tax_rate numeric(5, 2) not null default 3.00
);

create table item_category_products (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  product_code text not null,
  product_name text not null,
  description text,
  status text not null default 'Active'
);

create table item_category_brands (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  brand_code text not null,
  brand_name text not null,
  description text,
  status text not null default 'Active'
);

create table item_category_models (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  model_code text not null,
  model_name text not null,
  description text,
  status text not null default 'Active'
);

create table item_category_units (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  unit_code text not null,
  unit_name text not null
);

create table item_category_sub_groups (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  subgroup_code text not null,
  subgroup_name text not null,
  remarks text
);

create table item_category_prefixes (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  line_no integer not null,
  description text not null,
  prefix text
);

create table miscellaneous_masters (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  master_type text not null,
  code text not null,
  name text,
  description text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'Active',
  unique(branch_id, master_type, code)
);

create table item_masters (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  item_code text not null unique,
  item_name text not null,
  regional_name text,
  sub_group text,
  product text not null default 'Gold',
  brand text,
  model text,
  hsn_tax text,
  type_wastage text,
  wastage numeric(8, 3) not null default 0,
  va_percent numeric(8, 2) not null default 0,
  mc_per_gram numeric(14, 3) not null default 0,
  opening_nos numeric(12, 3) not null default 0,
  opening_gross_weight numeric(14, 3) not null default 0,
  opening_stone_weight numeric(14, 3) not null default 0,
  opening_net_weight numeric(14, 3) not null default 0,
  opening_date date,
  item_stock_touch numeric(8, 3) not null default 0,
  closing_nos numeric(12, 3) not null default 0,
  closing_gross_weight numeric(14, 3) not null default 0,
  closing_stone_weight numeric(14, 3) not null default 0,
  closing_net_weight numeric(14, 3) not null default 0,
  closing_stock_touch numeric(8, 3) not null default 0,
  ornament boolean not null default true,
  barcode_compulsory boolean not null default false,
  reserved_item boolean not null default false,
  hide_in_stock_reports boolean not null default false,
  active boolean not null default true
);

create table stock_items (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  category_id uuid references item_categories(id),
  item_name text not null,
  purity text not null,
  huid text,
  barcode text,
  qty numeric(12, 3) not null default 1,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  diamond_carat numeric(14, 3) not null default 0,
  status text not null default 'ready',
  financial_year text not null
);

create table stock_movements (
  id uuid primary key,
  stock_item_id uuid references stock_items(id),
  movement_type text not null,
  ref_type text,
  ref_id uuid,
  gross_delta numeric(14, 3) not null,
  qty_delta numeric(12, 3) not null,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table invoices (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  invoice_no text not null unique,
  invoice_type text not null,
  party_id uuid references parties(id),
  rate_snapshot jsonb not null,
  subtotal numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  tax_amount numeric(14, 2) not null default 0,
  total numeric(14, 2) not null,
  paid numeric(14, 2) not null default 0,
  status text not null default 'posted',
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table invoice_lines (
  id uuid primary key,
  invoice_id uuid not null references invoices(id),
  stock_item_id uuid references stock_items(id),
  description text not null,
  purity text,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  making_charge numeric(14, 2) not null default 0,
  wastage_percent numeric(6, 3) not null default 0,
  tax_rate numeric(5, 2) not null default 3.00,
  line_total numeric(14, 2) not null
);

create table sales_order_advances (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  sales_order_id text not null,
  order_entry_no text,
  order_ref_no text,
  entry_no text,
  ref_no text,
  entry_date date not null,
  entry_time time,
  prepared_by text,
  payment_mode text not null default 'Cash',
  cash_bank text,
  gold_rate_gram numeric(14, 3) not null default 0,
  gold_rate_eight_gram numeric(14, 3) not null default 0,
  advance_amount numeric(14, 3) not null default 0,
  advance_weight numeric(14, 3) not null default 0,
  exchange_amount numeric(14, 3) not null default 0,
  exchange_weight numeric(14, 3) not null default 0,
  total_amount numeric(14, 3) not null default 0,
  total_weight numeric(14, 3) not null default 0,
  remarks text,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table sales_order_advance_refunds (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  sales_order_id text not null,
  order_entry_no text,
  order_ref_no text,
  entry_no text,
  ref_no text,
  entry_date date not null,
  entry_time time,
  prepared_by text,
  gold_rate_gram numeric(14, 3) not null default 0,
  gold_rate_eight_gram numeric(14, 3) not null default 0,
  refund_amount numeric(14, 3) not null default 0,
  refund_weight numeric(14, 3) not null default 0,
  remarks text,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table dmd_return_invoices (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  prepared_by uuid references employees(id),
  party_id uuid references parties(id),
  payment_mode text not null default 'Cash',
  gstin text,
  pan_card_no text,
  sales_total numeric(14, 2) not null default 0,
  certification numeric(14, 2) not null default 0,
  huid_charge numeric(14, 2) not null default 0,
  gst_rate numeric(5, 2) not null default 3.00,
  gst_amount numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  sub_total numeric(14, 2) not null default 0,
  tds_tcs numeric(14, 2) not null default 0,
  bill_amount numeric(14, 2) not null default 0,
  cash numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table dmd_return_lines (
  id uuid primary key,
  dmd_return_invoice_id uuid not null references dmd_return_invoices(id),
  stock_item_id uuid references stock_items(id),
  item_id text,
  item_name text,
  barcode text,
  item_description text,
  qty numeric(12, 3) not null default 1,
  gross_weight numeric(14, 3) not null default 0,
  previous_weight numeric(14, 3) not null default 0,
  diamond_weight_cent numeric(14, 3) not null default 0,
  color_stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  pure_weight numeric(14, 3) not null default 0,
  rate_rtgs numeric(14, 4) not null default 0,
  carat_cent_rate numeric(14, 4) not null default 0,
  diamond_amount numeric(14, 2) not null default 0,
  mc_per_gram numeric(14, 2) not null default 0,
  making_charge numeric(14, 2) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table dmd_sales_wholesale_invoices (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  invoice_no text,
  invoice_date date,
  party_id uuid references parties(id),
  party_name text,
  prepared_by uuid references employees(id),
  add_to_stock boolean not null default true,
  bill_amount numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  diamond_amount numeric(14, 2) not null default 0,
  gst_rate numeric(5, 2) not null default 3.00,
  gst_amount numeric(14, 2) not null default 0,
  invoice_total numeric(14, 2) not null default 0,
  cash_payment numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table dmd_sales_wholesale_lines (
  id uuid primary key,
  dmd_sales_wholesale_invoice_id uuid not null references dmd_sales_wholesale_invoices(id),
  stock_item_id uuid references stock_items(id),
  item_id text,
  item_name text,
  item_description text,
  barcode text,
  nos numeric(12, 3) not null default 1,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  stone_price numeric(14, 2) not null default 0,
  va_percent numeric(8, 3) not null default 0,
  gold_type text,
  sales_type text not null default 'Weight',
  gold_rate numeric(14, 4) not null default 0,
  gold_amount numeric(14, 2) not null default 0,
  diamond_weight numeric(14, 3) not null default 0,
  stone_selling_price numeric(14, 2) not null default 0,
  purchase_mc numeric(14, 2) not null default 0,
  sales_mc numeric(14, 2) not null default 0,
  sales_amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table dmd_sales_wholesale_stones (
  id uuid primary key,
  dmd_sales_wholesale_invoice_id uuid not null references dmd_sales_wholesale_invoices(id),
  barcode text,
  color_type text,
  color_scale text,
  shape text,
  cut text,
  clarity text,
  sieve_size text,
  carat_cent numeric(14, 3) not null default 0,
  ct text,
  pcs numeric(12, 3) not null default 0,
  purchase_rate numeric(14, 2) not null default 0,
  selling_rate numeric(14, 2) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table smith_work_orders (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  payment_mode text not null default 'Credit',
  trans_type text not null default 'Normal',
  taxable boolean not null default false,
  skip_stone boolean not null default true,
  item_touch boolean not null default false,
  smith_party_id uuid references parties(id),
  smith_code text,
  smith_name text,
  prepared_by uuid references employees(id),
  post_only_mc boolean not null default true,
  show_rate boolean not null default false,
  gold_rate numeric(14, 4) not null default 0,
  total_in_qty numeric(12, 3) not null default 0,
  total_in_weight numeric(14, 3) not null default 0,
  total_out_qty numeric(12, 3) not null default 0,
  total_out_weight numeric(14, 3) not null default 0,
  smith_weight numeric(14, 3) not null default 0,
  stone_amount numeric(14, 2) not null default 0,
  smith_mc numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  gst_percent numeric(6, 2) not null default 0,
  gst_amount numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  net_total numeric(14, 2) not null default 0,
  cash_payment numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remarks text,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table smith_work_order_lines (
  id uuid primary key,
  smith_work_order_id uuid not null references smith_work_orders(id) on delete cascade,
  barcode text,
  item_name text,
  mode text not null default 'IN',
  nos numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  wastage numeric(8, 3) not null default 0,
  smith_weight numeric(14, 3) not null default 0,
  stone_charge numeric(14, 2) not null default 0,
  mc_per_gram numeric(14, 3) not null default 0,
  making_charge numeric(14, 2) not null default 0,
  hmc numeric(14, 2) not null default 0,
  rate numeric(14, 4) not null default 0,
  mud_less numeric(14, 3) not null default 0,
  total numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table cash_weight_smith_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  mode text not null default 'Payment',
  party_type text not null default 'Smith',
  on_account boolean not null default false,
  smith_party_id uuid references parties(id),
  party_code text,
  party_name text,
  prepared_by uuid references employees(id),
  cash_bank_code text,
  cash_bank text,
  gold_rate numeric(14, 4) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  total_weight numeric(14, 3) not null default 0,
  total_net_weight numeric(14, 3) not null default 0,
  remarks text,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table cash_weight_smith_lines (
  id uuid primary key,
  cash_weight_smith_entry_id uuid not null references cash_weight_smith_entries(id) on delete cascade,
  amount numeric(14, 2) not null default 0,
  rate numeric(14, 4) not null default 0,
  weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 99.5,
  convert_touch numeric(8, 3) not null default 100,
  net_weight numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table jeweller_work_orders (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  payment_mode text not null default 'Credit',
  trans_type text not null default 'Normal Work',
  jeweller_checked boolean not null default false,
  skip_stone boolean not null default true,
  item_touch boolean not null default false,
  jeweller_party_id uuid references parties(id),
  jeweller_code text,
  jeweller_name text,
  prepared_by uuid references employees(id),
  export_enabled boolean not null default false,
  auto_barcode boolean not null default false,
  show_rate boolean not null default false,
  ledger_post boolean not null default false,
  gold_rate numeric(14, 4) not null default 0,
  total_in_qty numeric(12, 3) not null default 0,
  total_in_weight numeric(14, 3) not null default 0,
  total_out_qty numeric(12, 3) not null default 0,
  total_out_weight numeric(14, 3) not null default 0,
  jeweller_weight numeric(14, 3) not null default 0,
  jeweller_mc numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  gst_percent numeric(6, 2) not null default 0,
  gst_amount numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  net_total numeric(14, 2) not null default 0,
  cash_payment numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remarks text,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table jeweller_work_order_lines (
  id uuid primary key,
  jeweller_work_order_id uuid not null references jeweller_work_orders(id) on delete cascade,
  barcode text,
  item_name text,
  mode text not null default 'OUT',
  nos numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  wastage numeric(8, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  jeweller_weight numeric(14, 3) not null default 0,
  stone_charge numeric(14, 2) not null default 0,
  mc_per_gram numeric(14, 3) not null default 0,
  va_percent numeric(8, 3) not null default 0,
  mc_amount numeric(14, 2) not null default 0,
  hmc numeric(14, 2) not null default 0,
  rate numeric(14, 4) not null default 0,
  mud_less numeric(14, 3) not null default 0,
  pure_weight numeric(14, 3) not null default 0,
  total numeric(14, 2) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  i_code text,
  item_id text,
  bar_slno text,
  g_type text,
  i_type text,
  description text,
  active boolean not null default true
);

create table cash_weight_jeweller_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  mode text not null default 'Payment',
  party_type text not null default 'Jeweller',
  on_account boolean not null default false,
  jeweller_party_id uuid references parties(id),
  party_code text,
  party_name text,
  prepared_by uuid references employees(id),
  cash_bank_code text,
  cash_bank text,
  gold_rate numeric(14, 4) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  total_weight numeric(14, 3) not null default 0,
  total_net_weight numeric(14, 3) not null default 0,
  remarks text,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table cash_weight_jeweller_lines (
  id uuid primary key,
  cash_weight_jeweller_entry_id uuid not null references cash_weight_jeweller_entries(id) on delete cascade,
  amount numeric(14, 2) not null default 0,
  rate numeric(14, 4) not null default 0,
  weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 99.5,
  convert_touch numeric(8, 3) not null default 100,
  net_weight numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table stock_adjustments (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  adjustment_date date not null,
  adjustment_time time,
  prepared_by uuid references employees(id),
  reason text,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table stock_adjustment_lines (
  id uuid primary key,
  stock_adjustment_id uuid not null references stock_adjustments(id) on delete cascade,
  adjustment_type text not null default 'Barcode Only',
  barcode text,
  item_name text,
  nos numeric(14, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  nos_add numeric(14, 3) not null default 0,
  gross_add numeric(14, 3) not null default 0,
  stone_add numeric(14, 3) not null default 0,
  nos_less numeric(14, 3) not null default 0,
  gross_less numeric(14, 3) not null default 0,
  stone_less numeric(14, 3) not null default 0,
  closing_nos numeric(14, 3) not null default 0,
  closing_gross numeric(14, 3) not null default 0,
  closing_stone numeric(14, 3) not null default 0,
  closing_net numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table opening_stock_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  opening_date date not null,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null,
  unique (branch_id, opening_date)
);

create table opening_stock_lines (
  id uuid primary key,
  opening_stock_entry_id uuid not null references opening_stock_entries(id) on delete cascade,
  line_no integer not null default 1,
  description text not null,
  weight numeric(14, 3) not null default 0,
  stone numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  amount numeric(14, 2) not null default 0,
  purity_percent numeric(8, 3) not null default 0,
  pure_weight numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table gold_deposits (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  deposit_type text not null default 'Deposit',
  entry_no text not null,
  ref_no text,
  tx_date date not null,
  tx_time time,
  by_amount boolean not null default false,
  party_name text,
  prepared_by uuid references employees(id),
  remarks text,
  due_date date,
  balance_weight numeric(14, 3) not null default 0,
  balance_amount numeric(14, 2) not null default 0,
  total_weight numeric(14, 3) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  status text not null default 'posted',
  created_at timestamptz not null default now(),
  financial_year text not null,
  unique (branch_id, deposit_type, entry_no, financial_year)
);

create table gold_deposit_lines (
  id uuid primary key,
  gold_deposit_id uuid not null references gold_deposits(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  item_name text not null,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  mudless numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  party_weight numeric(14, 3) not null default 0,
  rate numeric(14, 2) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table sample_issues (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  issue_date date not null,
  issue_time time,
  sample_code text,
  jeweller_party_id uuid references parties(id),
  jeweller_name text,
  prepared_by uuid references employees(id),
  remarks text,
  show_rate boolean not null default false,
  total_amount numeric(14, 2) not null default 0,
  status text not null default 'issued',
  created_at timestamptz not null default now(),
  financial_year text not null,
  unique (branch_id, entry_no, financial_year)
);

create table sample_issue_lines (
  id uuid primary key,
  sample_issue_id uuid not null references sample_issues(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  barcode text,
  item_name text,
  qty numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  hmc numeric(14, 2) not null default 0,
  tax_percent numeric(8, 3) not null default 0,
  tax_amount numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table sample_returns (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  return_date date not null,
  return_time time,
  sample_code text,
  jeweller_party_id uuid references parties(id),
  jeweller_name text,
  prepared_by uuid references employees(id),
  remarks text,
  show_rate boolean not null default false,
  total_amount numeric(14, 2) not null default 0,
  status text not null default 'returned',
  created_at timestamptz not null default now(),
  financial_year text not null,
  unique (branch_id, entry_no, financial_year)
);

create table sample_return_lines (
  id uuid primary key,
  sample_return_id uuid not null references sample_returns(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  barcode text,
  item_name text,
  qty numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  hmc numeric(14, 2) not null default 0,
  tax_percent numeric(8, 3) not null default 0,
  tax_amount numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table refinery_issues (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  issue_date date not null,
  issue_time time,
  expected_touch numeric(8, 3) not null default 0,
  metal_type text not null default 'Gold',
  refiner_party_id uuid references parties(id),
  refiner_name text,
  prepared_by uuid references employees(id),
  remark text,
  issue_weight numeric(14, 3) not null default 0,
  issue_amount numeric(14, 2) not null default 0,
  status text not null default 'issued',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table refinery_issue_lines (
  id uuid primary key,
  refinery_issue_id uuid not null references refinery_issues(id) on delete cascade,
  item_id text,
  item_name text,
  qty numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table refinery_returns (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  pending_refinery_issue_id uuid references refinery_issues(id),
  entry_no text not null,
  ref_no text,
  return_date date not null,
  return_time time,
  prepared_by uuid references employees(id),
  remark text,
  issued_weight numeric(14, 3) not null default 0,
  melting_loss numeric(14, 3) not null default 0,
  received_weight numeric(14, 3) not null default 0,
  bottle_stock_weight numeric(14, 3) not null default 0,
  test_weight numeric(14, 3) not null default 0,
  reissue_weight numeric(14, 3) not null default 0,
  status text not null default 'returned',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table refinery_return_lines (
  id uuid primary key,
  refinery_return_id uuid not null references refinery_returns(id) on delete cascade,
  item_name text,
  issued_weight numeric(14, 3) not null default 0,
  melting_loss numeric(14, 3) not null default 0,
  received_weight numeric(14, 3) not null default 0,
  bottle_stock_weight numeric(14, 3) not null default 0,
  test_weight numeric(14, 3) not null default 0,
  reissue_weight numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table refinery_final_returns (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  pending_refinery_issue_id uuid references refinery_issues(id),
  entry_no text not null,
  ref_no text,
  final_date date not null,
  final_time time,
  expected_touch numeric(8, 3) not null default 0,
  diff_touch numeric(8, 3) not null default 0,
  prepared_by uuid references employees(id),
  remark text,
  refiner_charge numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  refined_amount numeric(14, 2) not null default 0,
  cash_paid numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  status text not null default 'final_returned',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table refinery_final_return_lines (
  id uuid primary key,
  refinery_final_return_id uuid not null references refinery_final_returns(id) on delete cascade,
  item_name text,
  received_weight numeric(14, 3) not null default 0,
  aciding_loss numeric(14, 3) not null default 0,
  test_weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  bottle_stock_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table melting_issues (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  issue_date date not null,
  issue_time time,
  issue_type text not null default 'Melting',
  refiner_party_id uuid references parties(id),
  refiner_name text,
  prepared_by uuid references employees(id),
  issue_weight numeric(14, 3) not null default 0,
  issue_amount numeric(14, 2) not null default 0,
  status text not null default 'issued',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table melting_issue_lines (
  id uuid primary key,
  melting_issue_id uuid not null references melting_issues(id) on delete cascade,
  item_id text,
  item_name text,
  qty numeric(12, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table melting_returns (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  pending_melting_issue_id uuid references melting_issues(id),
  entry_no text not null,
  ref_no text,
  return_date date not null,
  return_time time,
  prepared_by uuid references employees(id),
  remark text,
  refiner_charge numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  cash_paid numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  status text not null default 'returned',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table melting_return_lines (
  id uuid primary key,
  melting_return_id uuid not null references melting_returns(id) on delete cascade,
  item_name text,
  issued_weight numeric(14, 3) not null default 0,
  melting_loss numeric(14, 3) not null default 0,
  test_weight numeric(14, 3) not null default 0,
  received_weight numeric(14, 3) not null default 0,
  touch numeric(8, 3) not null default 0,
  rate numeric(14, 4) not null default 0,
  bottle_stock_weight numeric(14, 3) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create table billwise_collections (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  collection_date date not null,
  collection_time time,
  customer_name text,
  payment_mode text not null default 'Cash',
  cost_center text,
  cash_code text,
  cash_account text,
  prepared_by uuid references employees(id),
  collection_amount numeric(14, 2) not null default 0,
  collection_reference numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table billwise_collection_lines (
  id uuid primary key,
  billwise_collection_id uuid not null references billwise_collections(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  total_received numeric(14, 2) not null default 0,
  old_credit_note numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text
);

create table billwise_payments (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  payment_date date not null,
  payment_time time,
  party_name text,
  cost_center text,
  cash_account text,
  prepared_by uuid references employees(id),
  received_by uuid references employees(id),
  paid_amount numeric(14, 2) not null default 0,
  paid_reference numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table billwise_payment_lines (
  id uuid primary key,
  billwise_payment_id uuid not null references billwise_payments(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  total_paid numeric(14, 2) not null default 0,
  dnd numeric(14, 2) not null default 0,
  paid numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text
);

create table billwise_credit_note_discounts (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  discount_date date not null,
  discount_time time,
  party_name text,
  discount_account text not null default 'Discount',
  prepared_by uuid references employees(id),
  received_by uuid references employees(id),
  paid_amount numeric(14, 2) not null default 0,
  paid_reference numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table billwise_credit_note_discount_lines (
  id uuid primary key,
  billwise_credit_note_discount_id uuid not null references billwise_credit_note_discounts(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  paid numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text
);

create table billwise_debit_note_discounts (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  discount_date date not null,
  discount_time time,
  party_name text,
  discount_account text not null default 'Discount',
  prepared_by uuid references employees(id),
  received_by uuid references employees(id),
  paid_amount numeric(14, 2) not null default 0,
  paid_reference numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table billwise_debit_note_discount_lines (
  id uuid primary key,
  billwise_debit_note_discount_id uuid not null references billwise_debit_note_discounts(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  total_paid numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text
);

create table complimentary_item_stock (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  item_id text not null,
  item_name text not null,
  unit text not null default 'Nos',
  purchased_qty numeric(14, 3) not null default 0,
  issued_qty numeric(14, 3) not null default 0,
  balance_qty numeric(14, 3) not null default 0,
  updated_at timestamptz not null default now()
);

create table complimentary_item_purchases (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  purchase_date date not null,
  purchase_time time,
  mode text not null default 'Credit',
  party_id uuid references parties(id),
  party_name text,
  address text,
  prepared_by uuid references employees(id),
  bill_amount numeric(14, 2) not null default 0,
  addition numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  invoice_total numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table complimentary_item_purchase_lines (
  id uuid primary key,
  complimentary_item_purchase_id uuid not null references complimentary_item_purchases(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  item_name text not null,
  quantity numeric(14, 3) not null default 0,
  unit text not null default 'Nos',
  foc numeric(14, 3) not null default 0,
  price numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0
);

create table complimentary_item_issues (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  issue_date date not null,
  issue_time time,
  issue_type text not null default 'Sales / Issue',
  invoice_no text,
  prepared_by uuid references employees(id),
  remarks text,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table complimentary_item_issue_lines (
  id uuid primary key,
  complimentary_item_issue_id uuid not null references complimentary_item_issues(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  item_name text not null,
  quantity numeric(14, 3) not null default 0,
  unit text not null default 'Nos'
);

create table bank_transactions (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  transaction_type text not null check (transaction_type in ('deposit', 'withdrawal')),
  voucher_no text,
  ref_no text,
  transaction_date date not null,
  transaction_time time,
  prepared_by uuid references employees(id),
  cost_center text,
  bank_account text not null,
  handled_by uuid references employees(id),
  show_all_account boolean not null default false,
  no_print boolean not null default false,
  rate_fixed boolean not null default false,
  narration text,
  total_amount numeric(14, 3) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table bank_transaction_lines (
  id uuid primary key,
  bank_transaction_id uuid not null references bank_transactions(id) on delete cascade,
  line_no integer not null default 1,
  head_id text,
  account_head text not null,
  amount numeric(14, 3) not null default 0,
  remarks text,
  voucher_no text,
  voucher_date date
);

create table pdc_receipts (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text,
  ref_no text,
  receipt_date date not null,
  receipt_time time,
  cheque_no text,
  cheque_date date not null,
  cheque_amount numeric(14, 2) not null default 0,
  party_code text,
  party_name text,
  prepared_by uuid references employees(id),
  prepared_by_code text,
  received_by uuid references employees(id),
  received_by_code text,
  total_received numeric(14, 2) not null default 0,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table pdc_receipt_lines (
  id uuid primary key,
  pdc_receipt_id uuid not null references pdc_receipts(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  paid numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text,
  cv_rid text
);

create table pdc_issues (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text,
  ref_no text,
  issue_date date not null,
  issue_time time,
  bank_name text,
  cheque_no text,
  cheque_date date,
  cheque_amount numeric(14, 2) not null default 0,
  party_code text,
  party_name text,
  prepared_by uuid references employees(id),
  prepared_by_code text,
  received_by uuid references employees(id),
  received_by_code text,
  total_amount numeric(14, 2) not null default 0,
  remark text,
  status text not null default 'issued',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table pdc_issue_lines (
  id uuid primary key,
  pdc_issue_id uuid not null references pdc_issues(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  paid numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text,
  cv_rid text
);

create table pdc_requests (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text,
  ref_no text,
  request_date date not null,
  request_time time,
  cheque_no text,
  cheque_date date,
  cheque_amount numeric(14, 2) not null default 0,
  party_code text,
  party_name text,
  prepared_by uuid references employees(id),
  prepared_by_code text,
  received_by uuid references employees(id),
  received_by_code text,
  total_amount numeric(14, 2) not null default 0,
  remark text,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table pdc_request_lines (
  id uuid primary key,
  pdc_request_id uuid not null references pdc_requests(id) on delete cascade,
  line_no integer not null default 1,
  invoice_no text,
  invoice_type text,
  invoice_date date,
  bill_amount numeric(14, 2) not null default 0,
  paid numeric(14, 2) not null default 0,
  received numeric(14, 2) not null default 0,
  balance numeric(14, 2) not null default 0,
  remark text,
  cv_rid text
);

create table cash_vouchers (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  voucher_type text not null check (voucher_type in ('receipt', 'payment')),
  voucher_no text,
  ref_no text,
  voucher_date date not null,
  voucher_time time,
  prepared_by uuid references employees(id),
  cost_center text,
  cash_account text not null default 'Cash in Hand',
  handled_by uuid references employees(id),
  opening_balance numeric(14, 3) not null default 0,
  show_all_account boolean not null default true,
  enable_cash_account boolean not null default false,
  no_print boolean not null default false,
  rate_fixed boolean not null default false,
  narration text,
  total_amount numeric(14, 3) not null default 0,
  closing_balance numeric(14, 3) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table cash_voucher_lines (
  id uuid primary key,
  cash_voucher_id uuid not null references cash_vouchers(id) on delete cascade,
  line_no integer not null default 1,
  head_id text,
  account_head text not null,
  amount numeric(14, 3) not null default 0,
  discount numeric(14, 3) not null default 0,
  remarks text,
  voucher_no text,
  voucher_date date
);

create table direct_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  mode text not null check (mode in ('Cash', 'Bank', 'Cash & Bank')),
  cost_center text,
  cash_bank text,
  prepared_by uuid references employees(id),
  repeat_last_head boolean not null default false,
  repeat_last_narration boolean not null default false,
  total_receipt numeric(14, 3) not null default 0,
  total_payment numeric(14, 3) not null default 0,
  balance numeric(14, 3) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table direct_entry_lines (
  id uuid primary key,
  direct_entry_id uuid not null references direct_entries(id) on delete cascade,
  line_no integer not null default 1,
  entry_date date not null,
  account_head text,
  receipt numeric(14, 3) not null default 0,
  payment numeric(14, 3) not null default 0,
  remark text
);

create table expense_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  cost_center text,
  cash_account text,
  remarks text,
  supplier text,
  gstin text,
  prepared_by uuid references employees(id),
  supplier_type text not null default 'Local',
  payment_mode text not null default 'Cash',
  bill_amount numeric(14, 3) not null default 0,
  gst_amount numeric(14, 3) not null default 0,
  tds_amount numeric(14, 3) not null default 0,
  invoice_total numeric(14, 3) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table expense_entry_lines (
  id uuid primary key,
  expense_entry_id uuid not null references expense_entries(id) on delete cascade,
  line_no integer not null default 1,
  ledger_head text,
  bill_no text,
  bill_date date,
  hsn_code text,
  taxable numeric(14, 3) not null default 0,
  gst numeric(14, 3) not null default 0,
  tds_percent numeric(7, 3) not null default 0,
  tds numeric(14, 3) not null default 0,
  total numeric(14, 3) not null default 0,
  remarks text
);

create table schemes (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  name text not null,
  monthly_amount numeric(14, 2),
  active boolean not null default true
);

create table scheme_members (
  id uuid primary key,
  scheme_id uuid not null references schemes(id),
  party_id uuid not null references parties(id),
  book_no text not null,
  join_date date not null,
  close_date date,
  status text not null default 'active'
);

create table scheme_collections (
  id uuid primary key,
  member_id uuid not null references scheme_members(id),
  amount numeric(14, 2) not null,
  collected_at timestamptz not null default now(),
  collected_by uuid references users(id),
  financial_year text not null
);

create table ledger_accounts (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  name text not null,
  account_type text not null,
  active boolean not null default true
);

create table journal_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  voucher_no text not null,
  entry_date date not null,
  narration text,
  source_type text,
  source_id uuid,
  created_by uuid references users(id),
  locked boolean not null default false,
  financial_year text not null
);

create table journal_lines (
  id uuid primary key,
  journal_entry_id uuid not null references journal_entries(id),
  ledger_account_id uuid not null references ledger_accounts(id),
  debit numeric(14, 2) not null default 0,
  credit numeric(14, 2) not null default 0
);

create table custom_vouchers (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  period_from date not null,
  period_to date not null,
  account_type text not null default 'Receivable',
  party_id uuid references parties(id),
  party_name text,
  prepared_by uuid references employees(id),
  confirm_before_delete boolean not null default true,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table custom_voucher_lines (
  id uuid primary key,
  custom_voucher_id uuid not null references custom_vouchers(id) on delete cascade,
  line_no integer not null default 1,
  description text not null,
  settlement_type text not null default 'One Time',
  amount numeric(14, 2) not null default 0,
  payment_date date not null,
  remarks text
);

create table polishing_entries (
  id uuid primary key,
  branch_id uuid not null references branches(id),
  entry_no text not null,
  ref_no text,
  entry_date date not null,
  entry_time time,
  party_id uuid references parties(id),
  party_name text,
  prepared_by uuid references employees(id),
  remarks text,
  total_qty numeric(14, 3) not null default 0,
  total_gross numeric(14, 3) not null default 0,
  total_stone numeric(14, 3) not null default 0,
  total_net numeric(14, 3) not null default 0,
  stone_amount numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  created_at timestamptz not null default now(),
  financial_year text not null
);

create table polishing_lines (
  id uuid primary key,
  polishing_entry_id uuid not null references polishing_entries(id) on delete cascade,
  line_no integer not null default 1,
  item_id text,
  barcode text,
  item_name text,
  qty numeric(14, 3) not null default 0,
  gross_weight numeric(14, 3) not null default 0,
  stone_weight numeric(14, 3) not null default 0,
  net_weight numeric(14, 3) not null default 0,
  active boolean not null default true
);

create table polishing_stones (
  id uuid primary key,
  polishing_entry_id uuid not null references polishing_entries(id) on delete cascade,
  line_no integer not null default 1,
  code text,
  barcode text,
  color_type text,
  color_scale text,
  shape text,
  cut text,
  clarity text,
  sieve_size text,
  carat_cent numeric(14, 3) not null default 0,
  ct_type text not null default 'Cnt',
  pcs numeric(14, 3) not null default 0,
  purchase_rate numeric(14, 2) not null default 0,
  selling_rate numeric(14, 2) not null default 0,
  amount numeric(14, 2) not null default 0,
  active boolean not null default true
);

create index idx_rate_history_active on rate_history(branch_id, commodity, grade, effective_at desc);
create index idx_item_masters_branch on item_masters(branch_id, product, item_name);
create index idx_invoices_year on invoices(branch_id, financial_year, created_at desc);
create index idx_stock_year on stock_items(branch_id, financial_year, status);
create index idx_journal_year on journal_entries(branch_id, financial_year, entry_date);
