function Student({
  id,
  name,
  email,
  password,
  dob,
  course,
  mathScore,
  physicsScore,
  chemistryScore,
}) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dob = dob;
  this.course = course;
  this.score = new Score({
    math: mathScore,
    physics: physicsScore,
    chemistry: chemistryScore,
  });
  this.average = this.score.average();
}

function Score({ math, physics, chemistry }) {
  this.math = parseFloat(math);
  this.physics = parseFloat(physics);
  this.chemistry = parseFloat(chemistry);
  this.average = function () {
    return ((this.math + this.physics + this.chemistry) / 3).toFixed(2);
  };
}
