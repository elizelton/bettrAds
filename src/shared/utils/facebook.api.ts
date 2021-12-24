import axios from 'axios';

export default function getFacebookPublicProfile(token: string) {
  const baseUrl = 'https://graph.facebook.com/v12.0/me';
  const fields = '&debug=all&fields=id%2Cname%2Cfirst_name%2Cmiddle_name%2Clast_name%2Cname_format%2Cshort_name%2Cpicture&format=json&method=get';
  return axios.get(
    `${baseUrl}?access_token=${token + fields}`)
}