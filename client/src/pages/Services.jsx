import React, { useEffect, useState } from "react";
import "./Services.css";
import { useAuth } from "../store/auth";

const Services = () => {
  const { services } = useAuth();

  if (!Array.isArray(services)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-cards">
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;

          return (
            <div key={index} className="service-card">
              <img src="/images/Service.svg" alt="" className="service-image" />
              <h2 className="service-title"> {service}</h2>
              <p className="service-description">{description}</p>
              <p className="service-price">{price}</p>
              <p className="service-provider">{provider}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
