export class actionModel{
        constructor(public value:string, //名字
                    public type:number,//类型  1小 2大 3 单 6双 
                    public  isSelect:boolean, //是否被选中
                    public  point:number,//积分，
                    public  multiple:number,//倍数,
                    public metux:number//互斥数
                    )
                    {}
    
}

// export class Action{
// 	id:number;//id,
// 	mark:number;//邀请人
// 	name:string;//姓名
// }