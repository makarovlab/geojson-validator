export const isAttributePresented = (value: string | number) => {
    return (
        ((typeof(value) === "string" && value.length > 0) || 
        typeof(value) === "number")
    )
}