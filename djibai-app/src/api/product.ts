// src/api/product.ts

/** 商品类型定义 */
export type Product = {
    id: number
    name: string
    price: number
    image: string
    desc?: string
    category?: string
}

/** 模拟商品列表 */
const mockProducts: Product[] = [
    {
        id: 1,
        name: '小米电视',
        price: 20,
        image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        desc: '55英寸4K智能电视，高清大屏，支持投屏。',
        category: '家电'
    },
    {
        id: 2,
        name: 'iPad Pro',
        price: 50,
        image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        desc: '租赁平板电脑，工作娱乐两不误。',
        category: '数码'
    },
    {
        id: 3,
        name: '电钻套装',
        price: 10,
        image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
        desc: '家用电动工具，租一天就够用！',
        category: '工具'
    }
]

/** 获取商品列表，可以按分类过滤 */
export async function fetchProducts(category?: string): Promise<{ data: Product[] }> {
    // 支持传入 category 分类筛选
    const data = category
        ? mockProducts.filter(item => item.category === category)
        : mockProducts
    // 模拟错误和延迟，测试用
    // if (Math.random() < 0.05) throw new Error('网络异常')
    return new Promise(resolve =>
        setTimeout(() => resolve({ data }), 400)
    )
}

/** 获取商品详情 */
export async function fetchProductDetail(id: number): Promise<{ data: Product | undefined }> {
    const product = mockProducts.find(p => p.id === id)
    return new Promise(resolve =>
        setTimeout(() => resolve({ data: product }), 300)
    )
}