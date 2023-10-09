{
	type User = {
		id: number;
		kind: string;
	};

	/*     
    function makeCustomer<T extends User>(u: T): T {
        // Error
        return {
            id: u.id,
            kind: 'customer'
        }
    } 
    */

	function makeCustomer<T extends User>(u: T): T {
		return {
			...u,
			id: u.id,
			kind: "customer"
		};
	}

	// 为什么报错？
	// 因为 T 只是约束与 User 类型，而不局限于User 类型，所以返回为T类型不仅仅只有 id和kind，So需要一个接收其他类型的变量
}
