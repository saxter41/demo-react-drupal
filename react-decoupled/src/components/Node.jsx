import React, { useEffect, useState } from "react";
import { getAuthClient } from "../utils/auth";
import '../assets/css/Node.css';

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

const NoData = () => (
  <div>No articles found.</div>
);

const Node = (props) => {
  const [content, setContent] = useState(false);
  
  useEffect(() => {
    var url = '';
    const API_ROOT = '/jsonapi/';
    if ( props.match.path === '/' ) {
      url = `${API_ROOT}node/article/38509feb-a396-401e-9bf4-e282947f4046?include=field_image&fields[file--file]=uri,url`;
    } else {
      url = `${API_ROOT}node/article/${props.match.params.id}?include=field_image&fields[file--file]=uri,url`;
    }
    
    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    auth.fetchWithAuthentication(url, {headers})
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          // Initialize the list of content with data retrieved from Drupal.
          setContent(data);
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
    }, [props]);
  return (
    <div>
      {content.data &&
        <>
        <div className="App-title-content">
          <h1 className="App-node-title">{content.data.attributes.title}</h1>
        </div>
        <hr/>
        <div className="App-node-body">
          <p dangerouslySetInnerHTML={{ __html: content.data.attributes.body.value }} />
        </div>
        <div className="App-img">
          <div className="App-node-link">
            <a href={`/node/${content.data.id}`} >
              <img className="App-node-img" src={`http://drupal.docker.localhost:8000${content.included[0].attributes.uri.url}`} 
              alt=""/>
            </a>
          </div>
        </div>
        </>
      }
    </div>
  );
};

export default Node;
