import {test} from 'node:test';
import {execFileSync} from 'node:child_process';
test('migraciones SQLite repetibles, exportación de ambos canales y deduplicación',()=>{
 execFileSync('python3',['-c',`
import sqlite3,pathlib,json
c=sqlite3.connect(':memory:')
for _ in range(2):
 for p in sorted(pathlib.Path('migrations').glob('*.sql')):c.executescript(p.read_text())
for source in ['form','assistant']:
 data=json.dumps(dict(source=source,phone='600000000',availability='Tardes',details='Consulta sintética'))
 for _ in range(2):c.execute("INSERT INTO inquiries VALUES (?, ?, 'new', ?, ?, ?) ON CONFLICT(id) DO NOTHING",(source,'2026-10-30','Prueba','test@example.com',data))
assert c.execute('SELECT count(*) FROM inquiries').fetchone()[0]==2
assert c.execute('SELECT source, phone, availability, message FROM leads_export ORDER BY source').fetchall()==[(s,'600000000','Tardes','Consulta sintética') for s in ['assistant','form']]
`]);
});
