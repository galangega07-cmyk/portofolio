import React from 'react';

const PageHeader = ({ badge, title, description }) => {
  return (
    <div className="page-header">
      {badge && (
        <div className="page-badge">
          <span>✦</span>
          <span>{badge}</span>
        </div>
      )}
      <h1 className="page-title">{title}</h1>
      {description && <p className="page-desc">{description}</p>}
    </div>
  );
};

export default PageHeader;
