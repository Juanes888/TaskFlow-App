import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db = null;

// Solo inicializar en móvil
if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('taskflow.db');
}

const init = () => {
  if (!db) return;
  
  db.execSync(
    `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      priority TEXT,
      status TEXT DEFAULT 'pending',
      userId TEXT NOT NULL,
      createdAt TEXT,
      updatedAt TEXT
    );`
  );
};

/**
 * Inserta o actualiza una tarea en la base de datos.
 * Si el ID de la tarea ya existe, la actualiza. Si no, crea una nueva.
 * @param {string} id - El identificador único de la tarea.
 * @param {object} taskData - El objeto con los datos de la tarea.
 * @param {string} taskData.title - El título de la tarea.
 * @param {string} [taskData.description=null] - La descripción (opcional).
 * @param {string} [taskData.dueDate=null] - La fecha de vencimiento (opcional).
 * @param {string} [taskData.priority='media'] - La prioridad ('alta', 'media', 'baja').
 * @param {string} [taskData.status='pending'] - El estado ('pending', 'completed').
 * @param {string} taskData.userId - El ID del usuario al que pertenece la tarea.
 * @returns {object|null} El resultado de la operación de la base de datos, o null si no está disponible.
 */
const upsertTask = (id, { title, description = null, dueDate = null, priority = 'media', status = 'pending', userId }) => {
  if (!db) {
    console.warn("Base de datos no disponible en web");
    return null;
  }

  const now = new Date().toISOString();
  const result = db.runSync(
    `INSERT OR REPLACE INTO tasks (id, title, description, dueDate, priority, status, userId, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [id, title, description, dueDate, priority, status, userId, now, now]
  );
  return result;
};

const getTaskById = (id) => {
  if (!db) return null;

  const row = db.getFirstSync(
    `SELECT * FROM tasks WHERE id = ?;`,
    [id]
  );
  return row || null;
};

const getTasksByUserId = (userId) => {
  if (!db) return [];

  const rows = db.getAllSync(
    `SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC;`,
    [userId]
  );
  return rows || [];
};

const updateTask = (id, { title = null, description = null, dueDate = null, priority = null, status = null }) => {
  if (!db) return null;

  const now = new Date().toISOString();
  let query = `UPDATE tasks SET updatedAt = ?`;
  const params = [now];

  if (title !== null) {
    query += `, title = ?`;
    params.push(title);
  }
  if (description !== null) {
    query += `, description = ?`;
    params.push(description);
  }
  if (dueDate !== null) {
    query += `, dueDate = ?`;
    params.push(dueDate);
  }
  if (priority !== null) {
    query += `, priority = ?`;
    params.push(priority);
  }
  if (status !== null) {
    query += `, status = ?`;
    params.push(status);
  }

  query += ` WHERE id = ?;`;
  params.push(id);

  const result = db.runSync(query, params);
  return result;
};

const deleteTaskById = (id) => {
  if (!db) return null;

  const result = db.runSync(
    `DELETE FROM tasks WHERE id = ?;`,
    [id]
  );
  return result;
};

const deleteAllTasksByUserId = (userId) => {
  if (!db) return null;

  const result = db.runSync(
    `DELETE FROM tasks WHERE userId = ?;`,
    [userId]
  );
  return result;
};

export default {
  init,
  upsertTask,
  getTaskById,
  getTasksByUserId,
  updateTask,
  deleteTaskById,
  deleteAllTasksByUserId,
};