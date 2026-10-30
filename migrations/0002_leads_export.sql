-- Vista estable para consulta y exportación al CRM; conserva el contexto original.
CREATE VIEW IF NOT EXISTS leads_export AS
SELECT id, created_at, status, name, email,
 COALESCE(json_extract(answers_json, '$.source'), 'assistant') AS source,
 json_extract(answers_json, '$.phone') AS phone,
 json_extract(answers_json, '$.availability') AS availability,
 json_extract(answers_json, '$.business') AS business,
 json_extract(answers_json, '$.details') AS message,
 answers_json
FROM inquiries;
