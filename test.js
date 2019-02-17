// // data
// const initialState = {
//     entities: {}
// }

// const categoryAdd = [
//     {
//         id: 1,
//         category: 'category1'
//     },
//     {
//         id: 3,
//         category: 'category3'
//     }
// ]

// const categoryConcat = [
//     {
//         id: 2,
//         category: 'category2'
//     },
//     {
//         id: 4,
//         category: 'category4'
//     }
// ]


// // functions
// const util = {
//     logger: (name, obj) => {
//         console.log(name, obj);
//         console.log('*****************************************************');
//     },
//     merge: (category, state) => {
//         let result = {};
//         const arr = {...Object.values(state).concat(Object.values(category))};
//         util.logger('arr', arr);
//         // arr.forEach((v, i) => {
//         //     result[i] = v;
//         // })
//         return result
//     },
//     add: (category, state) => {

//         const entities = util.arrayToObject(category);
//         util.logger('add : entities', entities);

//         return {
//             ...state,
//             entities
//         }

//         // const entities = category.reduce(
//         //     (entities, category) => {
//         //         return {
//         //             ...entities,
//         //             [category.id]: category,
//         //         };
//         //     },
//         //     {
//         //         ...state.entities,
//         //     }
//         // );
//         // return {
//         //     ...state,
//         //     entities
//         // };
//     }, concat: (category, state) => {
//         // const entities = category.reduce(
//         //     (entities, category) => {
//         //         return {
//         //             ...entities,
//         //             [category.id]: category,
//         //         };
//         //     },
//         //     {
//         //         ...state.entities,
//         //     }
//         // );
//         const entities = util.arrayToObject(category);
//         util.logger('concat : entities', entities);
//         const arr = {...Object.values(state.entities).concat(Object.values(category))};
//         util.logger('concat : arr', arr);
//         return { ...state.entities, entities: { ...entities } };
//     },
//     arrayToObject: (array) => {

//         return array.reduce((obj, item) => {
//             obj[item.id] = item
//             return obj
//         }, {})
//     }

// }

// // flow
// // add category to state
// const addedState = util.add(categoryAdd, initialState);
// // log return added state
// util.logger('addedState', addedState);
// // concat category to state
// const concatState = util.merge(categoryAdd, categoryConcat);
// // log return concatenated state
// util.logger('concatState', concatState);



const arr = [
    {
        id: 3,
        name: 'name3'
    },
    {
        id: 2,
        name: 'name2'
    }, {
        id: 1,
        name: 'name1'
    },

]

// let sortedarr = arr.sort(() => {
//     return 
// });

let reducedArr = arr.reduce(
    (entities, category) => {
        return {
            ...entities,
            [category.id]: category,
        };
    },
    {}
);
console.log(reducedArr);
