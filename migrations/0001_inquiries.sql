CREATE TABLE IF NOT EXISTS inquiries (
 id TEXT PRIMARY KEY,
 created_at TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','closed')),
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 answers_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiries_status_date ON inquiries(status, created_at DESC);
