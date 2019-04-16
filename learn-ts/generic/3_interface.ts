

/**
 * 3 泛型函数接口
 */
interface ConfigFn {
    <T>(value: T): T;
}

var getData: ConfigFn = function <T>(value: T): T {
    return value;
}
getData<string>('张三');
// getData<string>(1243);  //错误


// 类似  Map<String,Object> Param  接口
interface Param {
    [index: string]: any
}



//4 泛型类接口

/**
 * page分页对象
 */
class Page {
    private currentPage: number = 1; //当前页码 默认1
    private pageSize: number = 10;//每页条数 默认为10
    private sortName: string; //排序字段
    private sortOrder: string = "asc"; // 排序规则 asc | desc 默认为asc正序


    constructor(param: Param) {
        if (param["currentPage"]) {
            this.currentPage = param["currentPage"];
        }
        if (param["pageSize"]) {
            this.pageSize = param["pageSize"];
        }
        if (param["sortName"]) {
            this.sortName = param["sortName"];
        }
        if (param["sortOrder"]) {
            this.sortOrder = param["sortOrder"];
        }
    }

    public getStartNum(): number {
        return (this.currentPage - 1) * this.pageSize;
    }
}


class User {
    id: number;//id主键自增
    name: string;//姓名
    sex: number;//性别 1男 2女
    age: number;//年龄
    city: string;//城市
    describe: string;//描述

}

//泛型接口
interface BaseDao<T> {
    findById(id: number): T;//根据主键id查询一个实体
    findPageList(param: Param, page: Page): T[];//查询分页列表
    findPageCount(param: Param): number;//查询分页count
    save(o: T): void;//保存一个实体
    update(o: T): void;//更新一个实体
    deleteById(id: number);//删除一个实体
}

/**
 * 接口实现类
 */
class UserDao<User> implements BaseDao<User>{
    findById(id: number): User {

        return null;
    }
    findPageList(param: Param, page: Page): User[] {
        return [];
    }
    findPageCount(param: Param): number {
        return 0;
    }
    save(o: User): void {

    }
    update(o: User): void {

    }
    deleteById(id: number) {

    }
}
