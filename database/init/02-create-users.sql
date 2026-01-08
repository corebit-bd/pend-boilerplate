-- Creation of Database Users with Appropriate Permissions

-- Note : In Production Environment, Use STRONG Passwords from Environment Variables
-- These are Development Environment Defaults Only

-- Creation of Read-Only User for Reporting / Analytics
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'pend_readonly') THEN
        CREATE USER pend_readonly WITH PASSWORD 'readonly_pass_change_me';
    END IF;
END $$;

-- Creation of Application User for Django (Backup, Not Default "postgres" User)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'pend_app_user') THEN
        CREATE USER pend_app_user WITH PASSWORD 'app_user_pass_change_me';
    END IF;
END $$;

-- Grant Database Connection Privileges
GRANT CONNECT ON DATABASE pend TO pend_readonly;
GRANT CONNECT ON DATABASE pend TO pend_app_user;

-- Grant Schema Usage
GRANT USAGE ON SCHEMA public TO pend_readonly;
GRANT USAGE ON SCHEMA public TO pend_app_user;
GRANT USAGE ON SCHEMA auth TO pend_readonly;
GRANT USAGE ON SCHEMA auth TO pend_app_user;
GRANT USAGE ON SCHEMA tenant TO pend_readonly;
GRANT USAGE ON SCHEMA tenant TO pend_app_user;
GRANT USAGE ON SCHEMA audit TO pend_readonly;
GRANT USAGE ON SCHEMA audit TO pend_app_user;

-- Grant SELECT Privileges to Read-Only User
GRANT SELECT ON ALL TABLES IN SCHEMA public TO pend_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO pend_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA tenant TO pend_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA audit TO pend_readonly;

-- Grant All Privileges to Application User
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA auth TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA audit TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA auth TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant TO pend_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA audit TO pend_app_user;

-- Set Default Privileges for Future Objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO pend_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT ON TABLES TO pend_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant GRANT SELECT ON TABLES TO pend_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT SELECT ON TABLES TO pend_readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON TABLES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant GRANT ALL ON TABLES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT ALL ON TABLES TO pend_app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON SEQUENCES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant GRANT ALL ON SEQUENCES TO pend_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT ALL ON SEQUENCES TO pend_app_user;

-- Log User Creation
DO $$
BEGIN
    RAISE NOTICE '✅ Database Users Completed Successfully';
    RAISE NOTICE '✅ Read-Only User : pend_readonly';
    RAISE NOTICE '✅ Application User : pend_app_user';
    RAISE NOTICE '⚠️ WARNING : Change Default Passwords in Production Environment!';
END $$;