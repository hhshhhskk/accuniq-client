import React from "react";

import "../styles/common.css";

const ContentFooter = ({ name }) => {
  return (
    <>
      <div className="content-footer">
        <button>
          {name} 홈 바로가기<span className="footer-bt-img"></span>
        </button>
      </div>
    </>
  );
};

export default ContentFooter;
