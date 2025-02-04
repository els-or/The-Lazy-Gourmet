import type { UserLogin } from '../interfaces/UserLogin';

//login client.

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {// starting a network rewquet to endpoint using a post requst.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // hold JSON data.
      },
      body: JSON.stringify(userInfo), //convert to JSON string.
    });

    const data = await response.json(); //store response object.

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };
