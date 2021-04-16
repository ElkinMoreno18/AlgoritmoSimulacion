import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrabmedia',
  templateUrl: './arrabmedia.component.html',
  styleUrls: ['./arrabmedia.component.css']
})
export class ArrabmediaComponent implements OnInit {

  m: number = 0;
  a: number = 0;
  k: number = 0;
  X0: number = 0;
  g: number = 0;
  no: number = 0;
  ni: number = 0;
  n: number = 0;
  Co: number = 0;
  UCo: number = 0;
  ACo: number = 0;
  Zo: number = 0;
  vara: number = 0;
  varm: number = 0;

  period: number[] = [];
  listRi: number[] = [];
  listSec: number[] = [];
  listCo: number[] = [];
  tableData: number[] = [];
  data = [[this.listRi], [this.listSec], [this.listCo]];
  list: boolean = false;
  alpha: number = 0;
  valpha: number = 0;
  Zalphamed: number = 0;
  conc: number[] = [];
  zalph: number = 0;
  menzalph: number = 0;
  conclusion: string = "";


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.list = true;
    let num, sec, carry;
    this.period = [];
    this.vara = 3 + (8 * this.k);
    this.varm = Math.pow(2,this.g);
    num = this.generateNumbers(generateXn(this.varm, this.vara, this.k, this.X0, this.g), this.varm)
    this.findPeriod(generateXn(this.varm, this.vara, this.k, this.X0, this.g))
    console.log(num);
    this.Co = calculateCarries(evaluateCarry(evaluateSecuence(num)), this.period[1])
    sec = evaluateSecuence(num);
    carry = evaluateCarry(sec);
    this.listRi = this.generateNumbers(generateXn(this.varm, this.vara, this.k, this.X0, this.g), this.varm);
    this.listSec = evaluateSecuence(num);
    this.listCo = evaluateCarry(sec);
    this.n = Math.abs(this.period[1]);
    this.no = calculateN0(this.listSec, this.period[1]);
    this.ni = calculateN1(this.listSec, this.period[1]);
    this.UCo = calculateUCo(this.period[1], this.no, this.ni);
    this.ACo = calculateACo(this.period[1], this.no, this.ni);
    this.Zo = calculateZo(this.Co, this.UCo, this.ACo);
    this.valpha = 100 - this.alpha;
    this.Zalphamed = this.valpha / 100
    this.conc = getValue(this.Zalphamed);
    this.zalph = this.conc[0];
    this.menzalph = this.conc[1];
    this.conclusion = evaluateConclusion(this.Zo, this.zalph, this.menzalph);
  }

  generateNumbers(numbers: number[], m: number): number[] {
    let ri = [];
    let found = false;
    for (let index = 1; index < numbers.length; index++) {
      let first = numbers[index] / (m - 1)
      if (!found) {
        let i = ri.indexOf(first)
        if (i != -1) {
          this.period.push(i)
          found = true;
        }
      }
      ri.push(first);
    }
    return ri;
  }

  findPeriod(ri: number[]): void {
    let value = ri[this.period[0]];
    this.period.push(ri.indexOf(value, this.period[0] + 1));
  }

}

function generateXn(m: number, a: number, k: number, X0: number, g: number) {
  let number: number = X0;
  let numbers: number[] = [];
  //a = 3 + (8 * k);
  numbers.push(number);
  // numbers[0] = number;
  for (let index = 1; index < m; index++) {
    numbers[index] = (a * numbers[index - 1]) % m;
    number = numbers[index];
  }
  return numbers;
}

function calculateUCo(n: number, n0: number, n1: number) {
  let UCo = ((2 * n0 * n1) / n) + (1 / 2);
  return UCo;
}

function calculateACo(n: number, n0: number, n1: number) {
  let ACo = (((2 * n0 * n1) * (2 * n0 * n1 - n)) / (Math.pow(n, 2) * (n - 1)));
  return ACo;
}

function calculateZo(Co: number, UCo: number, ACo: number) {
  let Zo = (Co - UCo) / Math.sqrt(ACo);
  return Zo
}

function evaluateSecuence(ri: number[]) {
  let sec = [];
  for (let i = 0; i <= ri.length; i++) {
    if (ri[i] >= 0.5) {
      sec.push(1);
      //  console.log("1+" + ri[i])
      //  i++
    } else if (ri[i] < 0.5) {
      sec.push(0);
      // console.log("a+" + ri[i])
      // console.log("b" + ri[i - 1])
      //   i++;
    }
  }
  return sec;
}

function evaluateCarry(sec: number[]) {
  let carry = [];
  carry.push(1);
  for (let i = 0; i < sec.length; i++) {
    if (sec[i + 1] == sec[i]) {
      carry.push(0);
      //   console.log("1 + " + sec[i])
      //    console.log("2 + " + sec[i + 1])
    } else {
      carry.push(1);
      // console.log("10 + " + sec[i])
      //  console.log("11 + " + sec[i + 1])
    }
  }
  return carry;
}

function calculateCarries(carry: number[], period: number) {
  let aux = 0;
  for (let i = 0; i < period; i++) {
    if (carry[i] == 1) {
      aux++;
    }
  }
  return aux;
}



function calculateN0(sec: number[], t: number) {
  let aux = 0;
  for (let i = 0; i < t; i++) {
    if (sec[i] == 0) {
      aux++;
    }
  }
  return aux;
}

function calculateN1(sec: number[], t: number) {
  let aux = 0;
  for (let i = 0; i < t; i++) {
    if (sec[i] == 1) {
      aux++;
    }
  }
  return aux;
}


function getValue(value: number) {
  const dist = require('@formulajs/formulajs')
  let zalpha = [];
  let val = 1 - value;
  let zalmed = dist.NORMSINV(val + (value / 2)).toPrecision(4);
  let menzalmed = dist.NORMSINV(value / 2).toPrecision(4);

  zalpha.push(zalmed);
  zalpha.push(menzalmed);
  return zalpha
}

function evaluateConclusion(zo: number, zalpha: number, menzalpha: number) {
  let conclusion: string;
  if (zo > menzalpha && zo < zalpha) {
    conclusion = "Como el valor del estadístico Zo esta entre el intervalo de -Za/2 y Za/2, se concluye que el conjunto de números Ri son independientes";
  } else if (zo == null) {
    conclusion = "No existe un valor Z0"
  } else {
    conclusion = "Como el valor del estadístico Zo no esta entre el intervalo de -Za/2 y Za/2, se concluye que el conjunto de números Ri no son independientes";
  } 
  return conclusion;
}
