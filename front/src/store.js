import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// SET THE INITIAL VALUE OF OUR LOCAL STORAGE TOKEN
export const tokenAtom = atomWithStorage('token', null);

// GLOBAL STATE
export const userInfosAtom = atom(null);

export const formAtom = atom('login');

export const loggedAtom = atom(false);

export const toggledProfileAtom = atom(false);

export const postsAtom = atom([]);

export const offsetAtom = atom(0);

export const categoryAtom = atom([]);

export const busyAtom = atom(true);

export const modalOptionsAtom = atom({});

export const displayModalAtom = atom(false);