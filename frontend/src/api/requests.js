import Cookies from 'js-cookie';
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

export async function getCsrfCookie() {
  try {
    const response = await fetch(`${BASE_URL}auth/get_csrf/`);
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;// для того чтобы ESlint не ругался (всегда возвращается значение)
  }
}

export async function logIn(email, password) {
  try {
    const response = await fetch(`${BASE_URL}auth/login/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({ email, password }),
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function logOut() {
  try {
    const response = await fetch(`${BASE_URL}auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function userMe() {
  try {
    const response = await fetch(`${BASE_URL}auth/me/`, {
      method: 'GET',
      Cookie: Cookies,
      headers: {
        'Content-Type': 'application/json',
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function getUserList() {
  try {
    const response = await fetch(`${BASE_URL}detail_users_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${BASE_URL}detail_users_list/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function patchUser(id, isStaff) {
  try {
    const response = await fetch(`${BASE_URL}detail_users_list/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
      body: JSON.stringify({ is_staff: isStaff }),
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function signUp(data) {
  try {
    const response = await fetch(`${BASE_URL}registr/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function postFile(data) {
  try {
    const response = await fetch(`${BASE_URL}files/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
      body: data,
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function getFiles() {
  try {
    const response = await fetch(`${BASE_URL}files/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function getUserFiles(userId) {
  try {
    const response = await fetch(`${BASE_URL}files/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function patchFile(data, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `?user_storage_id=${userStorageId}`;
  }

  try {
    const response = await fetch(`${BASE_URL}files/${params}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        cookie: `sessionid=${Cookies.get('sessionid')}`,
      },
      body: JSON.stringify(data),
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function deleteFile(id, userStorageId = null) {
  let params = '';

  if (userStorageId) {
    params = `&user_storage_id=${userStorageId}`;
  }

  try {
    const response = await fetch(`${BASE_URL}files/?id=${id}${params}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function downloadFile(id) {
  try {
    const response = await fetch(`${BASE_URL}link/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}

export async function getDownloadLink(id) {
  try {
    const response = await fetch(`${BASE_URL}link/?file_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleErrors(response);
  } catch (error) {
    notifyError(error);
    return null;
  }
}
