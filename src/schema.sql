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
  name text not null,
  phone text,
  address text,
  place text,
  private_notes text,
  active boolean not null default true
);

create table item_categories (
  id uuid primary key,
  name text not null,
  purity text,
  default_tax_rate numeric(5, 2) not null default 3.00
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

create index idx_rate_history_active on rate_history(branch_id, commodity, grade, effective_at desc);
create index idx_invoices_year on invoices(branch_id, financial_year, created_at desc);
create index idx_stock_year on stock_items(branch_id, financial_year, status);
create index idx_journal_year on journal_entries(branch_id, financial_year, entry_date);
