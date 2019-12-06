import React from "react";
import styled, { keyframes } from "styled-components";

const Hero = styled.section`
  text-align: center;

  h1 {
    font-size: calc(1rem + 36 * (100vw / 1000));
    font-weight: 900;
    margin: 3rem auto 2rem;
    max-width: 45rem;
  }

  p {
    margin: 0 auto;
    padding: 0 1rem;
    max-width: 42rem;
  }
`;

const Illustration = styled.div`
  position: relative;
`;

const rotateGirl = keyframes`
  from {
    transform: rotate(-20deg);
  }

  to {
    transform: rotate(-16deg) translateY(-5px);
  }
`;

const rotateBoy = keyframes`
  from {
    transform: rotate(-10deg);
  }

  to {
    transform: rotate(-6deg) translateY(5px);
  }
`;

const Girl = styled.img`
  position: absolute;
  width: 20%;
  top: 25%;
  right: 28%;
  transform: rotate(-20deg);
  animation: ${rotateGirl} 2.5s 1s alternate infinite ease-in-out;
`;

const Boy = styled.img`
  position: absolute;
  width: 18%;
  top: 35%;
  left: 28%;
  transform: rotate(-10deg);
  animation: ${rotateBoy} 2.5s 1s alternate infinite ease-in-out;
`;

export default () => (
  <Hero>
    <Illustration>
      <Girl src="/assets/girl.svg" />
      <Boy src="/assets/boy.svg" />
      <img src="/assets/hero.svg" />
    </Illustration>
    <h1>Home of student developers.</h1>
    <p>
      Showcasing the best courses, tools and technologies – handpicked for
      quality with exclusive offers and discounts for students.
    </p>
  </Hero>
);