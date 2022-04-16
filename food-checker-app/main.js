function getFetch() {
    let inputVal = document.getElementById('barcode').value

    if (inputVal.length !== 13) {
        alert('Please ensure that barcode is 13 characters')
        return;
    }

    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

    fetch(url)
        .then(res => res.json())//parse respose as JSON
        .then(data => { //use JSON data
            console.log(data)
            if (data.status === 1) {
                //call additional stuff if the product is found
                const item = new ProductInfo(data.product)
                item.showInfo()
                item.listIngredients()
            } else if (data.status === 0) {
                alert(`Product ${inputVal} not found. Please try another.`)
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

class ProductInfo {
    constructor(productData) { //passing in data.product
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }
    showInfo() {
        document.getElementById('product-image').src = this.image
        document.getElementById('product-name').innerText = this.name
        //document.getElementById('ingredient-table').innerHTML = this.ingredients
    }
    listIngredients() {
        let tableRef = document.getElementById('ingredient-table')
        for (let i = 1; i < tableRef.rows.length;) {
            tableRef.deleteRow(i);
        }
        if (!(this.ingredients == null)) {
            for (let key in this.ingredients) {
                let newRow = tableRef.insertRow(-1)
                let newICell = newRow.insertCell(0)
                let newVCell = newRow.insertCell(1)
                let newIText = document.createTextNode(
                    this.ingredients[key].text
                )
                let VegStatus = !(this.ingredients[key].vegan) ? 'unknown' : this.ingredients[key].vegan
                let newVText = document.createTextNode(VegStatus)
                newICell.appendChild(newIText) //puts text in table cell
                newVCell.appendChild(newVText)
                if (VegStatus === 'no') {
                    //turn item red
                    newVCell.classList.add('non-veg-item')
                } else if (VegStatus === 'unknown' || VegStatus === 'maybe') {
                    //turn items yellow
                    newVCell.classList.add('unknown-maybe-item')
                }
            }
        }
    }
}