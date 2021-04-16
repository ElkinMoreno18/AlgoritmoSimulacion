import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arribayabajo',
  templateUrl: './arribayabajo.component.html',
  styleUrls: ['./arribayabajo.component.css']
})
export class ArribayabajoComponent implements OnInit {


  title = 'Programa Arriba y Abajo';

  k: number = 0;
  X0: number = 0;
  g: number = 0;
  Co: number = 0;
  UCo: number = 0;
  ACo: number = 0;
  Zo: number = 0;
  n: number = 0;
  vara: number = 0;
  varm: number = 0;

  listRi: number[] = [];
  listSec: number[] = [];
  listCo: number[] = [];
  tableData: number[] = [];
  data = [[this.listRi], [this.listSec], [this.listCo]];
  period: number[] = [];
  list: boolean = false;
  alpha: number = 0;
  valpha: number = 0;
  Zalphamed: number = 0;
  zaa: number = 0;
  conclusion: string = "";


  constructor(
  ) { }

  ngOnInit(): void { }


  onSubmit(): void {

    this.list = true;
    evaluateG(this.g);
    evaluateX0(this.X0);
    let num, sec, carry, num1;
    this.vara = 3 + (8 * this.k);
    this.varm = Math.pow(2,this.g);
    this.period = [];
    num = this.generateNumbers(generateXn(this.varm, this.vara, this.k, this.X0, this.g), this.varm)
    this.findPeriod(generateXn(this.varm, this.vara, this.k, this.X0, this.g))

    num1 = generateXn(this.varm, this.vara, this.k, this.X0, this.g)
    console.log(num);
    this.Co = calculateCarries(evaluateCarry(evaluateSecuence(num)), this.period[1])
    this.UCo = calculateUCo(this.period[1]);
    this.ACo = calculateACo(this.period[1]);
    this.Zo = calculateZo(this.Co, this.UCo, this.ACo);
    this.n = Math.abs(this.period[1]); 
    sec = evaluateSecuence(num);
    carry = evaluateCarry(sec);
    this.listRi = this.generateNumbers(generateXn(this.varm, this.vara, this.k, this.X0, this.g), this.varm);
    this.listSec = evaluateSecuence(num);
    this.listCo = evaluateCarry(sec);
    this.valpha = 100 - this.alpha;
    this.Zalphamed = this.valpha / 100
    this.zaa = getValue(this.Zalphamed)[0];
    this.conclusion = evaluateConclusion(this.Zo, this.zaa);
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

function evaluateX0(X0: number) {
  if (X0 % 2 == 0) {
    alert(X0 + " Es par, digite un valor impar");
  }
}

function evaluateG(g: number) {
  if (g % 1 != 0) {
    alert(g + " No es numero entero, por favor digite un valor entero");
  }
}

function generateXn(m: number, a: number, k: number, X0: number, g: number) {
  let number: number = X0;
  let numbers: number[] = [];
  numbers.push(number);
  // numbers[0] = number;
  for (let index = 1; index < m; index++) {
    numbers[index] = (a * numbers[index - 1]) % m;
    number = numbers[index];
  }
  return numbers;
}



function calculateUCo(n: number) {
  let UCo = ((2 * n) - 1) / 3;
  console.log("valor de n " + n)
  return UCo;
}


function calculateACo(n: number) {
  let ACo = ((16 * n) - 29) / 90;
  return ACo;
}

function calculateZo(Co: number, UCo: number, ACo: number) {
  let Zo = Math.abs((Co - UCo) / Math.sqrt(ACo));
  return Zo
}

function evaluateSecuence(ri: number[]) {
  let sec = [];
  // sec.push('');
  for (let i = 1; i <= ri.length; i++) {
    if (ri[i] <= ri[i - 1]) {
      sec.push(0);
      //  console.log("1+" + ri[i])
      //  i++
    } else if (ri[i] > ri[i - 1]) {
      sec.push(1);
      // console.log("a+" + ri[i])
      // console.log("b" + ri[i - 1])
      //   i++;
    }
  }
  return sec;
}

function evaluateCarry(sec: number[]) {
  let carry = [];
  // carry.push('');
  carry.push(1);
  for (let i = 0; i < sec.length - 1; i++) {
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
  for (let i = 0; i < period - 1; i++) {
    if (carry[i] == 1) {
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
  console.log(zalmed);
  zalpha.push(zalmed);
  zalpha.push(menzalmed);
  return zalpha
}

function evaluateConclusion(zo: number, zalpha: number) {
  let conclusion: string;
  if (zo < zalpha) {
    conclusion = "Como el valor estadistico Z0 es menor que el valor critico de Za/2, se concluye que el conjunto de numeros Ri son independientes";
  } else if(zo > zalpha) {
    conclusion = "Como el valor del estadístico Zo es mayor que el valor crítico de Za/2, se concluye que el conjunto de números Ri no son independientes"
  } else {
    conclusion = "No existe un valor Z0"
  }
  return conclusion;
}

