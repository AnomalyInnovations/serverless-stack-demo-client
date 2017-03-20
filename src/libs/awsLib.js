import config from '../config.js';

export async function invokeApig(
  { path,
    method = 'GET',
    body }, userToken) {

  const url = `${config.apiGateway.URL}${path}`;
  const headers = {
    Authorization: userToken,
  };

  body = (body) ? JSON.stringify(body) : body;

  const results = await fetch(url, {
    method,
    body,
    headers
  });

  return results.json();
}
