import { useInputs } from "../store"

export function useInputsState() {

    const { inputValue, updateInputValue } = useInputs(state => ({
        inputValue: state.inputValue,
        updateInputValue: state.updateInputValue
    }))

    return {

        //Variables
        inputValue,

        //Methods
        updateInputValue

    }

}