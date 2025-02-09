// @ts-nocheck
import { CoaWxPayIsvBin, CoaWxPayIsvService } from '..'

// 微信支付配置
const config = {
  appId: 'wx1763dce290fb74d8',
  mchId: '1605227372',
  key: '474c278e65bf99c5897574d5128e1c81',
  pfx: Buffer.from('XXXXXXX'),
  notifyPay: 'https://example.com/api/notify/pay',
  notifyRefund: 'https://example.com/api/notify/refund',
}

// 创建BIN实例
const bin = new CoaWxPayIsvBin(config)

// 创建服务
const service = new CoaWxPayIsvService(bin)

// 统一下单
await service.unifiedOrder({
  accountId: 'account000001',
  orderId: 'order000001',
  appWxaId: 'wx000000002',
  subMchId: '1660000001',
  openId: 'o9zfy6MHHn9GxOI1-0m8NQOqhghw',
  price: 100,
})

// 根据预支付单号，获得支付参数
await service.getPaymentParams({
  appWxaId: 'wxid_f16a90cl5k5d22',
  prepayId: 'prepay00001',
})

// 查询订单
await service.queryOrder({
  orderId: 'order000001',
  appWxaId: 'wx000000002',
  subMchId: '1605227372',
})

// 退款
await service.payRefund({
  accountId: 'account000001',
  refundId: 'wxid_f16a90cl5k5d22',
  orderId: 'order000001',
  price: 100,
  rawData: {},
})

// 查询退款订单
await service.queryRefund({
  refundId: 'refund000001',
  orderId: 'order000001',
  appWxaId: 'wxid_f16a90cl5k5d22',
  subMchId: '1605227372',
})

// 下载日对账单
await service.downloadBill({ date: '20210331' })

// 创建自定义BIN类
class MyCoaWxPayIsvBin extends CoaWxPayIsvBin {
  protected onRequestError(error: Error, response: Axios.AxiosResponse) {
    console.log('error:', error)
    console.log('data:', response.data)
  }
}

// 自定义BIN实例
const myBin = new MyCoaWxPayIsvBin(config)

console.log(myBin.config)
