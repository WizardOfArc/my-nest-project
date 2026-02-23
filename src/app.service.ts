import { Injectable } from '@nestjs/common';
import { time } from 'console';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  fan = 5.6;

  getDouble(num: number): number { 
    return 2*num;
  }


  getFannify(num: number): number {
    return this.fan * num;
  }

  getParens(num: number): string[]  {
    let start = Date.now();
    if (0 === num) {
      let diff: number = (Date.now() - start);
      console.log(`Memoed Version for ${num} took: ${diff} milliseconds`);
      return [];
    } 
    let memoMap = new Map<number, string[]>();
    memoMap.set(1, ['()']);
    for (let k = 2; k <= num; k++) {
      let soFar = memoMap.get(k-1);
      let newList = new Set<string>;
      if(!soFar){
        memoMap.set(k, ['()'])
      }
      for (let parens of soFar!) {
         newList.add('()' + parens);
         newList.add('(' + parens + ')');
         newList.add(parens + '()');
      }
      memoMap.set(k, [...newList]);
    }
    let diff: number = (Date.now() - start);
    console.log(`Memoed Version for ${num} took: ${diff} milliseconds`);
    return memoMap.get(num) ?? [];
  }

  getParensBFS(numPairs: number){
    let start = Date.now();
    if (0 === numPairs){
      let diff: number = (Date.now() - start);
      console.log(`Parens BFS for ${numPairs} took: ${diff} milliseconds`);
      return [];
    }
    let parenComboQueue: string[] = [];
    let parenComboResult = new Set<string>;
    const guardLength = numPairs * 2;
    parenComboQueue.push('()');
    while (parenComboQueue.length > 0) {
      let currCombo = parenComboQueue.pop();
      if (currCombo?.length === guardLength){
        parenComboResult.add(currCombo);
        continue;
      } 
      parenComboQueue.push('()'+currCombo);
      parenComboQueue.push('('+currCombo+')');
      parenComboQueue.push(currCombo +'()');
    }
    let diff: number = (Date.now() - start);
    console.log(`Parens BFS for ${numPairs} took: ${diff} milliseconds`);
    return [...parenComboResult];
  }

  getParensInt(numPairs: number): string[] {
    // this uses bits to represent parens:
    //  1 -> '('
    //  0 -> ')'
    let startTime = Date.now();
    let stringLength = numPairs*2;
    let combos: string[] = [];
    let start = 1 << stringLength - 1;
    let end = 1 << stringLength;
    for (let i = start; i < end; i++){
      let closeParenCountForPairing = 0; 
      let totalCloseParens = 0;
      let valid = true;
      let currCombo = '';
      let workingNum = i;
      // do bit shift checking and pair checking
      while(workingNum > 0){
        let isCloseParen = ((workingNum & 1) == 0);
        if(totalCloseParens > numPairs){
          valid=false;
          break;
        }
        if (isCloseParen && totalCloseParens == numPairs){
          valid=false;
          break;
        }
        if(!isCloseParen && closeParenCountForPairing < 1){
          valid = false;
          break;
        }
        if(isCloseParen){
          closeParenCountForPairing += 1;
          totalCloseParens += 1;
          currCombo += ')';
        } else {
          closeParenCountForPairing -= 1;
          currCombo += '(';
        }
        workingNum = workingNum >> 1;
      }
      if (!valid) {
        continue;
      }
      let reversed = [...currCombo].reverse().join('');
      combos.push(reversed);
    }
    
    let diff: number = (Date.now() - startTime);
    console.log(`Parens Int for ${numPairs} took: ${diff} milliseconds`);
    return combos;
  }


  getPrimeCount(num: number): number {
    if (num <= 1) {
      return 0;
    }
    let primes = Array(num).fill(true);
    let primeCount = 0;
    for (let i = 2; i < num; i++){
      if(primes[i]){
        primeCount++;
        // eliminate multiples of this prime
        // the sieve
        for (let multiple = i + i; multiple < num; multiple += i) {
           primes[multiple] = false;
        }
      }
    }
    return primeCount;
  }

  async getFakeProxy(path) {
    let url = 'https://wizardofarc.com/' + path;
    try {
      let res = await fetch(url);
      let text = await res.text();
      return text;
    } catch {
      return '';
    } 
  }
}

