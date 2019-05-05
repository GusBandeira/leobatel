const Members = require('./members')
const errorHandler = require('../common/errorHandler')


Members.methods(['get', 'post', 'put', 'delete'])
Members.updateOptions({ new: true, runValidators: true })
Members.after('post', errorHandler).after('put', errorHandler)



// Members.route('count', (req, res, next) => {
//     Members.count((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json({value})
//         }
//     })
// })
// Members.route('count', (req, res, next) => {
//     Members.count((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json({value})
//         }
//     })
// })

// Members.route('summary', (req, res, next) => {
//     Members.aggregate({
//         $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
//     }, {
//         $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
//     }, {
//         $project: {_id: 0, credit: 1, debt: 1}
//     }, (error, result) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json(result[0] || { credit: 0, debt: 0 })
//         }
//     })
// })

module.exports = Members