import React from 'react';

export const InitialSiteLoader = () => (
  <div
    className="acv-initial-loader"
    role="status"
    aria-label="Africa Community Village — chargement du site"
  >
    <div className="acv-initial-loader__mark" aria-hidden="true">
      <span className="acv-initial-loader__halo" />
      <img
        src="/assets/brand/acv-logo.jpeg"
        alt=""
        width="128"
        height="128"
        fetchPriority="high"
        className="acv-initial-loader__logo"
      />
    </div>
    <p className="acv-initial-loader__name">Africa Community Village</p>
    <span className="acv-initial-loader__line" aria-hidden="true" />
  </div>
);
