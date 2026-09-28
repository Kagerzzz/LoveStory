/**
 * Supabase Client Configuration
 * Kết nối dự án Supabase cho ứng dụng Love Story (Hiếu & Linh)
 */

const SUPABASE_URL = 'https://euxinlkkbmnqhjdbvuij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGlubGtrYm1ucWhqZGJ2dWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NjY0NTUsImV4cCI6MjEwNjE0MjQ1NX0.JOyVo9kQigx4Gg5PxzV-B4ZX_xWbnaxJUFWgdS2NNEg';

// Khởi tạo Supabase Client
let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✨ [Supabase] Kết nối database thành công!');
  } catch (err) {
    console.error('⚠️ [Supabase] Lỗi khởi tạo Supabase client:', err);
  }
} else {
  console.warn('⚠️ [Supabase] Thư viện @supabase/supabase-js chưa sẵn sàng hoặc thiếu key.');
}
