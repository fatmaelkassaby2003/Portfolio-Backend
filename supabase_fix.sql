-- Run this in your Supabase SQL Editor to fix missing columns in all tables

-- 1. Fix Projects Table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[];

-- 2. Fix Services Table
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. Fix Skills Table
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS category TEXT;

-- 4. Refresh PostgREST schema cache (CRITICAL)
NOTIFY pgrst, 'reload schema';
