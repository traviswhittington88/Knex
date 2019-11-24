const knex = require('knex')
require ('dotenv').config()

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log('knex and driver installed correctly')

// SELECT * FROM amazong_products;
function searchByProductName(searchTerm) {
const q1 = knexInstance
            .select('product_id', 'name', 'price', 'category')
            .from('amazong_products')
            .where('name', 'ILIKE', `%${searchTerm}%`)
            .then(result => {
              console.log(result);
            })
}

//searchByProductName('holo')

function paginateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1)
  
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

//paginateProducts(3)

function findProductsWithImage() {
  knexInstance
    .select('product_id', 'name', 'price', 'category', 'image')
    .count('*')
    .from('amazong_products')
    .whereNotNull('image')
    .then(result => {
      console.log(result)
    })   
}

//findProductsWithImage()

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .from('whopipe_video_views')
    .count('date_viewed AS views')
    .where('date_viewed', 
            '>', 
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days))
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC'}
    ])
    .then(result => {
      console.log(result)
    })
}

mostPopularVideosForDays(30)