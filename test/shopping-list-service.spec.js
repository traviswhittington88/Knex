const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service Object`, function() {
    let db

    let testTable = [
        {
            id: 1,
            name: 'Hot dog',
            price: '4.00',
            category: 'Snack',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 2,
            name: 'Hamburger',
            price: '4.00',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 3,
            name: 'Spaghetti',
            price: '8.00',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        }
    ]
    
    before(() => {  
        db = knex({ 
            client: 'pg',
            connection: process.env.DB_URL
        })
    })

    before(() => db('shopping_list_test').truncate())

    beforeEach(() => {
        return db
            .into('shopping_list_test')
            .insert(testTable)
    })

    afterEach(() => db('shopping_list_test').truncate())

    after(() => db.destroy())

    context(`Test CRUD methods on 'ShoppingListService`, () => {    

        it(`getAllItems() resolves all items from shopping_list_test table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testTable)
                })
        })

        it(`getById() resolves an item by id from shopping_list_test table`, () => {
            thirdId = 3
            thirdTestItem = testTable[thirdId - 1]

            return ShoppingListService.getById(db, thirdId) 
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        category: thirdTestItem.category,
                        checked: thirdTestItem.checked,
                        date_added: thirdTestItem.date_added
                    })  // can also just write .eql(thirdTestItem)
                })
        })

        it(`deleteItem() deletes an item from shopping_list_test table`, () => {
            itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    const expected = testTable.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from the shopping_list_test table`, () => {
            idOfItemToUpdate = 3
            const updatedItem = {
                name: 'Updated name',
                price: '1.00',
                category: 'Breakfast',
                checked: false,
                date_added: new Date(),
            }

            return ShoppingListService.updateItem(db, idOfItemToUpdate, updatedItem)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate, updatedItem))
                .then(item => { console.log(item)
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...updatedItem
                    })
                })
        })

        

    })
})
