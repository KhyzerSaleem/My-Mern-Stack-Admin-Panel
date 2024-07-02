import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const stats = [
    { label: "Registered Companies", value: "50+" },
    { label: "Happy Clients", value: "100,000+" },
    { label: "Well Known Developers", value: "500+" },
    { label: "Service", value: "24/7" },
  ];

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Welcome to Mern Admin Panel</h1>
              <p>
                We leverage cutting-edge technology using the MERN stack to
                deliver robust, scalable, and high-performance web applications.
                By integrating MongoDB, Express.js, React.js, and Node.js, we
                ensure a seamless development process and a responsive, dynamic
                user experience. Our expertise in the MERN stack allows us to
                build powerful and efficient solutions that cater to the unique
                needs of our clients, ensuring their businesses stay ahead in a
                competitive digital landscape.
              </p>
              <div className=" btn-group">
                <Link to="/About">
                  <button className="btn">About Us</button>
                  <button className="btn">Learn More</button>
                </Link>
              </div>
            </div>

            <div className="hero-images">
              <img src="/images/Home.svg" alt="" width={400} height={500} />
            </div>
          </div>
        </section>
        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
