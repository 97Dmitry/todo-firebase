/**
 * Функция обработки ошибок для catch
 * @param error - Данные ошибки.
 */
export const errorHandler = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
};
