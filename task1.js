
//
function add (a,b){
  return a+b
}

//Task 1

let defaultArguments=(xfunction, obj)=>{

  let cloneF = new Function('return '+ xfunction.toString())()
  let funArgs = getParamNames(cloneF)

  let objPropertyNames = Object.getOwnPropertyNames(obj)
 
  let parameters = {}
  let stringParams = []
  for(let x = 0 ; x< funArgs.length ; x++){
    funArgs[x]= funArgs[x].replace(/[=]\d/, '')
    if(obj[funArgs[x]] ){
      parameters[funArgs[x]]= obj[funArgs[x]]
      stringParams.push(`${funArgs[x]}=${obj[funArgs[x]]}`)
    }else{
      parameters[funArgs[x]]= null
      stringParams.push(`${[funArgs[x]]}`)
    }

  }
  
  let newFunc = new Function(...stringParams , cloneF.toString().replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g , "").trim()+";" )
  return newFunc

}

function getParamNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}


const add2 = defaultArguments(add, { b: 9 });
console.log(add2(10));
console.log(add2(10, 7) === 17);
console.log(isNaN(add2()));

console.log('\n')
const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.log(add3(10)== 13);
console.log(add3() === 5);
console.log(add3(undefined, 10) === 12);

console.log('\n')
const add4 = defaultArguments(add, { c: 3 }); 
console.log(isNaN(add4(10)));
console.log(add4(10, 10) === 20);
