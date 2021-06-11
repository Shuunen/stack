class Person {
  name = 'Pam Beesly <3'
  hi() { console.log(`Hey my name is ${this.name ?? 'Jim Halpert'} !`) }
}

const pam = new Person()
pam.hi()
