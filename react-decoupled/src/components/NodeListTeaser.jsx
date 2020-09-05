import React, { useEffect, useState } from "react";
import { getAuthClient } from "../utils/auth";
import '../assets/css/NodeListTeaser.css';

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

const NodeItem = ({id, title, url}) => (
  <div className="App-node-list-teaser">
      <div className="App-list-teaser-img">
        <a href={`/node/${id}`}>
            <img className="App-node-list-teaser-img" src={`http://drupal.docker.localhost:8000/${url}`} alt=""/>
        </a>
      </div>
      <div className="App-node-list-teaser-link">
        <p>{title}</p> 
      </div>
  </div>
);

const NoData = () => (
  <div>No articles found.</div>
);

const NodeListTeaser = () => {
  const [content, setContent] = useState(false);

  useEffect(() => {
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}node/article?include=field_image&fields[file--file]=uri,url&fields[node--article]=id,drupal_internal__nid,title,body&sort=-changed&page[limit]=10`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });
    
    auth.fetchWithAuthentication(url, {headers})
      .then((response) => response.json())
      .then((data) => {
        const node = []
        if (isValidData(data)) {
            data.data.forEach((value, index) => {             
                var values = ({id: value.id, title: value.attributes.title, url:data.included[index].attributes.uri.url})
                node.push(values)
            })
            setContent(node);
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
    }, []);
  return (
    <div className="App-list-teaser">
      <div className="App-node-list-title">
        <h2>Site content teaser</h2>
      </div>
      {content ? (
        <>
         <hr/>
          <div className="App-list-teaser-blocks">
            {
                content.map((item) => <NodeItem key={item.id} {...item} />)
            }  
          </div>
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default NodeListTeaser;
