'use strict';

// "Dumb" React component to render a call script.

export default function CallScript(props) {

  const {userName, city, state, repName, billTitle, opposedBecause} = props;

  return (
    <section className='call-script'>
      <p>Hi, my name is {userName} and I live in {city}, {state}.</p>
      <p>I don't need a response.</p>
      <p>I'm calling to urge {repName} to oppose {billTitle}
        because {opposedBecause}.</p>
      <p>Thank you for your time.</p>
    </section>
  );
};
