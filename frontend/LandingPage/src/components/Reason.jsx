import React from 'react';

const Reason = () => {
  return (
    <div className='reason'>
      <div className='container'>
        <h2>Why Choose KultureXplora?</h2>
        <h3>If You Trust Movie Ratings, Why Not Safari Ratings?</h3>
        <ul>
          <li>
            <img src='/star.png' alt='' />
            <h4> Real Customer Experiences</h4>
            <span>No paid rankings, just honest feedback</span>
          </li>
          <li>
            <img src='/verified.png' alt='' />
            <h4> Expert-Verified Operators</h4>
            <span>Book only with the most reputable guides</span>
          </li>
          <li>
            <img src='/personalized.png' alt='' />
            <h4> Personalized Picks</h4>
            <span>Find operators that fit your style & budget</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Reason;
