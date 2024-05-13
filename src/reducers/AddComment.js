const AddCommentReducer = (state = { addNum: 0 }, action) => {
    switch (action.type) {
        case "ADDCOMMENT":
            return {
                ...state,
                addNum: state.addNum + 1
            };
        default:
            return state;
    }
}

export default AddCommentReducer;
