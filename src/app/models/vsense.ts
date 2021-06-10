export class Common{
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class MEdgeGroupParam extends Common{
    EdgeGroup:number;
    ParamID:string;
    Title:string;
    Unit:string;
    LongText:string;
    Min:number;
    Max:number;
    Icon:string;
    IsPercentage:string;
    Color:string;
}