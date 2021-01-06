// scheme-model
const db = require("../../data/db-config")

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(schemeId) {
    return db ('steps as  s')
    .join ('schemes as sc', 'sc.Id', 's.scheme_id')
    .select ('s.id', 'sc.scheme_name as scheme_name', 's.step_number as step_number', 's.instructions')
    .where('s.scheme_id', schemeId)
    .orderBy('s.step_number')
}

function add(scheme) {
    return db ('schemes')
    .insert(scheme)
    .then(id => findById(id))
}

function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes, id)
}

function remove(id) {
    return db ('schemes')
        .where('id', id)
        .del()
}

