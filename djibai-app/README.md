# MVP 前端vue版本

1. **用户认证模块（登录/鉴权 useAuth, store/auth, api/auth, Login.vue）**
2. **商品浏览（ProductList, ProductCard, ProductDetail，store/product, api/product）**
3. **租赁流程（Rental.vue, RentalCalculator, useCart, store/cart, api/order）**
4. **订单管理（OrderList, OrderDetail, useOrder, store/order, api/order，WebSocket）**
5. **用户中心（UserCenter, UserProfile, RentalHistory, store/user, api/user）**


##  登陆注册功能开发

```js
src/
├── api/
│   └── auth.ts
├── composables/
│   └── useAuth.ts
├── store/
│   └── auth.ts
├── views/
│   └── Login.vue
└── tests/
    └── composables/
        └── useAuth.spec.ts
```

## 商品浏览功能开发
```js
src/
├── api/
│   └── product.ts         # 商品API（含mock）
├── store/
│   └── product.ts         # Pinia商品状态
├── components/
│   ├── ProductCard.vue    # 单个商品卡片
│   └── ProductDetail.vue  # 商品详情弹窗/页
├── views/
│   └── ProductList.vue    # 商品列表页
├── composables/
│   └── useProduct.ts      # 组合逻辑（可选）
└── tests/
    └── components/
        ├── ProductCard.spec.ts
        └── ProductList.spec.ts
```
## 租赁流程功能开发
```js
src/
├── api/
│   └── order.ts               # 订单API（下单、支付、订单详情、mock数据）
├── store/
│   └── order.ts               # 订单Pinia状态
├── components/
│   └── RentalCalculator.vue   # 租金计算/下单组件
├── views/
│   └── Rental.vue             # 租赁流程页面
```
## 订单管理功能开发
```js
src/
├── api/
│   └── order.ts               # 已有，下文补充归还/状态变更API
├── store/
│   └── order.ts               # 已有，补充状态管理
├── views/
│   ├── OrderList.vue          # 订单列表页
│   └── OrderDetail.vue        # 订单详情页
└── components/
    └── OrderCard.vue          # 订单卡片（可选，做拆分）
```

## 用户中心功能开发
```js
src/
├── api/
│   └── user.ts                # 用户API（含mock）
├── store/
│   └── user.ts                # Pinia用户状态
├── components/
│   ├── UserProfile.vue        # 个人资料卡片
│   ├── RentalHistory.vue      # 租赁历史列表
│   └── CouponList.vue         # 优惠券
├── views/
│   └── UserCenter.vue         # 用户中心页
```