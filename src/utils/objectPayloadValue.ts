/**
 * Удаление пустых полей в объекте
 * @param {Object} obj - Объект в котором нужно убрать пустые поля.
 * @param {Array} avoid - Key поля, которое не нужно добавлять в любом случае.
 */
export function objectPayloadValue<T extends object>(obj: T, avoid?: Array<string> | string): T {
  const filledObject: T = {} as T;
  for (const key in obj) {
    if (obj[key] || obj[key] === false) {
      if ((typeof avoid === "string" && avoid !== key) || !avoid?.includes(key))
        filledObject[key] = obj[key];
    }
  }
  return filledObject;
}
