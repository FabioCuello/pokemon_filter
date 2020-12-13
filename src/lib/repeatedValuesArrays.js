export const findInterception = (firstArray, arrays, length = "No") => {
    let result
    let memo = firstArray

    if (arrays.length === 0) return memo

    for (let i = 0; i <= arrays.length - 1; i++) {
        result = memo.filter(el => {
            return (arrays[i].includes(el))
        })

        memo = result
    }

    if (length !== "no" && result.length > length - 1) {
        result = result.slice(0, length)

    }

    return result
}

