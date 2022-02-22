
const formatDate=date=>{
    return date.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
}

console.log(formatDate(new Date()))
