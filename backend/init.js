db = db.getSiblingDB('devices_db');
db.createUser({
  user: 'admin',
  pwd: 'SecurePassword123',
  roles: [{ role: 'readWrite', db: 'devices_db' }]
});