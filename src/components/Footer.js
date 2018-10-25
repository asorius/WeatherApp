import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return <div className="page-footer">made by me c</div>;
  }
}
//--------------Google places for drop down return CORB error....
// const key = 'AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc';
// try {
//   const response = await axios({
//     method: 'get',
//     url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&&types=(cities)&key=${key}`,
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     }
//   });
//   const list = response.data.map(res => res.description);
//   console.log(list);
// } catch (e) {
//   console.log(e);
// }
