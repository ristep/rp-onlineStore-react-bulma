import React, { useState, useEffect } from "react";
import toc from 'remark-toc';
// import Markdown from './mark/with-html';
// import CodeBlock from './mark/code-block';
import Markdown from 'react-markdown';

import "github-markdown-css";

const AboutPage = () =>{
	const [markdown, setMarkdown] = useState('');
  const [url] = useState("https://raw.githubusercontent.com/ristep/rp-onlineStore-react-bulma/master/README.md");

  useEffect(() => {
      fetch(url)
        .then(function (response) {
          // console.log(url + " -> " + response.ok);
          if(response.ok){
            return response.text();
          }
          throw new Error('Error message.');
        })
        .then(function (data) {
          //console.log("data: ", data);
          setMarkdown( data );
        }.bind(this))
        .catch(function (err) {
          // console.log("failed to load ", url, err.message);
      });
  }, [url])

	return(
		<div className='box'>
        <div className="markdown-body">
          <Markdown
            className="result"
            source={markdown}
            skipHtml={false}
            escapeHtml={false}
            // renderers={{code: CodeBlock}}
            plugins={[toc]}
          />
        </div>
		</div> 
  	)
}

export default AboutPage;