export const findInterception = (firstArray, arrays) => {
    let result
    let memo = firstArray

    if (arrays.length === 0) return memo

    for (let i = 0; i <= arrays.length - 1; i++) {
        result = memo.filter(el => {
            return (arrays[i].includes(el))
        })

        memo = result
    }
    return result

}