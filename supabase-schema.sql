-- ============================================================================
-- Supabase PostgreSQL Schema & Security Policies for LoveStory (Hiếu & Linh)
-- Bảng: memories (Góc Kỷ Niệm Polaroid)
-- ============================================================================

-- 1. Tạo bảng memories lưu trữ kỷ niệm
create table if not exists memories (
  id uuid default gen_random_uuid() primary key,
  caption text not null,
  date text default '',
  image_url text not null,
  order_index int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Kích hoạt Row Level Security (RLS)
alter table memories enable row level security;

-- 3. Phân quyền bảo mật (Cho phép truy cập với Public Anon Key)
drop policy if exists "Public can read memories" on memories;
drop policy if exists "Public can insert memories" on memories;
drop policy if exists "Public can update memories" on memories;
drop policy if exists "Public can delete memories" on memories;

create policy "Public can read memories" 
  on memories for select using (true);

create policy "Public can insert memories" 
  on memories for insert with check (true);

create policy "Public can update memories" 
  on memories for update using (true);

create policy "Public can delete memories" 
  on memories for delete using (true);

-- 4. Dữ liệu kỷ niệm ban đầu (Seed Data)
-- (Bảng này đã được nạp tự động vào Supabase Database của bạn)
