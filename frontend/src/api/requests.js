import Cookies from 'js-cookie';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

export const BASE_URL = 'http://127.0.0.1:8000/api/';

function handleErrors(response) {
  if (!response.ok) {
    return response.json().then((err) => {
      throw new Error(err.error || 'Something went wrong!');
    });
  }
  return response;
}

function notifyError(error) {
  toast.error(error.message || 'Failed to fetch data from API.', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function getCsrfCookie() {
  return fetch(`${BASE_URL}auth/get_csrf/`)
    .then(handleErrors)
    .catch(notifyError);
}

export function logIn(email, password) {
  return fetch(`${BASE_URL}auth/login/`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function logOut() {
  return fetch(`${BASE_URL}auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function userMe() {
  return fetch(`${BASE_URL}auth/me/`, {
    method: 'GET',
    Cookie: Cookies,
    headers: {
      'Content-Type': 'application/json',
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function getUserList() {
  return fetch(`${BASE_URL}detail_users_list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function deleteUser(id) {
  return fetch(`${BASE_URL}detail_users_list/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function patchUser(id, isStaff) {
  return fetch(`${BASE_URL}detail_users_list/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: JSON.stringify({
      is_staff: isStaff,
    }),
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function signUp(data) {
  return fetch(`${BASE_URL}registr/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function postFile(data) {
  return fetch(`${BASE_URL}files/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: data,
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function getFiles() {
  return fetch(`${BASE_URL}files/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function getUserFiles(userId) {
  return fetch(`${BASE_URL}files/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function patchFile(data, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `?user_storage_id=${userStorageId}`;
  }

  return fetch(`${BASE_URL}files/${params}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function deleteFile(id, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `&user_storage_id=${userStorageId}`;
  }

  return fetch(`${BASE_URL}files/?id=${id}${params}`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function downloadFile(id) {
  return fetch(`${BASE_URL}files/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}

export function getDownloadLink(id) {
  return fetch(`${BASE_URL}files/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .catch(notifyError);
}