// src/api/user.ts

export type User = {
    id: number
    nickname: string
    phone: string
    avatar: string
    creditScore: number
    creditLevel: string
}

export type RentalRecord = {
    orderId: number
    productName: string
    date: string
    status: string
}

export type Coupon = {
    id: number
    desc: string
    expire: string
}

const mockUser: User = {
    id: 1001,
    nickname: '天天租客',
    phone: '138****8888',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    creditScore: 710,
    creditLevel: 'A'
}

const mockRentalHistory: RentalRecord[] = [
    { orderId: 1, productName: '小米电视', date: '2024-06-20', status: '已归还' },
    { orderId: 2, productName: 'iPad Pro', date: '2024-06-15', status: '租赁中' }
]

const mockCoupons: Coupon[] = [
    { id: 1, desc: '10元租赁抵扣券', expire: '2024-07-31' },
    { id: 2, desc: '免押金券', expire: '2024-08-15' }
]

export async function fetchUserProfile(): Promise<{ data: User }> {
    return new Promise(resolve => setTimeout(() => resolve({ data: mockUser }), 200))
}

export async function fetchRentalHistory(): Promise<{ data: RentalRecord[] }> {
    return new Promise(resolve => setTimeout(() => resolve({ data: mockRentalHistory }), 200))
}

export async function fetchCoupons(): Promise<{ data: Coupon[] }> {
    return new Promise(resolve => setTimeout(() => resolve({ data: mockCoupons }), 200))
}