import { apiFetch, apiRaw } from '../api';
import type { List } from './types';

// Types
type UpdateArgs = {
  slug: string;
  name: string;
};

// Handlers
export const getAllLists = async () => {
  return apiFetch<List[]>(`/list`);
};

export const getList = async (slug: string) => {
  return apiFetch<List>(`/list/${slug}`);
};

export const addList = async (name: string) => {
  return apiFetch<List>(`/list`, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
  });
};

export const updateList = async ({ slug, name }: UpdateArgs) => {
  return apiFetch<List>(`/list/${slug}`, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
  });
};

export const deleteList = async (slug: string) => {
  await apiRaw(`/list/delete/${slug}`, {
    method: 'POST',
  });

  return;
};
