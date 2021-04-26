import {cloneDeep} from "lodash";

export const teamSplit = (data: any[]): {team1: any[], team2: any[]} => {
    const clonedData = cloneDeep(data);
    const half = Math.ceil(data.length / 2);
    return {team1: clonedData.splice(0, half), team2: clonedData.splice(-half)}
}