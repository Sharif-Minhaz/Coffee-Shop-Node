let arr = [3, 5, 3, 5, 9];

function editArr (index, del, value){
    return arr.splice(index, del, value);
}

console.log(editArr(1, 1));