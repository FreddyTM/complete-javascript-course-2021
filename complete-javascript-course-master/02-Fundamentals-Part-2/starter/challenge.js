const player1 = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const player2 = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

if (player1.calcBMI() > player2.calcBMI()) {
  console.log(
    `${player1.fullName}'s BMI (${player1.calcBMI()}) is higher than ${player2.fullName}'s BMI (${player2.calcBMI()})!`
  );
} else {
  console.log(
    `${player2.fullName}'s BMI (${player2.calcBMI()}) is higher than ${player1.fullName}'s BMI (${player1.calcBMI()})!`
  );
}
