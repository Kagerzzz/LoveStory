-- ============================================================================
-- Supabase PostgreSQL Schema & Security Policies for LoveStory (Hiếu & Linh)
-- Bảng: memories (Góc Kỷ Niệm Polaroid) & love_notes (Bảng Lời Nhắn)
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

-- Kích hoạt Row Level Security (RLS) cho memories
alter table memories enable row level security;

drop policy if exists "Public can read memories" on memories;
drop policy if exists "Public can insert memories" on memories;
drop policy if exists "Public can update memories" on memories;
drop policy if exists "Public can delete memories" on memories;

create policy "Public can read memories" on memories for select using (true);
create policy "Public can insert memories" on memories for insert with check (true);
create policy "Public can update memories" on memories for update using (true);
create policy "Public can delete memories" on memories for delete using (true);

-- 2. Tạo bảng love_notes lưu trữ lời nhắn yêu thương
create table if not exists love_notes (
  id uuid default gen_random_uuid() primary key,
  author text not null,
  content text not null,
  text text,
  date text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Kích hoạt Row Level Security (RLS) cho love_notes
alter table love_notes enable row level security;

drop policy if exists "Public can read love_notes" on love_notes;
drop policy if exists "Public can insert love_notes" on love_notes;
drop policy if exists "Public can update love_notes" on love_notes;
drop policy if exists "Public can delete love_notes" on love_notes;

create policy "Public can read love_notes" on love_notes for select using (true);
create policy "Public can insert love_notes" on love_notes for insert with check (true);
create policy "Public can update love_notes" on love_notes for update using (true);
create policy "Public can delete love_notes" on love_notes for delete using (true);

-- 3. Lưu trữ cấu hình bài hát YouTube (Đồng bộ Realtime):
-- Hệ thống tự động đồng bộ qua bản ghi author = '__CONFIG_MUSIC__' trong bảng love_notes.
-- Tùy chọn (Nếu muốn dùng bảng riêng biệt):
create table if not exists music_settings (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  video_id text not null,
  title text default 'YouTube Music',
  artist text default '',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table music_settings enable row level security;
create policy "Public can read music_settings" on music_settings for select using (true);
create policy "Public can insert music_settings" on music_settings for insert with check (true);
create policy "Public can update music_settings" on music_settings for update using (true);
