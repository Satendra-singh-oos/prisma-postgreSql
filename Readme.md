# Prisma & Postgres SQl Notes

---

### A Repo For Prisma And PostgresSql Nots

## - Why Not NoSQL

- NoSql are schemaless property which make it idel to for bootstrap the project fast. But as the application grow some property make it very easy for data to get curropt

- **Problem**
- 1. Can lead to inconsistent database
- 2.  Can cause runtime errors
- 3. Is too flexible for an app that needs strictness

`💡
You might think that mongoose does add strictness to the codebase because we used to define a schema there. 
That strictness is present at the Node.js level, not at the DB level. You can still put in erroneous data in the database that doesn’t follow that schema.`

## Why SQL?

SQL databases have a strict schema. They require you to

1.  Define your schema
2.  Put in data that follows that schema
3.  Update the schema as your app changes and perform migrations

## Why Postgresql

- Postgres is an object relational database that is just as fast as MySQL that adheres more closely to SQL standards and excels at concurrency.
- Postgres is also superior at avoiding data corruption. Postgres also provides more advanced data types and allows for the creation of custom types, operators and index types.

- Postgres is normally the best option when extensibility, scalability and data integrity are most important to you.

## Data Types

### Character Types

1. Char(5) : Stores up to a max number of 5 characters
2. Varchar : Store any length of characters
3. Varchar(20) : Store up to 20 characters
4. Text : Store any length of characters

### Numeric Types

- Serial : Whole numbers that also auto increment. Always used for column ids.

1. Smallserial : 1 to 32,767
2. Serial : 1 to 2147483647
3. Bigserial : 1 to 9223372036854775807

- Integer : Whole numbers only Always used when you don’t need a decimal

1. Smallint : -32,768 to 32, 767
2. Integer : -2,147,583,648 to 2,174,483,647
3. Bigint : -9223372036854775808 to 9223372036854775807

- Floats

1. Decimal : 131072 whole digits and 16383 after decimal
2. Numeric : 131072 whole digits and 16383 after decimal
3. Real : 1E-37 to 1E37 (6 places of precision)
4. Double Precision : 1E-307 to 1E308 (15 places of precision) Used when decimal doesn’t have to be very precise
5. Float : Same as double

- Boolean

(Highly recommended to use 'True' & 'False' instead of 0, 1, or other representations)

1. True, can be represented as 1, t, y, yes, on
2. False, can be represented as 0, f, n, no, off
3. null

- Date / Time

  DATE

1. No matter what format you enter you get this : 1974-12-21

   TIME

1. TIME WITHOUT TIME ZONE (Default)
1. ‘1:30:30 PM’:: TIME WITHOUT TIME ZONE -> 13:30:30
1. 01:30 AM EST -> 01:30-5:00 (UTC Format)
1. 01:30 PM PST -> 01:30-8:00
1. 01:30 PM UTC -> 01:30+00:00
1. ’01:30:30 PM EST’::TIME WITH TIME ZONE -> 13:30:30-5:00

   TIMESTAMP

1. ‘DEC-21-1974 1:30 PM EST’::TIMESTAMP WITH TIME ZONE -> 1974-12-21 13:30-5:00

   INTERVAL

1. Represents a duration of time
1. ‘1 day’::INTERVAL -> 01:00
1. ‘1 D 1 H 1 M 1 S’::INTERVAL -> 01:01:01:01
1. You can add and subtract intervals
1. You can add or subtract intervals from dates
1. (‘DEC-21-1974 1:30 PM EST’::TIMESTAMP WITH TIME ZONE) – (‘1 D’::INTERVAL)

### Other Types

- Currency
- Binary
- JSON
- RANGE
- Geometric
- Arrays
- XML
- UUID
- you also can Custome Data Type

---

# Rember Always Whenever You Create Database

- One Table Represents One Real-World Object.
- Columns Store One Piece of Information Each.
- How Do Tables Relate to Each Other?
- Reduce Redundant Data.

## How To make Table

```
CREATE TABLE username(
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
email VARCHAR(60) NOT NULL,
company VARCHAR(60) NULL,
street VARCHAR(50) NOT NULL,
city VARCHAR(40) NOT NULL,
state CHAR(2) NOT NULL DEFAULT 'PA',
zip SMALLINT NOT NULL,
phone VARCHAR(20) NOT NULL,
birth_date DATE NULL,
sex CHAR(1) NOT NULL,
date_entered TIMESTAMP NOT NULL,
id SERIAL PRIMARY KEY
);
```

## How To Adding Data To Table

```
INSERT INTO username (your column name) VALUES (corresponding value for the column)
```

example

```
INSERT INTO username(first_name, last_name, email, company, street, city, state, zip, phone, birth_date, sex, date_entered) VALUES ('Jhon', 'Joe', 'JhonJoe@mail.com', 'MS', '696 Center Str', 'HeaveyHills', 'CL', '30044', '348-848-8291', '1938-09-11', 'M', current_timestamp);
```

## How TO Get Data

```
SELECT * FROM public.customer
ORDER BY id ASC
```

## How To Create Enumerated Type Custom Data Type

```
CREATE TYPE sex_type as enum
('M', 'F');
```

## How To Change The Data Type of Column

```
alter table username
alter column sex type sex_type USING sex::sex_type;
```
