const UpLoadPhotoReducer = (state = { upLoadNum: 0 }, action) => {
    switch (action.type) {
        case "UPLOADPHOTO":
            return {
                ...state,
                upLoadNum: state.upLoadNum + 1
            };
        default:
            return state;
    }
}

export default UpLoadPhotoReducer;
