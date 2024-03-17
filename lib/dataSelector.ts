export function dataSelector<DataModel>(schema: object & { shape: any }) {
    type ResultType = Record<keyof DataModel, boolean>;
    const result: ResultType = {} as ResultType;


    const keys: (keyof DataModel)[] = Object.keys(schema.shape) as (keyof DataModel)[]

    keys.forEach((key: keyof DataModel) => {
        result[key] = true;
    })

    return result;
}
