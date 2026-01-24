import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';
import { fetchAPI } from '../utils/index';

const initalState = {
  loggedInMember: null,
  token: null,
  decodedToken: null,
  alert: null,
  dialog: null,
  member: null,
};

const useStore = create((set, get) => ({
  ...initalState,
  memberCheck: async () => {
    try {
      if (get().loggedInMember) {
        return;
      }

      const token = localStorage.getItem('lh_token');
      if (!token) {
        return;
      }

      const decodedToken = jwtDecode(token);

      const { id, exp } = decodedToken;

      const currentDate = Number(new Date()) / 1000;

      if (exp < currentDate) {
        return get().memberLogout();
      }

      const loggedInMember = JSON.parse(localStorage.getItem('lh_member'));
      if (!loggedInMember) {
        return get().memberLogout();
      }

      set({ token, decodedToken, loggedInMember });
    } catch (error) {
      console.log(error);
    }
  },
  memberLogin: async (data) => {
    try {
      let response = await fetchAPI({
        method: 'post',
        url: '/login',
        data,
      });

      const token = response.data;
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;

      localStorage.setItem('lh_token', token);

      set({ token, decodedToken });

      response = await fetchAPI({ url: '/members/' + id, token });
      const loggedInMember = response.data;
      set({ loggedInMember });

      localStorage.setItem('lh_member', JSON.stringify(loggedInMember));

      get().raiseAlert({
        text: 'Success! Have a nice day!',
      });

      return true;
    } catch (error) {
      get().raiseAlert({
        severity: 'error',
        text: error.response.data.message ?? error.message,
        title: 'Login Error',
      });
      return false;
    }
  },
  memberLogout: () => {
    localStorage.removeItem('lh_token');
    localStorage.removeItem('lh_member');

    set({ ...initalState });
  },
  memberChangePassword: async (data) => {
    try {
      await fetchAPI({
        method: 'patch',
        url: '/members/change-password',
        data,
        token: get().token,
      });

      get().raiseAlert({
        text: 'Password changed successfully!',
      });

      return true;
    } catch (error) {
      get().raiseAlert({
        severity: 'error',
        text: error.response.data.message ?? error.message,
        title: 'Fehler',
      });
      return false;
    }
  },

  memberChangeProfile: async (data) => {
    try {
      await fetchAPI({
        method: 'PATCH',
        url: '/members/' + get().loggedInMember._id,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get().token}`,
        },
      });

      await get().memberRefreshMe();
      await get().raiseAlert({ text: 'Profile successfully edited!' });
    } catch (error) {
      console.error(error);
    }
  },

  memberRefreshMe: async () => {
    const response = await fetchAPI({
      url: '/members/' + get().loggedInMember._id,
      token: get().token,
    });
    const loggedInMember = response.data;
    set({ loggedInMember });

    localStorage.setItem('lh_member', JSON.stringify(loggedInMember));
  },

  memberSignup: async (data) => {
    try {
      await fetchAPI({
        method: 'post',
        url: '/signup',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      get().raiseAlert({
        title: 'Successfully Registered',
        text: 'Enjoy',
      });

      return true;
    } catch (error) {
      console.error('Error during signup:', error);

      if (error.code === 'ECONNABORTED') {
        get().raiseAlert({
          severity: 'error',
          text: 'Request timeout. The server took too long to respond.',
          title: 'Timeout Error',
        });
      } else {
        get().raiseAlert({
          severity: 'error',
          text: error.response?.data?.message ?? error.message,
          title: 'Error',
        });
      }
      return false;
    }
  },

  memberDelete: async () => {
    try {
      await fetchAPI({
        method: 'delete',
        url: '/members/' + get().loggedInMember._id,
        token: get().token,
      });

      get().memberLogout();

      get().raiseAlert({
        severity: 'info',
        text: 'Sorry to see you leave :(',
      });

      return true;
    } catch (error) {
      get().raiseAlert({
        severity: 'error',
        text: error.response.data.message ?? error.message,
        title: 'Fehler',
      });
      return false;
    }
  },

  raiseAlert: (alert = {}) => {
    const defaultAlert = {
      severity: 'success',
      variant: 'filled',
      duration: 5000,
      text: 'Standard-Meldung',
    };

    const newAlert = {
      ...defaultAlert,
      ...alert,
    };

    set({ alert: newAlert });
  },

  raiseDialog: (dialog = {}) => {
    const defaultDialog = {
      title: 'Dialog-Titel',
      text: 'Dialog-Text',
    };

    const newDialog = {
      ...defaultDialog,
      ...dialog,
    };

    set({ dialog: newDialog });
  },
  destroyDialog: () => {
    set({ alert: null });
  },
}));

export default useStore;
