const fetch = require('isomorphic-fetch'),
      config = require('../config'),
      log = require('../utils/logger');

const BASE_URL = config.cloud.URL + config.cloud.apiVersion;

const dispatch = async (context, method, path, body) => {
	let options = {
		method: method,
    body: body? JSON.stringify(body): null,
    headers : {},
  };

  if (context && context.token) {
    options.headers.Authorization = 'Token ' + context.token;
  }
  if (context && context.deviceId) {
    options.headers.Cookie = `deviceId=${context.deviceId}`;
  }

  let url = BASE_URL+path;

  log.debug("Outgoing Request Url:", url)
  log.debug("Outgoing Request Options:", options)

  let responsePromise = await fetch(url,options);
  if (!responsePromise.ok) {
    log.error("Error Response received:", responsePromise )
    throw new Error(responsePromise.status);
  }
  let response = await responsePromise.json().catch(err => { return {}; });;
  log.debug("Response Body:", response)
  return response;
}

module.exports.get = async (context,path) => await dispatch(context,"GET",path);
module.exports.post = async (context,path,body) => await dispatch(context,"POST",path,body);
module.exports.put = async (context,path,body) => await dispatch(context,"PUT",path,body);
module.exports.patch = async (context,path,body) => await dispatch(context,"PATCH",path,body);
module.exports.delete = async (context,path) => await dispatch(context,"DELETE",path);
