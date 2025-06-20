// src/api/order.ts

export type Order = {
    id: number
    productId: number
    productName: string
    days: number
    price: number
    deposit: number
    total: number
    status: '待支付' | '租赁中' | '已归还' | '归还申请中'
    createdAt: string
}

// 订单池
let orderId = 1
let mockOrders: Order[] = []

export function resetMockOrders() {
    orderId = 1
    mockOrders = []
}
export function generateMockOrders(count = 500) {
    resetMockOrders()
    const products = [
        { id: 1, name: '小米电视', price: 20, deposit: 40 },
        { id: 2, name: 'iPad Pro', price: 50, deposit: 100 },
        { id: 3, name: '电钻套装', price: 10, deposit: 20 },
    ]
    for (let i = 0; i < count; i++) {
        const p = products[Math.floor(Math.random() * products.length)]
        const days = Math.ceil(Math.random() * 30)
        const statusArr = ['待支付', '租赁中', '已归还', '归还申请中']
        const status = statusArr[Math.floor(Math.random() * statusArr.length)] as Order['status']
        mockOrders.push({
            id: orderId++,
            productId: p.id,
            productName: p.name,
            days,
            price: p.price,
            deposit: p.deposit,
            total: p.price * days + p.deposit,
            status,
            createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
        })
    }
}

export async function createOrder(params: {
    productId: number
    productName: string
    days: number
    price: number
    deposit: number
}): Promise<{ data: Order }> {
    const total = params.price * params.days + params.deposit
    const order: Order = {
        id: orderId++,
        ...params,
        total,
        status: '待支付'
    }
    mockOrders.push(order)
    return new Promise(resolve => setTimeout(() => resolve({ data: order }), 400))
}

export async function payOrder(id: number): Promise<{ success: boolean }> {
    const order = mockOrders.find(o => o.id === id)
    if (order) order.status = '租赁中'
    return new Promise(resolve => setTimeout(() => resolve({ success: !!order }), 400))
}

// export async function fetchOrderList(): Promise<{ data: Order[] }> {
//     return new Promise(resolve => setTimeout(() => resolve({ data: mockOrders }), 400))
// }
// 获取订单列表（可加分页参数，流量测压专用）
export async function fetchOrderList({ page = 1, pageSize = 20 } = {}): Promise<{ data: Order[], total: number }> {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return new Promise(resolve => setTimeout(() =>
        resolve({
            data: mockOrders.slice(start, end),
            total: mockOrders.length
        }), 200
    ))
}

// 在原有的基础上补充

export async function requestReturn(id: number): Promise<{ success: boolean }> {
    const order = mockOrders.find(o => o.id === id)
    if (order && order.status === '租赁中') {
        order.status = '归还申请中'
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 400))
    }
    return Promise.resolve({ success: false })
}

// 模拟WebSocket实时订单状态更新（简单事件轮询）
let wsCallback: ((order: Order) => void) | null = null
export function subscribeOrderStatus(cb: (order: Order) => void) {
    wsCallback = cb
}
// 假装有后端推送
export function triggerOrderStatusChange(orderId: number, newStatus: Order['status']) {
    const order = mockOrders.find(o => o.id === orderId)
    if (order) {
        order.status = newStatus
        if (wsCallback) wsCallback(order)
    }
}

