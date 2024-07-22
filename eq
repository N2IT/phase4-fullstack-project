                                            Table "public.quotes"
      Column       |            Type             | Collation | Nullable |              Default               
-------------------+-----------------------------+-----------+----------+------------------------------------
 id                | integer                     |           | not null | nextval('quotes_id_seq'::regclass)
 quote_number      | integer                     |           |          | 
 title             | character varying           |           |          | 
 total_cost        | double precision            |           |          | 
 discount          | double precision            |           |          | 
 savings           | integer                     |           |          | 
 markup_variable   | double precision            |           |          | 
 sale_price        | integer                     |           |          | 
 margin_percentage | integer                     |           |          | 
 margin_dollars    | integer                     |           |          | 
 notes             | character varying(500)      |           |          | 
 status            | character varying           |           |          | 
 converted         | character varying           |           |          | 
 created_at        | timestamp without time zone |           |          | now()
 created_by        | integer                     |           |          | 
 updated_at        | timestamp without time zone |           |          | 
 updated_by        | integer                     |           |          | 
 customer_id       | integer                     |           |          | 
 account_id        | integer                     |           |          | 
Indexes:
    "pk_quotes" PRIMARY KEY, btree (id)
    "uq_quotes_quote_number" UNIQUE CONSTRAINT, btree (quote_number)
Foreign-key constraints:
    "fk_quotes_account_id_accounts" FOREIGN KEY (account_id) REFERENCES accounts(id)
    "fk_quotes_customer_id_customers" FOREIGN KEY (customer_id) REFERENCES customers(id)
Referenced by:
    TABLE "configurations" CONSTRAINT "fk_configurations_quote_id_quotes" FOREIGN KEY (quote_id) REFERENCES quotes(id)

