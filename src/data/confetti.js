const successData = {
  angle: 90,
  spread: 360,
  startVelocity: 20,
  elementCount: 100,
  dragFriction: 0.05,
  duration: 5000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
}

const failureData = {
  angle: 90,
  spread: 70,
  startVelocity: 30,
  elementCount: 20,
  dragFriction: 0.20,
  duration: 5000,
  stagger: 8,
  width: "12px",
  height: "12px",
  perspective: "600px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
}

export const explosionData = [{
  delay: 300,
  style: { left: "50%", top: "25%" },
  config: successData
}, {
  delay: 800,
  style: { left: "25%", top: "75%" },
  config: successData
}, {
  delay: 1300,
  style: { left: "40%", top: "30%" },
  config: successData
}, {
  delay: 4000,
  style: { left: "80%", top: "30%" },
  config: failureData
}]
