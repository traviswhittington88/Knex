require ('dotenv').config()
const knex = require('knex')

const knexInstance = knex({ 
    client: 'pg',
    connection: process.env.DB_URL,
})

function containText(searchTerm) {
    
    if((typeof(searchTerm)) !== 'string') {
        console.log('must enter a string value')
        return -1;
    }
    knexInstance
        .select('name', 'price', 'category', 'checked', 'date_added')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {   
            console.log(result)
        })
}

//containText('burg')

function paginateItems(pageNumber) {
    const itemsPerPage = 3
    const offset = itemsPerPage * (pageNumber - 1)

    knexInstance
        .select('name', 'price', 'category', 'checked', 'date_added')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

//paginateItems(2)

function itemsAddedAfterDate(daysAgo) {
    knexInstance
        .select('name', 'price', 'category', 'checked', 'date_added')
        .from('shopping_list')
        .where(
            'date_added', 
            '>', 
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .orderBy('date_added', 'DESC')
        .then(result => {
            console.log(result)
        })
}

//itemsAddedAfterDate(6)

function totalCostPerCategory() {
    knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price AS total_price')
    .groupBy('category')
    .orderBy('total_price', 'DESC')
    .then(result => {
        console.log(result)
    })
}

totalCostPerCategory()
