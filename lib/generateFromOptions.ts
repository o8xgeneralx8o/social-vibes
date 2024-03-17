export type ModelName = 'post' | 'comment' | 'follow' | 'like'
type IdObj = { id: string }

export const generateFromOptions = (modelId: string, modelName: ModelName, isToConnect: boolean): Record<string, {
    connect?: IdObj,
} | IdObj> => {

    const idObj: IdObj = {
        id: modelId
    }

    return {
        [modelName]: isToConnect ? { connect: idObj } : idObj
    };


}

