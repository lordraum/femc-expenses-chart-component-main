const bars = [...document.querySelectorAll('.chart__bar-bg')]

const chart = document.getElementById('chart')

const fetchAmounts = async () => {
    const url = "./assets/json/data.json";
    const res = await fetch(url);
    const json = await res.json();
    return json.map((x) => x.amount);          
};
  
const getInfo = async () => {
    const arr = await fetchAmounts()
    const max = Math.max(...arr)
    const index = arr.indexOf(max)
    const data = { amounts: arr, maxAmount: max, indexMaxAmount: index, }
    return {amounts, maxAmount, indexMaxAmount} = data
}

getInfo()
.then(x => {
   bars.forEach((x, index) => {
    if (index === indexMaxAmount) {
        x.style.height = '100%'
        x.classList.add('chart__bar-bg--max-bg')
    }else {
        x.style.height = `${100/maxAmount*amounts[index]}%`
    }
   })
})

chart.addEventListener('click', async (e) => {
    const amounts = await fetchAmounts()

    bars.forEach((x, index) => {
        const dayAmount = document.createElement('DIV')
        if (x === e.target) {
            dayAmount.textContent = amounts[index]
            dayAmount.classList.add('day-spending-value')
            x.children.length === 0 ? x.append(dayAmount) : e.target.children[0].remove()
            amounts[index] === maxAmount ? e.target.classList.toggle('chart__bar-bg--active-max')  : e.target.classList.toggle('chart__bar-bg--active')
        }   
    }) 
})    
  


