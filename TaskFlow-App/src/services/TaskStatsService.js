
/**
 * @namespace TaskStatsService
 * @description Un objeto de servicio que proporciona funciones para calcular estadísticas y logros basados en una lista de tareas.
 */
const TaskStatsService = {
  /**
   * Genera un conjunto completo de estadísticas a partir de una lista de tareas.
   * @param {Array<Object>} tasks - Un array de objetos de tarea. Se espera que cada objeto tenga `status` y `priority`.
   * @returns {Object} Un objeto que contiene estadísticas como el total de tareas, completadas, pendientes, tasa de finalización, desglose por prioridad y productividad semanal.
   */
  generateStats(tasks) {
    if (!tasks || tasks.length === 0) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0,
        byPriority: { alta: 0, media: 0, baja: 0 },
        productivity: this.getWeeklyProductivity(tasks),
      };
    }

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;

    const byPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, { alta: 0, media: 0, baja: 0 });

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      byPriority,
      productivity: this.getWeeklyProductivity(tasks),
    };
  },

  /**
   * Genera datos de productividad simulados para una semana.
   * @param {Array<Object>} tasks - El array de tareas (actualmente no se utiliza en el cálculo, pero se incluye para futuras mejoras).
   * @returns {Array<Object>} Un array de objetos, donde cada objeto representa un día de la semana y un valor de productividad aleatorio.
   */
  getWeeklyProductivity(tasks) {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return days.map(day => ({
      dia: day,
      valor: Math.floor(Math.random() * 100),
    }));
  },

  /**
   * Verifica qué logros ha desbloqueado el usuario basándose en las tareas completadas.
   * @param {Array<Object>} tasks - Un array de objetos de tarea. Se espera que cada objeto tenga `status` y `priority`.
   * @returns {Array<Object>} Un array que contiene los logros desbloqueados. Cada logro es un objeto con `id`, `name`, y `description`.
   */
  checkAchievements(tasks) {
    const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
    const unlockedAchievements = [];

    // Logro 1: Completar 5 tareas
    if (completedTasksCount >= 5) {
      unlockedAchievements.push({
        id: 'first_five_tasks',
        name: 'Primeros Pasos',
        description: 'Completaste tus primeras 5 tareas.',
      });
    }

    // Logro 2: Completar 10 tareas
    if (completedTasksCount >= 10) {
      unlockedAchievements.push({
        id: 'ten_tasks_done',
        name: 'Máquina de Tareas',
        description: '¡Has completado 10 tareas!',
      });
    }
    
    // Logro 3: Completar 3 tareas de alta prioridad
    const highPriorityCompleted = tasks.filter(t => t.status === 'completed' && t.priority === 'alta').length;
    if (highPriorityCompleted >= 3) {
        unlockedAchievements.push({
            id: 'high_priority_slayer',
            name: 'Cazador de Prioridades',
            description: 'Completaste 3 tareas de alta prioridad.',
        });
    }

    return unlockedAchievements;
  },
};

export default TaskStatsService;