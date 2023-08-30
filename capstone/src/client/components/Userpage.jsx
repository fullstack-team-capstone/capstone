// components/Userpage.jsx

import React from 'react';

const Userpage = () => {
  return (
    <div>
      <h1>Shalom!</h1>
      <div dangerouslySetInnerHTML={{
          __html: '<iframe src="https://giphy.com/embed/3o6Mb9iBZvwmYeSQZW" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/thesimpsons-3o6Mb9iBZvwmYeSQZW">via GIPHY</a></p>'
      }}></div>
      <p>This is a boilerplate React JSX component.</p>
    </div>
  );
};

export default Userpage;
