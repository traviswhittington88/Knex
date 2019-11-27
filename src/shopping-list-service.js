const ShoppingListService = {
    getAllItems(knex) {
        return knex('shopping_list_test')
                .select('*')
    },
    getById(knex, id) {
        return knex('shopping_list_test')
                .select('*')
                .where({ id })
                .first()  // need this to pass test
    },
    deleteItem(knex, id) {
        return knex('shopping_list_test')
            .where( { id })
            .delete()
    },
    updateItem(knex, id, newItemFields) {
        return knex('shopping_list_test')
            .where( { id })
            .update(newItemFields)
    }
}

module.exports = ShoppingListService