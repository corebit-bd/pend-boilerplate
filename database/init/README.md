# Database Initialization Scripts

## 📁 Directory Structure

```
database/
├── init/
│   ├── 01-init-database.sql      # Database Setup, Extensions, Schemas
│   ├── 02-create-users.sql       # User Creation & Permissions
│   └── README.md                 # This File
├── migrations/
│   └── .gitkeep                  # Django Migrations Go Here
└── backups/
    └── .gitkeep                  # Database Backups Stored Here
```

## 🚀 How It Works

PostgreSQL Docker Container automatically runs `.sql` scripts in the `init/` Directory **in alphabetical order** on first startup.

### Script Execution Order :
1. **`01-init-database.sql`** - Sets up Database Foundations
2. **`02-create-users.sql`** - Creates Application Users

## 📋 What Gets Created?

### Extensions :
- `uuid-ossp` - UUID Generation
- `pg_trgm` - Trigram Matching for Fuzzy Text Search
- `unaccent` - Remove Accents from Text for better Search

### Schemas :
- `auth` - Authentication-related Tables
- `tenant` - Multi-Tenant Data Separation
- `audit` - Change Tracking & Audit Logs

### Users :
- `postgres` - SuperUser (Default)
- `pend_app_user` - Application User with Full Privileges
- `pend_readonly` - Read-Only User for Reporting / Analytics

### Audit System :
- Audit Log Ttable in `audit.change_log`
- Trigger Function `audit.log_changes()` for Automatic Change Tracking

## 🔐 Security Notes

### Development Environment (Current) :
- Default Passwords are weak & for **Development Only**
- Users : `pend_app_user` / `pend_readonly`
- Passwords : `app_user_pass_change_me` / `readonly_pass_change_me`

### Production Environment :
**⚠️ CRITICAL** : Change All Passwords before Deployment!

Update in `docker-compose.yml` / `.env`:
```bash
POSTGRES_USER=your_secure_user
POSTGRES_PASSWORD=your_secure_password
DB_READONLY_PASSWORD=readonly_secure_password
DB_APP_PASSWORD=app_secure_password
```

## 🔄 Re-Initializing Database

If you need to reset the database :

```bash
# Stop & Remove Containers
docker-compose down -v

# Remove Volumes (THIS DELETES ALL DATA)
docker volume rm pend-boilerplate_postgres_data

# Start Fresh
docker-compose up -d postgres
```

The Initialization Scripts will run again automatically.

## 🛠️ Manual Script Execution

If you need to run Scripts manually :

```bash
# Connect to PostgreSQL Container
docker exec -it pend-boilerplate-postgres-1 psql -U postgres -d pend

# Run A Specific Script
docker exec -i pend-boilerplate-postgres-1 psql -U postgres -d pend < database/init/01-init-database.sql
```

## 📊 Verifying Setup

Check if everything is created correctly :

```sql
-- List All Extensions
SELECT * FROM pg_extension;

-- List All Schemas
SELECT schema_name FROM information_schema.schemata;

-- List All Users
SELECT usename, usesuper, usecreatedb FROM pg_user;

-- Check Audit Log Table
SELECT * FROM audit.change_log LIMIT 10;
```

## 📊 Verifying Database Setup

```bash
# Connect to PostgreSQL
docker exec -it pend_postgres psql -U postgres -d pend
```

Inside PostgreSQL
```sql
-- Check Extensions
\dx

-- Expected Output :
-- uuid-ossp, pg_trgm, unaccent ✅

-- Check Schemas
\dn

-- Expected Output :
-- auth, tenant, audit, public ✅

-- Check Users
\du

-- Expected Output :
-- postgres, pend_app_user, pend_readonly ✅

-- Check Audit Table Exists
\dt audit.*

-- Expected Output :
-- audit.change_log ✅

-- Verify Permissions for "pend_app_user"
\dp audit.change_log

-- Expected Output :
                                      Access privileges
 Schema |    Name    | Type  |        Access privileges        | Column privileges | Policies 
--------+------------+-------+---------------------------------+-------------------+----------
 audit  | change_log | table | postgres=arwdDxt/postgres      +|                   | 
        |            |       | pend_readonly=r/postgres      +|                   | 
        |            |       | pend_app_user=arwdDxt/postgres |                   | 
(1 row)

-- Exit PostgreSQL
\q
```

## 🔍 Troubleshooting

### Scripts Not Running ?
- Initialization Scripts only run on **First Startup** of a Fresh Database
- If Volume already exists, Scripts won't run
- **✅ Solution** : Remove Volume & Restart

### Permission Denied Errors ?
- Check User Permissions in `02-create-users.sql`
- Ensure User has Correct Schema Access

### Connection Refused ?
- Wait for PostgreSQL to Fully Start (10 - 15 Seconds)
- Check Docker Logs : `docker-compose logs postgres`

## 📝 Adding Custom Scripts

To Add Your Own Initialization Scripts :

1. Create a new `.sql` File in `database/init/`
2. Name it with a number prefix (for example, `03-my-script.sql`)
3. Scripts run in alphabetical order
4. Remove Volume & Restart to run new Scripts

Example :
```sql
-- database/init/03-custom-tables.sql
CREATE TABLE IF NOT EXISTS public.my_custom_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

## 🎯 Next Steps

After Database Initialization : 
1. Run Django Migrations : `python manage.py migrate`
2. Create Django SuperUser : `python manage.py createsuperuser`
3. Load Initial Data If Needed

## 📚 Additional Resources

- [PostgreSQL Extensions](https://www.postgresql.org/docs/current/contrib.html)
- [PostgreSQL Schemas](https://www.postgresql.org/docs/current/ddl-schemas.html)
- [PostgreSQL Users & Roles](https://www.postgresql.org/docs/current/user-manag.html)

---

**Note** : These Scripts are designed for the PEND boilerplate & it follows PostgreSQL Best Practices for Multi-Tenant Applications.