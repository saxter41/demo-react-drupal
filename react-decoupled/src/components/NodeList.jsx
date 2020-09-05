import React, { useEffect, useState } from "react";
import { getAuthClient } from "../utils/auth";
import '../assets/css/NodeList.css'

const auth = getAuthClient();

function isValidData(data) {
  if (data === null) {
    return false;
  }
  if (data.data === undefined ||
    data.data === null ||
    data.data.length === 0 ) {
    return false;
  }
  return true;
}

const NodeItem = ({id, drupal_internal__nid, title}) => (
  <div className="App-node-list">
    <a href={`/node/${id}`}>{title}</a>
  </div>
);

const NoData = () => (
  <div>No articles found.</div>
);

const NodeList = () => {
  const [content, setContent] = useState(false);

  useEffect(() => {
    const API_ROOT = '/jsonapi/';
    // Sort by created - changed
    //const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-created&page[limit]=10`;
    const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-changed&page[limit]=10`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    auth.fetchWithAuthentication(url, {headers})
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          // Initialize the list of content with data retrieved from Drupal.
          setContent(data.data);
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
    }, []);

  return (
    <div className="App-left">
      <div className="App-node-list-title">
        <h2>Site content</h2>
      </div>
      {content ? (
        <>
         <hr/>
          <div className="App-list">
            {
              content.map((item) => <NodeItem id={item.id} key={item.id} {...item.attributes} />)
            }
          </div>
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default NodeList;
