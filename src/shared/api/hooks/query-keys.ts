export const queryKeys = {
  all: ['api'] as const,
  resource: (name: string) => [...queryKeys.all, name] as const,
  list: (name: string, filters?: Record<string, unknown>) =>
    [...queryKeys.resource(name), 'list', filters] as const,
  detail: (name: string, id: string | number) =>
    [...queryKeys.resource(name), 'detail', id] as const,
};
