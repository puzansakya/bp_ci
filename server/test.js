const log = (data) => {
    console.log(data);
}
const state = {
    entities: {}
}
const categories = [
    {
        id: 2,
        category: 'asdf2'
    },
    {
        id: 3,
        category: 'asdf3'
    }, {
        id: 4,
        category: 'asdf4'
    }
]

const load = (state) => {

    const entities = categories.reduce(
        (entities, category) => {
            return {
                ...entities,
                [category.id]: category
            };
        }, {
            ...state.entities,
        }
    );

    return {
        ...state,
        entities
    }
}


const update = (state) => {

    const category = { id: 2, category: 'asdfUpdated2' };

    // fucking mutation
    // caught by store freeze
    // state.entities[category.id] = {
    //     ...state.entities[category.id],
    //     ...category
    // }
    const entities = {
        ...state.entities,
        [category.id]: category
    };
    return {
        ...state,
        entities
    }

}

const remove = (state) => {
    const category = { id: 2, category: 'asdfUpdated2' };
    const { [category.id]: removed, ...entities } = state.entities;

    return {
        ...state,
        entities,
    };
}

const updateState = load(state)
log(updateState);
log(update(updateState));



