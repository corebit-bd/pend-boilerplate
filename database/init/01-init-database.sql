-- PostgreSQL Initialization Script for NeXuS PEND Boilerplate
-- This Script runs automatically when PostgreSQL Container first starts

-- Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- UUID Generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Trigram Matching for Fuzzy Search
CREATE EXTENSION IF NOT EXISTS "unaccent";       -- Remove Accents from Text

-- Custom Schemas for Organization
CREATE SCHEMA IF NOT EXISTS auth;                -- Authentication Tables
CREATE SCHEMA IF NOT EXISTS tenant;              -- Multi-Tenant Tables
CREATE SCHEMA IF NOT EXISTS audit;               -- Audit Logging Tables

-- Grant Usage on Schemas to the Application User (postgres)
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT USAGE ON SCHEMA tenant TO postgres;
GRANT USAGE ON SCHEMA audit TO postgres;

-- Grant All Privileges on Schemas to the Application User (postgres)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA audit TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA audit TO postgres;

-- Set Default Privileges for Future Tables
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT ALL ON SEQUENCES TO postgres;

-- Audit Log Function for Tracking Changes
CREATE OR REPLACE FUNCTION audit.log_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = "INSERT" THEN
        INSERT INTO audit.change_log (
            table_name,
            operation,
            new_data,
            changed_at
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            row_to_json(NEW),
            NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = "UPDATE" THEN
        INSERT INTO audit.change_log (
            table_name,
            operation,
            old_data,
            new_data,
            changed_at
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            row_to_json(OLD),
            row_to_json(NEW),
            NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = "DELETE" THEN
        INSERT INTO audit.change_log (
            table_name,
            operation,
            old_data,
            changed_at
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            row_to_json(OLD),
            NOW()
        );
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Audit Log Table (This will be used by Django [If Needed])
CREATE TABLE IF NOT EXISTS audit.change_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    changed_by VARCHAR(255)
);

-- Index for better Query Performance
CREATE INDEX IF NOT EXISTS idx_change_log_table_name ON audit.change_log(table_name);
CREATE INDEX IF NOT EXISTS idx_change_log_changed_at ON audit.change_log(changed_at);

-- Log of Successful Initialization
DO $$
BEGIN
    RAISE NOTICE '✅ Database Initialization Completed Successfully';
    RAISE NOTICE '✅ Extensions Enabled : uuid-ossp, pg_trgm, unaccent';
    RAISE NOTICE '✅ Schemas Created : auth, tenant, audit';
    RAISE NOTICE '✅ Audit Logging Function Created Successfully';
END $$;